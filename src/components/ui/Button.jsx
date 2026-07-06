export function Button({ variant = "primary", children, ...props }) {
  return (
    <button className={`fm-btn fm-btn--${variant}`} {...props}>
      {children}
    </button>
  );
}
