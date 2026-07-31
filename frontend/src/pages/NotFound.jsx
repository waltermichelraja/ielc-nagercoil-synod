import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/home" className="btn">Back to Home</Link>
      </div>
    </section>
  );
}
