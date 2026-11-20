import React from "react";
import { captureDebugError } from "../../utils/debugErrors.js";

export default class DebugErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    const captured = new Error(error.message);
    captured.stack = `${error.stack || error.message}\n\nReact component stack:\n${info.componentStack || "(unavailable)"}`;
    captureDebugError(captured, "React render");
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="debug-error-fallback" role="alert">
          <p className="debug-eyebrow">DEVELOPMENT ERROR</p>
          <h1>This screen could not render.</h1>
          <p>
            Open the Nearwear diagnostics panel to inspect the captured error.
          </p>
          <button
            onClick={() =>
              this.setState({ hasError: false, componentStack: "" })
            }
          >
            Try rendering again
          </button>
        </main>
      );
    }
    return this.props.children;
  }
}
