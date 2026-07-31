import messages from "../data/messages.js";

export default function Message() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Voices of the Synod</span>
        <h1>Message</h1>
        <p>Greetings and reflections from the Synod's leadership.</p>

        <div className="card-grid">
          {messages.map((msg, i) => (
            <div className="card" key={i}>
              <h3>{msg.role}</h3>
              <p className="role">{msg.author}</p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
