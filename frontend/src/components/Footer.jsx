import{Link}from"react-router-dom";
import site from"../data/site.js";

export default function Footer(){
  const year=new Date().getFullYear();
  const{contact}=site;

  return(
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>{site.shortTitle}</h4>
            <p>
              {contact.officeName}
              <br/>
              {contact.address}
            </p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>
              {contact.email&&<>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></>}
              {contact.email&&contact.phone&&<br/>}
              {contact.phone&&<>Phone: {contact.phone}</>}
              {!contact.email&&!contact.phone&&<>Contact details will be updated when an email address or phone number is provided.</>}
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <p>
              <Link to="/events">Events</Link>
              <br/>
              <Link to="/overview">Synod Overview</Link>
            </p>
          </div>
        </div>
        <div className="footer-bottom">&copy; {year} {site.title}. All rights reserved.</div>
      </div>
    </footer>
  );
}
