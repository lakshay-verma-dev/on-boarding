import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin") redirect("/dashboard/employee/attendance");

  return (
    <>
      <style>{`
        .page-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 28px; flex-wrap: wrap; gap: 12px;
        }
        .page-header h1 {
          font-size: 22px; font-weight: 600;
          color: var(--text-primary); letter-spacing: -0.02em; margin-bottom: 4px;
        }
        .page-header p { font-size: 13px; color: var(--text-secondary); }
        .btn-primary {
          background: var(--accent); color: #fff; border: none;
          padding: 9px 20px; border-radius: var(--radius-md);
          font-family: var(--font-sans); font-size: 13px; font-weight: 600;
          cursor: pointer; box-shadow: 0 2px 12px var(--accent-glow);
          transition: background 0.2s, transform 0.1s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .btn-primary:hover { background: #4f52d9; transform: translateY(-1px); }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 14px; margin-bottom: 24px;
        }
        .stat-card {
          background: var(--bg-surface); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 18px;
          animation: fadeUp 0.4s ease both;
        }
        .stat-card:nth-child(2) { animation-delay: 0.05s; }
        .stat-card:nth-child(3) { animation-delay: 0.1s; }
        .stat-label {
          font-size: 10px; font-weight: 600; color: var(--text-muted);
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;
        }
        .stat-value {
          font-size: 28px; font-weight: 300; color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        .stat-value.accent { color: var(--accent-light); }
        .stat-value.success { color: var(--success); }

        .empty-state {
          background: var(--bg-surface); border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 72px 32px;
          text-align: center; animation: fadeUp 0.4s ease 0.15s both;
        }
        .empty-icon { font-size: 40px; margin-bottom: 16px; }
        .empty-title {
          font-size: 16px; font-weight: 500; color: var(--text-primary); margin-bottom: 8px;
        }
        .empty-desc {
          font-size: 13px; color: var(--text-secondary);
          max-width: 360px; margin: 0 auto 24px; line-height: 1.6;
        }
      `}</style>

      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p>All company projects and their teams</p>
        </div>
        <button className="btn-primary">+ New Project</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total projects</div>
          <div className="stat-value accent">0</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active</div>
          <div className="stat-value success">0</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Completed</div>
          <div className="stat-value">0</div>
        </div>
      </div>

      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <div className="empty-title">No projects yet</div>
        <div className="empty-desc">
          Create your first project and assign employees with roles like Lead,
          Designer, Frontend, or Backend. Leads can manage tasks and team members.
        </div>
        <button className="btn-primary">+ Create first project</button>
      </div>
    </>
  );
}
