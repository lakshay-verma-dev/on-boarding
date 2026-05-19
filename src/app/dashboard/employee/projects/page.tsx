import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function EmployeeProjectsPage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <style>{`
        .projects-header {
          margin-bottom: 28px;
        }
        .projects-header h1 {
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .projects-header p {
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* Filter tabs */
        .filter-tabs {
          display: flex;
          gap: 4px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 4px;
          width: fit-content;
          margin-bottom: 24px;
        }
        .filter-tab {
          padding: 6px 16px;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.15s;
          border: none;
          background: none;
          font-family: var(--font-sans);
        }
        .filter-tab.active {
          background: var(--bg-overlay);
          color: var(--text-primary);
        }

        /* Empty state */
        .empty-state {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 80px 32px;
          text-align: center;
          animation: fadeUp 0.4s ease 0.1s both;
        }
        .empty-icon { font-size: 40px; margin-bottom: 16px; }
        .empty-title {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        .empty-desc {
          font-size: 13px;
          color: var(--text-secondary);
          max-width: 340px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Project cards grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }
        .project-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px;
          transition: border-color 0.2s, transform 0.2s;
          cursor: pointer;
          animation: fadeUp 0.4s ease both;
        }
        .project-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .project-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .project-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .role-chip {
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 99px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          flex-shrink: 0;
        }
        .role-chip.lead {
          background: var(--accent-dim);
          color: var(--accent-light);
          border: 1px solid var(--border-accent);
        }
        .role-chip.member {
          background: var(--bg-overlay);
          color: var(--text-secondary);
          border: 1px solid var(--border);
        }
      `}</style>

      <div className="projects-header">
        <h1>My Projects</h1>
        <p>Projects you are assigned to as a team member or lead</p>
      </div>

      <div className="filter-tabs">
        <button className="filter-tab active">All</button>
        <button className="filter-tab">Active</button>
        <button className="filter-tab">Completed</button>
      </div>

      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <div className="empty-title">No projects assigned yet</div>
        <div className="empty-desc">
          When your admin adds you to a project, it will appear here. You will be
          able to view your tasks and team members.
        </div>
      </div>
    </>
  );
}
