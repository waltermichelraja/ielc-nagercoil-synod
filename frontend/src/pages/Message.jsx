import messages from "../data/messages.js";

export default function Message(){
  return (
    <section className="section message-section">
      <div className="container">
        <span className="eyebrow">Voices of the Synod</span>
        <h1>Message</h1>
        <p className="message-intro">Greetings and reflections from the Synod's leadership.</p>
        <div className="messages-list">
          {messages.map((msg,i)=>(
            <article className="message-entry" key={i}>
              <div className="message-heading">
                <span className="message-index">{String(i+1).padStart(2,"0")}</span>
                <div>
                  <h2>{msg.role}</h2>
                  <p className="message-author">{msg.author}</p>
                </div>
              </div>
              <div className="message-content">{msg.text}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}