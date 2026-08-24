import{useEffect}from"react";
import{useParams,Link,Navigate}from"react-router-dom";
import circles from"../data/circles.js";
import site from"../data/site.js";

export default function Circle(){
  const{slug}=useParams();
  const circle=circles.find(c=>c.slug===slug);

  useEffect(()=>{
    if(circle)document.title=`${circle.name} — ${site.shortTitle}`;
  },[circle]);

  if(!circle)return <Navigate to="/overview" replace/>;

  return(
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">Circle</span>
          <h1>{circle.name}</h1>
          <div className="stat-row" style={{justifyContent:"flex-start",textAlign:"left"}}>
            <div><span className="stat-number">{circle.pastors}</span><span className="stat-label">Pastors</span></div>
            <div><span className="stat-number">{circle.probationers}</span><span className="stat-label">Probationers</span></div>
            <div><span className="stat-number">{circle.pastorates}</span><span className="stat-label">Pastorates</span></div>
            <div><span className="stat-number">{circle.congregations}</span><span className="stat-label">Congregations</span></div>
            <div><span className="stat-number">{circle.gospelCenters}</span><span className="stat-label">Gospel Centers</span></div>
            <div><span className="stat-number">{circle.schools.total}</span><span className="stat-label">Schools</span></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Circle Office Bearers</h2>
          <div className="card-grid">
            <div className="card"><p className="role">President</p><h3>{circle.president}</h3></div>
            <div className="card"><p className="role">Vice President</p><h3>{circle.vicePresident}</h3></div>
            <div className="card"><p className="role">Secretary cum Treasurer</p><h3>{circle.secretaryTreasurer}</h3></div>
            <div className="card"><p className="role">Joint Secretary</p><h3>{circle.jointSecretary}</h3></div>
          </div>

          <h2 style={{marginTop:"var(--space-4)"}}>Circle Executives</h2>
          <table className="data-table">
            <thead><tr><th>Name</th><th>Pastorate</th></tr></thead>
            <tbody>
              {circle.executiveMembers.map((member,i)=>(
                <tr key={i}><td>{member.name}</td><td>{member.pastorate}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Schools in this Circle</h2>
          <div className="stat-row" style={{justifyContent:"flex-start",textAlign:"left"}}>
            <div><span className="stat-number">{circle.schools.primary}</span><span className="stat-label">Primary</span></div>
            <div><span className="stat-number">{circle.schools.middle}</span><span className="stat-label">Middle</span></div>
            <div><span className="stat-number">{circle.schools.hs}</span><span className="stat-label">High School</span></div>
            <div><span className="stat-number">{circle.schools.hss}</span><span className="stat-label">Hr. Sec. School</span></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Link to="/overview">&larr; Back to Overview</Link>
        </div>
      </section>
    </>
  );
}
