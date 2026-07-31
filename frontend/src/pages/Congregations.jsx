import { Link } from "react-router-dom";
import circles from "../data/circles.js";

export default function Congregations() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Where We Serve</span>
        <h1>Congregations</h1>
        <p>Pastorates and congregations across the Synod's five circles.</p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Circle</th>
              <th>Pastorates</th>
              <th>Congregations</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {circles.map((circle) => (
              <tr key={circle.slug}>
                <td>{circle.name}</td>
                <td>{circle.pastorates}</td>
                <td>{circle.congregations}</td>
                <td><Link to={`/circles/${circle.slug}`}>View details &rarr;</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
