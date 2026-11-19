import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AdminApp from "./AdminApp.jsx";
import "./styles/main.scss";
import DebugPanel from "./components/debug/DebugPanel.jsx";
import DebugErrorBoundary from "./components/debug/DebugErrorBoundary.jsx";

const Root = window.location.pathname.startsWith("/admin") ? AdminApp : App;
const AppTree = import.meta.env.DEV
  ? <><DebugErrorBoundary><Root /></DebugErrorBoundary><DebugPanel /></>
  : <Root />;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>{AppTree}</React.StrictMode>,
);

