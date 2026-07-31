import overview from "../data/overview.js";
import HierarchyDiagram from "../components/HierarchyDiagram.jsx";

export default function Overview() {
  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">The Synod at a Glance</span>
          <h1>Overview</h1>
          <p>A snapshot of the Nagercoil Synod's reach across its five circles.</p>

          <div className="stat-row">
            <div><span className="stat-number">{overview.circles}</span><span className="stat-label">Circles</span></div>
            <div><span className="stat-number">{overview.pastorates}</span><span className="stat-label">Pastorates</span></div>
            <div><span className="stat-number">{overview.congregations}</span><span className="stat-label">Congregations</span></div>
            <div><span className="stat-number">{overview.gospelCenters}</span><span className="stat-label">Gospel Centers</span></div>
            <div><span className="stat-number">{overview.schools}</span><span className="stat-label">Schools</span></div>
            <div><span className="stat-number">{overview.members}</span><span className="stat-label">Members</span></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Synod Structure</h2>
          <HierarchyDiagram tierLabel={`${overview.circles} Circles`} showStats />
        </div>
      </section>
    </>
  );
}
