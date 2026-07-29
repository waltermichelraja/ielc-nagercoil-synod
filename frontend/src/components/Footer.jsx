import { Link } from "react-router-dom";
import site from "../data/site.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>{site.shortTitle}</h4>
            <p>
              {site.contact.officeName}
              <br />
              {site.contact.address}
            </p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>
              Email: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              <br />
              Phone: {site.contact.phone}
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <p>
              <Link to="/events">Events</Link>
              <br />
              <Link to="/overview">Synod Overview</Link>
              <br />
              <Link to="/congregations">Congregations</Link>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {year} {site.title}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
