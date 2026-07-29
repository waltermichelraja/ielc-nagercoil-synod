import events from "../data/events.js";

export default function Events() {
  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">What's Happening</span>
          <h1>Events</h1>

          <h2>Synod Events</h2>
          <div className="card-grid">
            {events.synodEvents.map((event, i) => (
              <div className="card" key={i}>
                <img src={event.image} alt="" style={{ marginBottom: "0.75rem" }} />
                <h3>{event.title}</h3>
                <p className="role">{event.date}</p>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Circle Events</h2>
          <div className="card-grid">
            {events.circleEvents.map((event, i) => (
              <div className="card" key={i}>
                <img src={event.image} alt="" style={{ marginBottom: "0.75rem" }} />
                <p className="role">{event.circle}</p>
                <h3>{event.title}</h3>
                <p className="role">{event.date}</p>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>School Events</h2>
          <div className="card-grid">
            {events.schoolEvents.map((event, i) => (
              <div className="card" key={i}>
                <img src={event.image} alt="" style={{ marginBottom: "0.75rem" }} />
                <h3>{event.title}</h3>
                <p className="role">{event.date}</p>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
