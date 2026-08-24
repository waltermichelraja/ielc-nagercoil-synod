import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import site from "../data/site.js";

export const NAV_ITEMS = [
  { to: "/home", label: "Home", end: true },
  { to: "/message", label: "Message" },
  { to: "/events", label: "Events" },
  { to: "/overview", label: "Overview" },
  { to: "/leadership", label: "Admin" },
  { to: "/congregations", label: "Congregations" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="site-header">
      <div className="container">
        <NavLink to="/home" className="brand" onClick={() => setOpen(false)}>
          <img className="brand-mark" src="/images/ielc-logo.png" alt="IELC logo" />
          <span className="brand-text">
            <span className="brand-name">{site.shortTitle}</span>
            <span className="brand-tagline">{site.tagline}</span>
          </span>
        </NavLink>

        <button
          className="nav-toggle"
          id="nav-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>

        <nav className={`main-nav${open ? " is-open" : ""}`} id="main-nav">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  aria-current={
                    (item.end ? pathname === item.to : pathname.startsWith(item.to))
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {site.notices && site.notices.length > 0 && (
        <div className="ticker" role="marquee" aria-label="Notice board">
          <div className="ticker-track">
            {site.notices.map((notice, i) => (
              <span key={`a-${i}`}>{notice}</span>
            ))}
            {site.notices.map((notice, i) => (
              <span key={`b-${i}`}>{notice}</span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}