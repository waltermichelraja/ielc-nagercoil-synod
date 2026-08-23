import overview from "../data/overview.js";
import HierarchyDiagram from "../components/HierarchyDiagram.jsx";

export default function Overview() {
  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">The Synod at a Glance</span>
          <h1>Overview</h1>
          <p>The IELC-Nagercoil Synod plays a vital role in the IELC History. The headquarters of the IELC is located in the Nagercoil Synod. 
            Although the ministry was initiated in India by American LC-MS missionaries in 1895, it expanded to the Nagercoil area in November 1907. 
            Mr. G. Yesudasan from Nagercoil was instrumental in the establishment of the Lutheran Church in this region. 
            Missionaries G. Huebner and T. Gutknecht initiated ministry in the area by establishing the Vadasery Church in 1907. 
            Following that, the ministries of the LC-MS began to spread across the areas of the then-Tirunelveli district. 
            Currently, the Nagercoil Synod is divided into five zones for administrative purposes: Colachel Circle, Nagercoil Circle, Madurai Circle, Thovalai Circle, and Tirunelveli Circle. 
            Twenty-Nine schools operate under the Nagercoil Synod. 
            Rev. R. Sathyanathan has been serving as the President of the Nagercoil Synod since October 2025.</p>
            
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
          <HierarchyDiagram tierLabel={`${overview.circles} Circles`} showStats />
        </div>
      </section>
    </>
  );
}