import { Component } from "react";

/** Fängt unerwartete Renderfehler ab — ruhiger Ton gemäß §7, kein Drama. */
export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // TODO: An Error-Tracking anbinden, sobald Analytics integriert ist.

    console.error("[error-boundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fm-root">
          <div className="fm-phone">
            <div className="fm-screen fm-screen--center" role="alert">
              <h1 className="fm-display fm-display--md">Etwas ist schiefgelaufen.</h1>
              <p className="fm-body" style={{ margin: "12px 0 24px" }}>
                Lade die Seite neu — deine Karte wartet danach wieder auf dich.
              </p>
              <button className="fm-btn fm-btn--primary" onClick={() => window.location.reload()}>
                Neu laden
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
