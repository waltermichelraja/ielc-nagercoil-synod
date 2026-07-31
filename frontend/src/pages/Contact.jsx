import site from "../data/site.js";

export default function Contact() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Get in Touch</span>
        <h1>Contact</h1>

        <div className="card-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <h2>Office Details</h2>
            <p>
              {site.contact.officeName}
              <br />
              {site.contact.address}
              <br />
              Email: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              <br />
              Phone: {site.contact.phone}
            </p>

            {site.contact.mapEmbedUrl && (
              <iframe
                src={site.contact.mapEmbedUrl}
                width="100%"
                height="260"
                style={{ border: 0, borderRadius: "4px" }}
                loading="lazy"
                title="Synod office location"
              ></iframe>
            )}
          </div>

          <div>
            <h2>Send a Message</h2>
            {/* Replace the action URL with your Formspree endpoint (https://formspree.io) */}
            <form className="contact-form" action="https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID" method="POST">
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
