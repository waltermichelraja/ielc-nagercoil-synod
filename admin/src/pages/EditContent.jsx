import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSection } from "../config/contentSchema.js";
import { getContent, saveContent } from "../api.js";
import FieldRenderer from "../components/FieldRenderer.jsx";

export default function EditContent() {
  const { key } = useParams();
  const section = getSection(key);

  const [content, setContent] = useState(null);
  const [sha, setSha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState(null);

  const load = useCallback(async () => {
    if (!section) return;
    setLoading(true);
    setError("");
    setSavedAt(null);
    try {
      const result = await getContent(section.path);
      setContent(result.content);
      setSha(result.sha);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [section]);

  useEffect(() => {
    load();
  }, [load]);

  if (!section) {
    return (
      <div className="page">
        <p>Unknown section.</p>
        <Link to="/">&larr; Back to dashboard</Link>
      </div>
    );
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const result = await saveContent(section.path, content, sha);
      setSha(result.sha);
      setSavedAt(new Date());

      if (result.imageDeleteErrors?.length) {
        const details = result.imageDeleteErrors
          .map((item) => `${item.path}: ${item.error}`)
          .join("\n");
        setError(
          `The event data was saved, but one or more old event images could not be deleted.\n${details}`
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        &larr; Back to dashboard
      </Link>
      <span className="eyebrow">{section.label}</span>
      <h1>{section.label}</h1>
      <p className="page-description">{section.description}</p>

      {loading && <p>Loading…</p>}
      {error && <p className="field-error field-error-block">{error}</p>}

      {!loading && content !== null && (
        <>
          <div className="editor-form">
            <FieldRenderer field={{ ...section.schema, label: null }} value={content} onChange={setContent} />
          </div>

          <div className="save-bar">
            <button type="button" className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button type="button" className="btn-secondary" onClick={load} disabled={saving}>
              Discard & reload
            </button>
            {savedAt && (
              <span className="save-confirmation">
                Saved at {savedAt.toLocaleTimeString()} — live on the site in about 1–2 minutes.
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
