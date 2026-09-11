import { getToken } from "./identity.js";

async function authHeaders() {
  const token = await getToken();
  if (!token) throw new Error("You're not signed in. Please log in and try again.");
  return { Authorization: `Bearer ${token}` };
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

// Fetch a content JSON file + its current sha.
async function getContent(path) {
  const headers = await authHeaders();
  const res = await fetch(
    `/.netlify/functions/get-content?path=${encodeURIComponent(path)}`,
    { headers }
  );
  return handleResponse(res);
}

// Save an edited content JSON file. Throws with a friendly message on
// conflict (409) if the file changed since it was loaded.
async function saveContent(path, content, sha) {
  const headers = await authHeaders();
  const res = await fetch("/.netlify/functions/save-content", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ path, content, sha }),
  });
  return handleResponse(res);
}

// Upload an image. `file` is a browser File object; folder is e.g. "people"
// or "events", or "" for the images root. Returns { publicPath, sha }.
// Raster images are downscaled to maxWidth before upload (SVGs are sent
// as-is, since they're vector and already tiny).
async function uploadImage(file, folder, maxWidth = 800) {
  const processedFile = file.type === "image/svg+xml" ? file : await resizeImage(file, maxWidth);
  const dataUrl = await fileToDataUrl(processedFile);
  const headers = await authHeaders();
  const res = await fetch("/.netlify/functions/upload-image", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ folder, filename: file.name, dataUrl }),
  });
  return handleResponse(res);
}

// Downscales an image client-side (if wider than maxWidth) using a canvas,
// so photos taken on a phone don't turn every commit into a multi-MB diff.
function resizeImage(file, maxWidth) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      if (img.width <= maxWidth) {
        resolve(file);
        return;
      }

      const scale = maxWidth / img.width;
      const canvas = document.createElement("canvas");
      canvas.width = maxWidth;
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file); // fall back to original if canvas export fails
            return;
          }
          resolve(new File([blob], file.name, { type: file.type }));
        },
        file.type,
        0.85
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file); // fall back to original if it can't be decoded as an image
    };

    img.src = objectUrl;
  });
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export { getContent, saveContent, uploadImage };
