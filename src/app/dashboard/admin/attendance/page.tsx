import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminAttendancePage() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin") redirect("/dashboard/employee/attendance");

  return (
    <>
      <style>{`
        .page-header { margin-bottom: 28px; }
        .page-header h1 {
          font-size: 22px; font-weight: 600;
          color: var(--text-primary); letter-spacing: -0.02em; margin-bottom: 4px;
        }
        .page-header p { font-size: 13px; color: var(--text-secondary); }

        .filter-row {
          display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;
        }
        .filter-input {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 8px 14px;
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.2s;
          min-width: 180px;
        }
        .filter-input:focus { border-color: var(--accent); }
        .filter-input::placeholder { color: var(--text-muted); }

        .table-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          animation: fadeUp 0.4s ease both;
        }
        .table-header {
          padding: 16px 24px;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
        }
        .table-header h3 {
          font-size: 14px; font-weight: 600; color: var(--text-primary);
        }
        .table-header span { font-size: 12px; color: var(--text-muted); }
        .empty-table {
          padding: 64px 32px; text-align: center;
          color: var(--text-muted); font-size: 13px;
        }
        .empty-table-icon { font-size: 32px; margin-bottom: 10px; }
      `}</style>

      <div className="page-header">
        <h1>Attendance</h1>
        <p>View and manage all employee attendance records</p>
      </div>

      <div className="filter-row">
        <input className="filter-input" type="date" placeholder="Select date" />
        <input className="filter-input" type="text" placeholder="Search employee…" />
        <input className="filter-input" type="text" placeholder="Filter by type…" />
      </div>

      <div className="table-card">
        <div className="table-header">
          <h3>All attendance records</h3>
          <span>0 records</span>
        </div>
        <div className="empty-table">
          <div className="empty-table-icon">🕐</div>
          No attendance records found. Records will appear once employees start clocking in.
        </div>
      </div>
    </>
  );
}
