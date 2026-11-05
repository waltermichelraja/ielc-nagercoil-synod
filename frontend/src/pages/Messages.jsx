import messages from "../data/messages.js";
import synodBearers from "../data/synodBearers.js";

const bearerKeyByRole={
  "President's Message":"president",
  "Vice President's Message":"vicePresident",
  "Secretary's Message":"secretary",
  "Joint Secretary's Message":"jointSecretary",
  "Treasurer's Message":"treasurer",
};

export default function Message(){
  return(
    <section className="section message-section">
      <div className="container">
        <span className="eyebrow">Voices of the Synod</span>
        <h1>Messages</h1>
        <p className="message-intro">
          Greetings and reflections from the Synod's leadership.
        </p>

        <div className="messages-list">
          {messages.map((msg,i)=>{
            const bearerKey=bearerKeyByRole[msg.role];
            const bearer=bearerKey?synodBearers[bearerKey]:null;

            return(
              <article className="message-entry" key={i}>
                <div className="message-heading">
                  <span className="message-index">
                    {String(i+1).padStart(2,"0")}
                  </span>

                  <div>
                    <h2>{msg.role}</h2>

                    <p className="message-author">
                      {msg.author}
                    </p>

                    {bearer?.photo&&(
                      <img
                        className="person-photo message-person-photo"
                        src={bearer.photo}
                        alt={bearer.name}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>

                <div className={`message-content${msg.role==="President's Message"?" message-president":msg.role==="Secretary's Message"?" message-secretary":""}`}>
                  {msg.text}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}