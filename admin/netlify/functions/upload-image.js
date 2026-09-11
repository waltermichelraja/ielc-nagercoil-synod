import { getFile, putFile } from "./utils/github.js";
import { json, requireUser } from "./utils/http.js";

// POST /.netlify/functions/upload-image
// Body: { folder, filename, dataUrl }
//   folder    e.g. "people" | "events" | "" (root of public/images)
//   filename  desired file name, e.g. "sathianathan.png"
//   dataUrl   the file as a base64 data URL (from FileReader in the browser)
//
// Commits the image into frontend/public/images/<folder>/<filename> on the
// target branch and returns the public path the frontend can reference,
// e.g. "/images/people/sathianathan.png".

const MAX_BYTES = 3 * 1024 * 1024; // 3MB — plenty for a compressed photo

export async function handler(event, context) {
  try {
    const user = requireUser(context);

    if (event.httpMethod !== "POST") {
      return json(405, { error: "Method not allowed." });
    }

    const { folder = "", filename, dataUrl } = JSON.parse(event.body || "{}");

    if (!filename || !dataUrl) {
      return json(400, { error: "Request must include filename and dataUrl." });
    }

    const safeFolder = sanitizeSegment(folder);
    const safeFilename = sanitizeFilename(filename);
    if (!safeFilename) {
      return json(400, { error: "Invalid filename." });
    }

    const match = /^data:(image\/[a-zA-Z+]+);base64,(.+)$/.exec(dataUrl);
    if (!match) {
      return json(400, { error: "dataUrl must be a base64-encoded image." });
    }
    const [, mimeType, base64Data] = match;
    if (!["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(mimeType)) {
      return json(400, { error: `Unsupported image type: ${mimeType}` });
    }

    const approxBytes = Math.ceil((base64Data.length * 3) / 4);
    if (approxBytes > MAX_BYTES) {
      return json(400, {
        error: `Image is too large (${(approxBytes / 1024 / 1024).toFixed(1)}MB). Please use an image under 3MB.`,
      });
    }

    const repoPath = safeFolder
      ? `frontend/public/images/${safeFolder}/${safeFilename}`
      : `frontend/public/images/${safeFilename}`;

    const existing = await getFile(repoPath);
    const editorName = user.user_metadata?.full_name || user.email || "Admin";

    const result = await putFile({
      path: repoPath,
      contentBase64: base64Data,
      sha: existing?.sha,
      message: `content: ${existing ? "update" : "add"} image ${safeFilename} (via admin, by ${editorName})`,
    });

    return json(200, {
      sha: result.sha,
      publicPath: safeFolder ? `/images/${safeFolder}/${safeFilename}` : `/images/${safeFilename}`,
    });
  } catch (err) {
    return json(err.statusCode || 500, { error: err.message || "Unexpected error." });
  }
}

function sanitizeSegment(segment) {
  return String(segment || "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
}

function sanitizeFilename(filename) {
  const name = String(filename || "").trim().toLowerCase().replace(/\s+/g, "");
  const match = /^([a-z0-9-_]+)\.(png|jpe?g|webp|svg)$/.exec(name);
  return match ? match[0] : null;
}
