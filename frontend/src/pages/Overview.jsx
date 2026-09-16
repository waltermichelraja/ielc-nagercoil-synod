import overview from"../data/overview.js";
import circles from"../data/circles.js";
import HierarchyDiagram from"../components/HierarchyDiagram.jsx";

export default function Overview(){
  return(
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">The Synod at a Glance</span>
          <h1>Overview</h1>
          {/* <p>{overview.description}</p> */}

          <div className="stat-row">
            <div><span className="stat-number">{overview.circles}</span><span className="stat-label">Circles</span></div>
            <div><span className="stat-number">{overview.pastors}</span><span className="stat-label">Pastors</span></div>
            <div><span className="stat-number">{overview.probationers}</span><span className="stat-label">Probationers</span></div>
            <div><span className="stat-number">{overview.pastorates}</span><span className="stat-label">Pastorates</span></div>
            <div><span className="stat-number">{overview.congregations}</span><span className="stat-label">Congregations</span></div>
            <div><span className="stat-number">{overview.gospelCenters}</span><span className="stat-label">Gospel Centers</span></div>
            <div><span className="stat-number">{overview.schools}</span><span className="stat-label">Schools</span></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Synod Structure</h2>
          <HierarchyDiagram tierLabel={`${overview.circles} Circles`} showStats/>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Circles</h2>
          <p>Pastors, pastorates, congregations, gospel centers, and schools across the Synod's five circles.</p>
          <div className="card-grid">
            {circles.map(circle=>(
              <div className="card" key={circle.slug}>
                <h3>{circle.name}</h3>
                <p>
                  <strong>President:</strong> {circle.president}
                  <br/>
                  <strong>Vice President:</strong> {circle.vicePresident}
                  <br/>
                  <strong>Secretary cum Treasurer:</strong> {circle.secretaryTreasurer}
                  <br/>
                  <strong>Joint Secretary:</strong> {circle.jointSecretary}
                </p>
                <a href={`/circles/${circle.slug}`}>View {circle.name} &rarr;</a>
              </div>
            ))}
          </div>

        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <h2>Circle Statistics</h2>
          <div style={{overflowX:"auto",marginTop:"var(--space-4)"}}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Circle</th>
                  <th>Pastors</th>
                  <th>Probationers</th>
                  <th>Pastorates</th>
                  <th>Congregations</th>
                  <th>Gospel Centers</th>
                  <th>Schools</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {circles.map(circle=>(
                  <tr key={circle.slug}>
                    <td>{circle.name}</td>
                    <td>{circle.pastors}</td>
                    <td>{circle.probationers}</td>
                    <td>{circle.pastorates}</td>
                    <td>{circle.congregations}</td>
                    <td>{circle.gospelCenters}</td>
                    <td>{circle.schools.total}</td>
                    <td><a href={`/circles/${circle.slug}`}>View details &rarr;</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
