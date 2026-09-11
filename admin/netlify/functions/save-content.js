import { deleteFile, getFile, putFile } from "./utils/github.js";
import { json, requireUser } from "./utils/http.js";

// POST /.netlify/functions/save-content
// Body: { path, content, sha }
// Commits the updated JSON back to GitHub. Requires the `sha` of the
// version the admin loaded — if someone else saved in the meantime, GitHub
// will reject the write with a 409 instead of silently overwriting them,
// and we surface that back to the admin as a clear "please reload" message.

export async function handler(event, context) {
  try {
    const user = requireUser(context);

    if (event.httpMethod !== "POST") {
      return json(405, { error: "Method not allowed." });
    }

    const { path, content, sha } = JSON.parse(event.body || "{}");

    if (!path || content === undefined || !sha) {
      return json(400, { error: "Request must include path, content, and sha." });
    }
    if (!isAllowedContentPath(path)) {
      return json(403, { error: "This file is not editable from the admin app." });
    }

    const jsonString = JSON.stringify(content, null, 2) + "\n";
    const contentBase64 = Buffer.from(jsonString, "utf-8").toString("base64");

    const editorName = user.user_metadata?.full_name || user.email || "Admin";

    // For the Events section, determine which event images disappeared from
    // the content before saving. Images are deleted only after the JSON save
    // succeeds, and only when the new content no longer references them.
    let eventImagesToDelete = [];
    if (path === "frontend/src/data/content/events.json") {
      const current = await getFile(path);
      if (!current || current.sha !== sha) {
        return json(409, {
          error:
            "This file changed since you opened it. Please reload the page and re-apply your edit.",
        });
      }

      const oldContent = decodeJsonContent(current.contentBase64);
      const oldImages = collectEventImages(oldContent);
      const newImages = collectEventImages(content);
      eventImagesToDelete = [...oldImages].filter((image) => !newImages.has(image));
    }

    try {
      const result = await putFile({
        path,
        contentBase64,
        sha,
        message: `content: update ${shortName(path)} (via admin, by ${editorName})`,
      });

      const deletedImages = [];
      const imageDeleteErrors = [];

      for (const imagePath of eventImagesToDelete) {
        try {
          const repoPath = publicEventImageToRepoPath(imagePath);
          const imageFile = await getFile(repoPath);
          if (!imageFile) continue;

          await deleteFile({
            path: repoPath,
            sha: imageFile.sha,
            message: `content: remove unused event image ${repoPath.split("/").pop()} (via admin, by ${editorName})`,
          });
          deletedImages.push(imagePath);
        } catch (err) {
          imageDeleteErrors.push({ path: imagePath, error: err.message });
        }
      }

      return json(200, {
        sha: result.sha,
        deletedImages,
        imageDeleteErrors,
      });
    } catch (err) {
      if (err.status === 409) {
        return json(409, {
          error:
            "This file changed since you opened it. Please reload the page and re-apply your edit.",
        });
      }
      throw err;
    }
  } catch (err) {
    return json(err.statusCode || 500, { error: err.message || "Unexpected error." });
  }
}

function isAllowedContentPath(path) {
  return (
    path.startsWith("frontend/src/data/content/") && path.endsWith(".json")
  );
}

function shortName(path) {
  return path.split("/").pop();
}
function decodeJsonContent(contentBase64) {
  try {
    return JSON.parse(Buffer.from(contentBase64, "base64").toString("utf-8"));
  } catch {
    throw new Error("The current events content could not be read safely.");
  }
}

function collectEventImages(content) {
  const images = new Set();
  const groups = ["upcomingEvents", "synodEvents", "circleEvents", "schoolEvents"];

  for (const group of groups) {
    const events = Array.isArray(content?.[group]) ? content[group] : [];
    for (const event of events) {
      if (typeof event?.image === "string" && event.image.startsWith("/images/events/")) {
        images.add(event.image);
      }
    }
  }

  return images;
}

function publicEventImageToRepoPath(publicPath) {
  if (!/^\/images\/events\/[a-zA-Z0-9._%+-]+$/.test(publicPath)) {
    throw new Error(`Unsafe event image path: ${publicPath}`);
  }
  return `frontend/public${publicPath}`;
}

