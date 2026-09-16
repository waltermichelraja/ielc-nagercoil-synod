import { useState } from "react";
import { uploadImage } from "../api.js";

// Existing images live on the public frontend site, not the admin site —
// this env var (set at build time) points previews at the right domain.
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || "";

export default function ImageUploadField({ folder, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const previewSrc = value
    ? value.startsWith("http")
      ? value
      : `${FRONTEND_URL}${value}`
    : null;

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    try {
      const result = await uploadImage(file, folder);
      onChange(result.publicPath);
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = ""; // lets the admin re-select the same file if needed
    }
  }

  return (
    <div className="image-field">
      {previewSrc ? (
        <img className="image-field-preview" src={previewSrc} alt="" />
      ) : (
        <div className="image-field-preview image-field-preview-empty">No photo yet</div>
      )}
      <div className="image-field-controls">
        <label className="btn-file">
          {uploading ? "Uploading…" : "Choose photo"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleFileChange}
            disabled={uploading}
            hidden
          />
        </label>
        {value && <p className="image-field-path">{value}</p>}
        {error && <p className="field-error">{error}</p>}
      </div>
    </div>
  );
}
