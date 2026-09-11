import ImageUploadField from "./ImageUploadField.jsx";

// Renders one schema field, recursing into objects and lists as needed.
// This one component (plus the two helpers below) is what turns the
// declarative schema in config/contentSchema.js into an actual form.
export default function FieldRenderer({ field, value, onChange }) {
  switch (field.type) {
    case "text":
      return (
        <label className="field">
          <span className="field-label">{field.label}</span>
          <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
        </label>
      );

    case "textarea":
      return (
        <label className="field">
          <span className="field-label">{field.label}</span>
          <textarea rows={4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
        </label>
      );

    case "number":
      return (
        <label className="field">
          <span className="field-label">{field.label}</span>
          <input
            type="number"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </label>
      );

    case "image":
      return (
        <div className="field">
          <span className="field-label">{field.label}</span>
          <ImageUploadField folder={field.folder} value={value} onChange={onChange} />
        </div>
      );

    case "object":
      return (
        <fieldset className="field-group">
          {field.label && <legend>{field.label}</legend>}
          {field.fields.map((sub) => (
            <FieldRenderer
              key={sub.key}
              field={sub}
              value={value ? value[sub.key] : undefined}
              onChange={(newVal) => onChange({ ...(value || {}), [sub.key]: newVal })}
            />
          ))}
        </fieldset>
      );

    case "list":
      return (
        <ListEditor
          label={field.label}
          itemSchema={field.itemSchema}
          itemLabel={field.itemLabel || "Item"}
          value={value}
          onChange={onChange}
        />
      );

    case "list-text":
      return <TextListEditor label={field.label} value={value} onChange={onChange} />;

    default:
      return null;
  }
}

function ListEditor({ label, itemSchema, itemLabel, value, onChange }) {
  const items = value || [];

  function updateItem(index, newVal) {
    const next = items.slice();
    next[index] = newVal;
    onChange(next);
  }

  function removeItem(index) {
    if (!window.confirm(`Remove this ${itemLabel.toLowerCase()}?`)) return;
    const next = items.slice();
    next.splice(index, 1);
    onChange(next);
  }

  function addItem() {
    onChange([...items, emptyValueFor(itemSchema)]);
  }

  function moveItem(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const next = items.slice();
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    onChange(next);
  }

  return (
    <div className="list-editor">
      {label && <h3 className="list-editor-label">{label}</h3>}
      {items.length === 0 && (
        <p className="list-empty">No {itemLabel.toLowerCase()} entries yet.</p>
      )}
      {items.map((item, i) => (
        <div className="list-item" key={i}>
          <div className="list-item-header">
            <span>
              {itemLabel} {i + 1}
            </span>
            <div className="list-item-actions">
              <button type="button" onClick={() => moveItem(i, -1)} disabled={i === 0} title="Move up">
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveItem(i, 1)}
                disabled={i === items.length - 1}
                title="Move down"
              >
                ↓
              </button>
              <button type="button" className="btn-danger" onClick={() => removeItem(i)}>
                Remove
              </button>
            </div>
          </div>
          <FieldRenderer
            field={{ ...itemSchema, label: null }}
            value={item}
            onChange={(newVal) => updateItem(i, newVal)}
          />
        </div>
      ))}
      <button type="button" className="btn-add" onClick={addItem}>
        + Add {itemLabel}
      </button>
    </div>
  );
}

function TextListEditor({ label, value, onChange }) {
  const items = value || [];

  function updateItem(index, newVal) {
    const next = items.slice();
    next[index] = newVal;
    onChange(next);
  }

  function removeItem(index) {
    const next = items.slice();
    next.splice(index, 1);
    onChange(next);
  }

  function addItem() {
    onChange([...items, ""]);
  }

  return (
    <div className="list-editor">
      {label && <h3 className="list-editor-label">{label}</h3>}
      {items.map((item, i) => (
        <div className="list-text-item" key={i}>
          <input type="text" value={item} onChange={(e) => updateItem(i, e.target.value)} />
          <button type="button" className="btn-danger" onClick={() => removeItem(i)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={addItem}>
        + Add
      </button>
    </div>
  );
}

// Produces a blank starting value for a brand-new list item, matching the
// item's schema shape so nested fields render correctly right away.
function emptyValueFor(schema) {
  if (schema.type === "object") {
    const obj = {};
    schema.fields.forEach((f) => {
      if (f.type === "list" || f.type === "list-text") obj[f.key] = [];
      else if (f.type === "object") obj[f.key] = emptyValueFor(f);
      else obj[f.key] = "";
    });
    return obj;
  }
  return "";
}
