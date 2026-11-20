import { useEffect, useState } from "react";
import {
  Bug,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import {
  captureDebugError,
  clearCapturedErrors,
  getCapturedErrors,
  getDebugPreferences,
  saveDebugPreferences,
} from "../../utils/debugErrors.js";

function getLocationInfo() {
  return {
    path: `${window.location.pathname}${window.location.search}`,
    hash: window.location.hash || "(none)",
    mode: import.meta.env.MODE,
  };
}

export default function DebugPanel() {
  const [errors, setErrors] = useState(getCapturedErrors);
  const [isOpen, setIsOpen] = useState(false);
  const [routeInfoOpen, setRouteInfoOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState(getDebugPreferences);
  const [location, setLocation] = useState(getLocationInfo);

  useEffect(() => {
    const onRuntimeError = (event) => {
      captureDebugError(
        event.error || event.message || "Unknown runtime error",
        "window error",
      );
    };
    const onRejectedPromise = (event) => {
      captureDebugError(
        event.reason || "Unhandled promise rejection",
        "unhandled promise",
      );
    };
    const onCaptured = (event) => {
      setErrors(getCapturedErrors());
      if (getDebugPreferences().openOnError) setIsOpen(true);
    };
    const onClear = () => setErrors([]);
    const onNavigation = () => setLocation(getLocationInfo());
    const originalFetch = window.fetch;
    const trackedFetch = async (...args) => {
      const requestUrl =
        typeof args[0] === "string" ? args[0] : args[0]?.url || "(unknown URL)";
      const method = args[1]?.method || "GET";
      try {
        const response = await originalFetch.apply(window, args);
        if (!response.ok)
          captureDebugError(
            `${method} ${requestUrl} returned HTTP ${response.status}`,
            "API request",
          );
        return response;
      } catch (error) {
        captureDebugError(error, "network request");
        throw error;
      }
    };

    window.fetch = trackedFetch;
    window.addEventListener("error", onRuntimeError);
    window.addEventListener("unhandledrejection", onRejectedPromise);
    window.addEventListener("nearwear:debug-error", onCaptured);
    window.addEventListener("nearwear:debug-clear", onClear);
    window.addEventListener("popstate", onNavigation);
    window.addEventListener("hashchange", onNavigation);
    setErrors(getCapturedErrors());
    return () => {
      window.removeEventListener("error", onRuntimeError);
      window.removeEventListener("unhandledrejection", onRejectedPromise);
      window.removeEventListener("nearwear:debug-error", onCaptured);
      window.removeEventListener("nearwear:debug-clear", onClear);
      window.removeEventListener("popstate", onNavigation);
      window.removeEventListener("hashchange", onNavigation);
      if (window.fetch === trackedFetch) window.fetch = originalFetch;
    };
  }, []);

  function toggleAutoOpen(event) {
    const next = { ...preferences, openOnError: event.target.checked };
    setPreferences(next);
    saveDebugPreferences(next);
  }

  return (
    <div className="debug-widget" aria-label="Developer diagnostics">
      {isOpen && (
        <section className="debug-panel" aria-label="Debug and error details">
          <header className="debug-panel-header">
            <div>
              <Bug size={15} />
              <b>Nearwear diagnostics</b>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close diagnostics"
            >
              <X size={16} />
            </button>
          </header>
          <div className="debug-meta-row">
            <span>Route</span>
            <b className="debug-route" title={location.path}>
              {location.path}
            </b>
          </div>
          <div className="debug-meta-row">
            <span>Bundler</span>
            <b>Vite</b>
          </div>
          <div className="debug-meta-row">
            <span>Environment</span>
            <b>{location.mode}</b>
          </div>
          <button
            className="debug-disclosure"
            onClick={() => setRouteInfoOpen((value) => !value)}
          >
            <span>Route info</span>
            {routeInfoOpen ? (
              <ChevronDown size={15} />
            ) : (
              <ChevronRight size={15} />
            )}
          </button>
          {routeInfoOpen && (
            <div className="debug-route-info">
              <span>
                Path<b>{location.path}</b>
              </span>
              <span>
                Hash<b>{location.hash}</b>
              </span>
              <span>
                Viewport
                <b>
                  {window.innerWidth} × {window.innerHeight}
                </b>
              </span>
            </div>
          )}
          <button
            className="debug-disclosure"
            onClick={() => setPreferencesOpen((value) => !value)}
          >
            <span>Preferences</span>
            <Settings size={15} />
          </button>
          {preferencesOpen && (
            <label className="debug-preference">
              <input
                type="checkbox"
                checked={preferences.openOnError}
                onChange={toggleAutoOpen}
              />{" "}
              Open diagnostics automatically when an error occurs
            </label>
          )}
          <div className="debug-errors-heading">
            <b>
              <CircleAlert size={14} /> Errors
            </b>
            <span>{errors.length}</span>
            <button
              disabled={!errors.length}
              onClick={clearCapturedErrors}
              aria-label="Clear errors"
            >
              <Trash2 size={14} />
            </button>
          </div>
          {errors.length ? (
            <div className="debug-error-list">
              {errors.map((error) => (
                <article className="debug-error-item" key={error.id}>
                  <div>
                    <b>{error.message}</b>
                    <span>
                      {error.source} · {error.time}
                    </span>
                  </div>
                  {error.stack && (
                    <details>
                      <summary>Stack details</summary>
                      <pre>{error.stack}</pre>
                    </details>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p className="debug-no-errors">No captured runtime errors.</p>
          )}
        </section>
      )}
      <button
        className={`debug-trigger ${errors.length ? "has-errors" : ""}`}
        onClick={() => {
          setLocation(getLocationInfo());
          setIsOpen((value) => !value);
        }}
        aria-label={
          errors.length
            ? `${errors.length} captured errors; open diagnostics`
            : "Open diagnostics"
        }
      >
        <span className="debug-trigger-mark">N</span>
        <span>{errors.length ? errors.length : "DEV"}</span>
      </button>
    </div>
  );
}
