import { Link } from "react-router-dom";
import site from "../data/site.js";
import about from "../data/about.js";
import HierarchyDiagram from "../components/HierarchyDiagram.jsx";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="eyebrow">India Evangelical Lutheran Church</span>
          <h1>{site.title}</h1>
          <p className="lede">
            Serving five circles across Kanyakumari and its neighbouring districts &mdash; Colachel,
            Madurai, Nagercoil, Thovalai, and Tirunelveli &mdash; in worship, education, and community
            life.
          </p>
          <Link to="/overview" className="btn">View Synod Overview</Link>
          <Link to="/message" className="btn btn-outline">Read the President's Message</Link>
        </div>
        <div className="horizon" aria-hidden="true"></div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2>{about.heading}</h2>
          <div className="prose">
            {about.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <span className="eyebrow">Structure</span>
          <h2>One Synod, Five Circles</h2>
          <p>
            The Nagercoil Synod is organised into five circles, each overseeing a number of
            pastorates and congregations across the region.
          </p>
          <HierarchyDiagram tierLabel="Circles" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Quick Links</span>
          <h2>Explore the Synod</h2>
          <div className="card-grid">
            <div className="card">
              <h3>Message</h3>
              <p>Read greetings from the President, Vice President, and other office bearers.</p>
              <Link to="/message">View messages &rarr;</Link>
            </div>
            <div className="card">
              <h3>Events</h3>
              <p>Upcoming and recent events across the Synod, Circles, and Schools.</p>
              <Link to="/events">View events &rarr;</Link>
            </div>
            <div className="card">
              <h3>Congregations</h3>
              <p>Browse pastorates and congregations by circle.</p>
              <Link to="/congregations">View congregations &rarr;</Link>
            </div>
            <div className="card">
              <h3>Admin</h3>
              <p>Office bearers of the Synod and each Circle.</p>
              <Link to="/leadership">View office bearers &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}