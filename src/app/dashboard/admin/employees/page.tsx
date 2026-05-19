import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminEmployeesPage() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin") redirect("/dashboard/employee/attendance");

  return (
    <>
      <style>{`
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .page-header h1 {
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        .page-header p {
          font-size: 13px;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .btn-primary {
          background: var(--accent);
          color: #fff;
          border: none;
          padding: 9px 20px;
          border-radius: var(--radius-md);
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 12px var(--accent-glow);
          transition: background 0.2s, transform 0.1s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-primary:hover { background: #4f52d9; transform: translateY(-1px); }

        /* Stat cards */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }
        .stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px;
          animation: fadeUp 0.4s ease both;
        }
        .stat-card:nth-child(2) { animation-delay: 0.05s; }
        .stat-card:nth-child(3) { animation-delay: 0.10s; }
        .stat-card:nth-child(4) { animation-delay: 0.15s; }
        .stat-card-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 10px;
        }
        .stat-card-value {
          font-size: 32px;
          font-weight: 300;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-card-sub {
          font-size: 12px;
          color: var(--text-muted);
        }
        .stat-accent { color: var(--accent-light); }
        .stat-success { color: var(--success); }
        .stat-warning { color: var(--warning); }

        /* Placeholder empty state */
        .empty-state {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 64px 32px;
          text-align: center;
          animation: fadeUp 0.4s ease 0.2s both;
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
          margin: 0 auto 24px;
          line-height: 1.6;
        }
      `}</style>

      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p>Add and manage your team members</p>
        </div>
        <button className="btn-primary">+ Add Employee</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-label">Total employees</div>
          <div className="stat-card-value stat-accent">0</div>
          <div className="stat-card-sub">Registered accounts</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Present today</div>
          <div className="stat-card-value stat-success">0</div>
          <div className="stat-card-sub">Clocked in</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">On leave</div>
          <div className="stat-card-value stat-warning">0</div>
          <div className="stat-card-sub">Approved leaves</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Departments</div>
          <div className="stat-card-value">0</div>
          <div className="stat-card-sub">Active departments</div>
        </div>
      </div>

      <div className="empty-state">
        <div className="empty-icon">👥</div>
        <div className="empty-title">No employees yet</div>
        <div className="empty-desc">
          Create employee accounts to get started. Each employee will be able to
          log attendance and view their assigned projects.
        </div>
        <button className="btn-primary">+ Add your first employee</button>
      </div>
    </>
  );
}
