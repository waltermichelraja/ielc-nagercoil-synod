import { deleteFile, getFile, putFile } from "./utils/github.js";
import { json, requireUser } from "./utils/http.js";


const IMAGE_PREFIXES_BY_PATH = {
  "frontend/src/data/content/events.json": ["/images/events/"],
  "frontend/src/data/content/synodBearers.json": ["/images/people/"],
};

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

    let imagesToDelete = [];
    const imagePrefixes = IMAGE_PREFIXES_BY_PATH[path];
    if (imagePrefixes) {
      const current = await getFile(path);
      if (!current || current.sha !== sha) {
        return json(409, {
          error:
            "This file changed since you opened it. Please reload the page and re-apply your edit.",
        });
      }

      const oldContent = decodeJsonContent(current.contentBase64);
      const oldImages = collectImagePaths(oldContent, imagePrefixes);
      const newImages = collectImagePaths(content, imagePrefixes);
      imagesToDelete = [...oldImages].filter((image) => !newImages.has(image));
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

      for (const imagePath of imagesToDelete) {
        try {
          const repoPath = publicImagePathToRepoPath(imagePath, imagePrefixes);
          const imageFile = await getFile(repoPath);
          if (!imageFile) continue;

          await deleteFile({
            path: repoPath,
            sha: imageFile.sha,
            message: `content: remove unused image ${repoPath.split("/").pop()} (via admin, by ${editorName})`,
          });
          deletedImages.push(imagePath);
        } catch (err) {
          imageDeleteErrors.push({ path: imagePath, error: err.message });
        }
      }

      return json(200, { sha: result.sha, deletedImages, imageDeleteErrors });
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
  return path.startsWith("frontend/src/data/content/") && path.endsWith(".json");
}

function shortName(path) {
  return path.split("/").pop();
}

function decodeJsonContent(contentBase64) {
  try {
    return JSON.parse(Buffer.from(contentBase64, "base64").toString("utf-8"));
  } catch {
    throw new Error("The current file content could not be read safely.");
  }
}

function collectImagePaths(value, prefixes, found = new Set()) {
  if (typeof value === "string") {
    if (prefixes.some((prefix) => value.startsWith(prefix))) found.add(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectImagePaths(item, prefixes, found);
  } else if (value && typeof value === "object") {
    for (const key of Object.keys(value)) collectImagePaths(value[key], prefixes, found);
  }
  return found;
}

function publicImagePathToRepoPath(publicPath, prefixes) {
  const prefix = prefixes.find((p) => publicPath.startsWith(p));
  const rest = prefix ? publicPath.slice(prefix.length) : null;
  if (!prefix || !/^[a-zA-Z0-9._%+-]+$/.test(rest || "")) {
    throw new Error(`Unsafe image path: ${publicPath}`);
  }
  return `frontend/public${publicPath}`;
}