import circles from "../data/circles.js";

export default function HierarchyDiagram({ tierLabel = "Circles", showStats = false }) {
  return (
    <div className="hierarchy">
      <div className="hierarchy-node">
        <div className="hierarchy-tier-label">Synod</div>
        <div className="hierarchy-synod">Nagercoil Synod</div>
      </div>
      <div className="hierarchy-connector" aria-hidden="true"></div>
      <div className="hierarchy-node">
        <div className="hierarchy-tier-label">{tierLabel}</div>
        <div className="hierarchy-circles">
          {circles.map((circle) => (
            <div className="hierarchy-circle" key={circle.slug}>
              {circle.name}
              {showStats && (
                <>
                  <br />
                  <small>
                    {circle.pastorates} pastorates &middot; {circle.congregations} congregations
                  </small>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
