export function Field({ label, ...inputProps }) {
  return (
    <label className="fm-field">
      <span className="fm-label">{label}</span>
      <input className="fm-input" {...inputProps} />
    </label>
  );
}
