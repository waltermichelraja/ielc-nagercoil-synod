import { Link } from "react-router-dom";
import synodBearers from "../data/synodBearers.js";
import circles from "../data/circles.js";

export default function Leadership() {
  const officeBearers = [
    { key: "president", role: "President" },
    { key: "vicePresident", role: "Vice President" },
    { key: "secretary", role: "Secretary" },
    { key: "jointSecretary", role: "Joint Secretary" },
    { key: "treasurer", role: "Treasurer" },
  ];

  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">Leadership</span>
          <h1>Admin</h1>
          <p>Office bearers of the Nagercoil Synod.</p>

          <div className="card-grid">
            {officeBearers.map(({ key, role }) => {
              const person = synodBearers[key];
              return (
                <div className="card" key={key}>
                  <img className="person-photo" src={person.photo} alt="" />
                  <p className="role">{role}</p>
                  <h3>{person.name}</h3>
                  <p>{person.bio}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Executive Members</h2>
          <div className="card-grid">
            {synodBearers.executiveMembers.map((member, i) => (
              <div className="card" key={i}>
                <img className="person-photo" src={member.photo} alt="" />
                <h3>{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Office Staff</h2>
          <div className="card-grid">
            {synodBearers.officeStaff.map((staff, i) => (
              <div className="card" key={i}>
                <img className="person-photo" src={staff.photo} alt="" />
                <h3>{staff.name}</h3>
                <p className="role">{staff.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Circle Office Bearers</h2>
          <p>
            Each circle has its own President, Vice President, Secretary cum Treasurer, Joint
            Secretary, and Executive Members.
          </p>
          <div className="card-grid">
            {circles.map((circle) => (
              <div className="card" key={circle.slug}>
                <h3>{circle.name}</h3>
                <p>
                  <strong>President:</strong> {circle.president}
                  <br />
                  <strong>Vice President:</strong> {circle.vicePresident}
                  <br />
                  <strong>Secretary cum Treasurer:</strong> {circle.secretaryTreasurer}
                  <br />
                  <strong>Joint Secretary:</strong> {circle.jointSecretary}
                </p>
                <Link to={`/circles/${circle.slug}`}>View {circle.name} &rarr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
