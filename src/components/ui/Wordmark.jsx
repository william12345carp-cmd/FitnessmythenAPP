export function Wordmark({ size = 15 }) {
  return (
    <span
      style={{
        fontFamily: "var(--sans)",
        fontWeight: 600,
        fontSize: size,
        letterSpacing: "0.02em",
      }}
    >
      Fitnessmythen<span style={{ color: "var(--fm-red)" }}>.</span>
    </span>
  );
}
