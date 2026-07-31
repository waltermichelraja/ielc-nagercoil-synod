import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import circles from "../data/circles.js";
import site from "../data/site.js";

export default function Circle() {
  const { slug } = useParams();
  const circle = circles.find((c) => c.slug === slug);

  useEffect(() => {
    if (circle) document.title = `${circle.name} — ${site.shortTitle}`;
  }, [circle]);

  if (!circle) return <Navigate to="/congregations" replace />;

  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">Circle</span>
          <h1>{circle.name}</h1>

          <div className="stat-row" style={{ justifyContent: "flex-start", textAlign: "left" }}>
            <div><span className="stat-number">{circle.pastorates}</span><span className="stat-label">Pastorates</span></div>
            <div><span className="stat-number">{circle.congregations}</span><span className="stat-label">Congregations</span></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Circle Office Bearers</h2>
          <div className="card-grid">
            <div className="card">
              <p className="role">President</p>
              <h3>{circle.president}</h3>
            </div>
            <div className="card">
              <p className="role">Vice President</p>
              <h3>{circle.vicePresident}</h3>
            </div>
            <div className="card">
              <p className="role">Secretary cum Treasurer</p>
              <h3>{circle.secretaryTreasurer}</h3>
            </div>
            <div className="card">
              <p className="role">Joint Secretary</p>
              <h3>{circle.jointSecretary}</h3>
            </div>
          </div>

          <h2 style={{ marginTop: "var(--space-4)" }}>Executive Members</h2>
          <ul>
            {circle.executiveMembers.map((member, i) => (
              <li key={i}>{member}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Link to="/congregations">&larr; Back to all Congregations</Link>
        </div>
      </section>
    </>
  );
}
