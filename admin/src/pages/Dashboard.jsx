import { Link } from "react-router-dom";
import { CONTENT_SECTIONS } from "../config/contentSchema.js";
import { currentUser, logout } from "../identity.js";

export default function Dashboard() {
  const user = currentUser();

  return (
    <div className="page">
      <div className="dashboard-header">
        <div>
          <span className="eyebrow">IELC Nagercoil Synod</span>
          <h1>Admin Dashboard</h1>
          {user?.email && <p className="dashboard-subtitle">Signed in as {user.email}</p>}
        </div>
        <button type="button" className="btn-secondary" onClick={logout}>
          Log out
        </button>
      </div>

      <div className="card-grid">
        {CONTENT_SECTIONS.map((section) => (
          <Link className="card dashboard-card" to={`/edit/${section.key}`} key={section.key}>
            <h3>{section.label}</h3>
            <p>{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
