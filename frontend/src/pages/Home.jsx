import{Link}from"react-router-dom";
import overview from"../data/overview.js";
import HierarchyDiagram from"../components/HierarchyDiagram.jsx";
import EventSlideshow from"../components/EventSlideshow.jsx";

export default function Home(){
  return(
    <>
      <EventSlideshow/>
      <section className="section">
        <div className="container">
          {/* <span className="eyebrow">About</span> */}
          <h2>About the IELC</h2>
          <div className="prose">
            <p>
              The Indian Evangelical Lutheran Church (IELC) is a confessional Lutheran Church denomination
              based in Nagercoil, Tamil Nadu, South India. For administrative purposes, the IELC is divided
              into three Synods &mdash; the Ambur Synod, the Nagercoil Synod, and the Tirunelveli Synod.
              The IELC was founded as a result of missionary work done in India by the Lutheran Church&ndash;Missouri
              Synod (LC-MS) in the United States. It was officially registered under the Company Registration
              Act of 1860, under its present name.
              The core of the IELC's mission is the Concordia Theological Seminary in Nagercoil, established
              in 1924 to train pastors for the Tamil- and Malayalam-speaking congregations. From October 2025,
              the IELC is headed by its President, Rev. Dr. M. Mohanan.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          {/* <span className="eyebrow">The Synod at a Glance</span> */}
          <h2>About the Nagercoil Synod</h2>
          <div className="prose">
            <p>{overview.description}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Structure</span>
          <h2>Synod and Circles</h2>
          <p>
            The Nagercoil Synod is organised into five circles, each overseeing a number of
            pastorates and congregations across the region.
          </p>
          <HierarchyDiagram tierLabel="Circles"/>
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
              <h3>Circulars</h3>
              <p>Latest circulars and official information from the Synod and Circles.</p>
              <Link to="/circulars">View circulars &rarr;</Link>
            </div>
            <div className="card">
              <h3>Events</h3>
              <p>Upcoming and recent events across the Synod, Circles, and Schools.</p>
              <Link to="/events">View events &rarr;</Link>
            </div>
            <div className="card">
              <h3>Overview</h3>
              <p>Explore the Synod structure, statistics, and congregations.</p>
              <Link to="/overview">View overview &rarr;</Link>
            </div>
            <div className="card">
              <h3>Synod Bearers</h3>
              <p>Office bearers of the Synod and each Circle.</p>
              <Link to="/leadership">View office bearers &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
