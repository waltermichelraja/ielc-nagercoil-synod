import { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import * as identity from "./identity.js";
import Login from "./components/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditContent from "./pages/EditContent.jsx";

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = still checking

  useEffect(() => {
    identity.onAuthChange(setUser);
    identity.init();
    // If init() doesn't fire an "init" event fast enough, fall back to a
    // direct check so we don't get stuck on the loading state.
    setUser((current) => (current === undefined ? identity.currentUser() : current));
  }, []);

  if (user === undefined) {
    return <div className="loading-screen">Loading…</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit/:key" element={<EditContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
