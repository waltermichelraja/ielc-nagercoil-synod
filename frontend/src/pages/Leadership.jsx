import { Link } from "react-router-dom";
import synodBearers from "../data/synodBearers.js";

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
          <h1>Office Bearers</h1>
          <p>Office bearers of the Nagercoil Synod.</p>

          <div className="card-grid">
            {officeBearers.map(({ key, role }) => {
              const person = synodBearers[key];
              return (
                <div className="card" key={key}>
                  <img className="person-photo" src={person.photo} alt="" />
                  <p className="role">{role}</p>
                  <h3>{person.name}</h3>
                  {person.phone && <p>{person.phone}</p>}
                  {person.bio && <p>{person.bio}</p>}
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
                <p className="role">{member.place}</p>
                {member.phone && <p>{member.phone}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Church Council Members</h2>
          <div className="card-grid">
            {synodBearers.churchCouncilMembers.map((member, i) => (
              <div className="card" key={i}>
                <h3>{member.name}</h3>
                <p className="role">{member.place}</p>
                {member.phone && <p>{member.phone}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Trust Association Members</h2>
          <div className="card-grid">
            {synodBearers.trustAssociationMembers.map((member, i) => (
              <div className="card" key={i}>
                <h3>{member.name}</h3>
                <p className="role">{member.place}</p>
                {member.phone && <p>{member.phone}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}