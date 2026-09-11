import { getFile } from "./utils/github.js";
import { json, requireUser } from "./utils/http.js";

// GET /.netlify/functions/get-content?path=frontend/src/data/content/messages.json
// Returns { content: <parsed JSON>, sha: <string> } for the given file.
// Requires a logged-in Netlify Identity user (checked via requireUser).

export async function handler(event, context) {
  try {
    requireUser(context);

    const path = event.queryStringParameters?.path;
    if (!path) {
      return json(400, { error: "Missing required query parameter: path" });
    }
    if (!isAllowedContentPath(path)) {
      return json(403, { error: "This file is not editable from the admin app." });
    }

    const file = await getFile(path);
    if (!file) {
      return json(404, { error: `File not found: ${path}` });
    }

    const raw = Buffer.from(file.contentBase64, "base64").toString("utf-8");
    let content;
    try {
      content = JSON.parse(raw);
    } catch {
      return json(500, { error: "File content is not valid JSON." });
    }

    return json(200, { content, sha: file.sha });
  } catch (err) {
    return json(err.statusCode || 500, { error: err.message || "Unexpected error." });
  }
}

// Defence in depth: even though the frontend only ever offers a fixed list
// of files, double-check server-side so a crafted request can't be used to
// read arbitrary files out of the repo.
function isAllowedContentPath(path) {
  return (
    path.startsWith("frontend/src/data/content/") && path.endsWith(".json")
  );
}
