import { putFile } from "./utils/github.js";
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

    try {
      const result = await putFile({
        path,
        contentBase64,
        sha,
        message: `content: update ${shortName(path)} (via admin, by ${editorName})`,
      });
      return json(200, { sha: result.sha });
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
