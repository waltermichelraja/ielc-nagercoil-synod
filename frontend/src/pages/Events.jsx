import events from"../data/events.js";

function EventCards({items,showCircle=false}){
  if(!items||items.length===0){
    return <p>No upcoming events have been published yet.</p>;
  }

  return(
    <div className="card-grid">
      {items.map((event,i)=>(
        <div className="card" key={i}>
          <img src={event.image} alt="" style={{marginBottom:"0.75rem"}}/>
          {showCircle&&<p className="role">{event.circle}</p>}
          <h3>{event.title}</h3>
          <p className="role">{event.date}</p>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
}

export default function Events(){
  return(
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">What's Happening</span>
          {/* <h1>Events</h1> */}
          <h2>Synod Upcoming Events</h2>
          <EventCards items={events.upcomingEvents}/>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Synod Events</h2>
          <EventCards items={events.synodEvents}/>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Circle Events</h2>
          <EventCards items={events.circleEvents} showCircle/>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>School Events</h2>
          <EventCards items={events.schoolEvents}/>
        </div>
      </section>
    </>
  );
}
