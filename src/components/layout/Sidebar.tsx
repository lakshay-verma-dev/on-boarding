"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const ADMIN_NAV: NavItem[] = [
  { href: "/dashboard/admin/employees", label: "Employees",  icon: "👥" },
  { href: "/dashboard/admin/attendance", label: "Attendance", icon: "🕐" },
  { href: "/dashboard/admin/projects",   label: "Projects",   icon: "📋" },
];

const EMPLOYEE_NAV: NavItem[] = [
  { href: "/dashboard/employee/attendance", label: "My Attendance", icon: "🕐" },
  { href: "/dashboard/employee/projects",   label: "My Projects",   icon: "📋" },
];

interface SidebarProps {
  role: string;
  userName: string;
}

export default function Sidebar({ role, userName }: SidebarProps) {
  const pathname = usePathname();
  const nav = role === "admin" ? ADMIN_NAV : EMPLOYEE_NAV;

  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <style>{`
        .sidebar {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: 240px;
          background: var(--bg-surface);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          z-index: 100;
        }

        /* Brand */
        .sidebar-brand {
          padding: 24px 20px 20px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .sidebar-brand-icon {
          width: 32px; height: 32px;
          background: var(--accent);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          box-shadow: 0 0 16px var(--accent-glow);
          flex-shrink: 0;
        }
        .sidebar-brand-text {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .sidebar-brand-sub {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Role badge */
        .sidebar-role {
          margin: 16px 20px 8px;
        }
        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 10px;
          border-radius: 99px;
        }
        .role-badge.admin {
          background: var(--accent-dim);
          color: var(--accent-light);
          border: 1px solid var(--border-accent);
        }
        .role-badge.employee {
          background: var(--success-dim);
          color: #6ee7b7;
          border: 1px solid rgba(16,185,129,0.25);
        }

        /* Nav section label */
        .nav-label {
          padding: 12px 20px 6px;
          font-size: 10px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Nav items */
        .nav-list {
          list-style: none;
          padding: 0 12px;
          flex: 1;
        }
        .nav-item { margin-bottom: 2px; }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: var(--radius-md);
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-secondary);
          transition: background 0.15s, color 0.15s;
          position: relative;
        }
        .nav-link:hover {
          background: var(--bg-raised);
          color: var(--text-primary);
        }
        .nav-link.active {
          background: var(--accent-dim);
          color: var(--accent-light);
          border: 1px solid var(--border-accent);
        }
        .nav-link.active::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 50%; transform: translateY(-50%);
          width: 3px; height: 20px;
          background: var(--accent);
          border-radius: 0 3px 3px 0;
        }
        .nav-icon {
          font-size: 15px;
          flex-shrink: 0;
          width: 20px;
          text-align: center;
        }

        /* Divider */
        .sidebar-divider {
          height: 1px;
          background: var(--border);
          margin: 12px 20px;
        }

        /* User block at bottom */
        .sidebar-user {
          padding: 16px 20px;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }
        .user-card {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .user-avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: var(--accent-dim);
          border: 1px solid var(--border-accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px;
          font-weight: 600;
          color: var(--accent-light);
          flex-shrink: 0;
        }
        .user-info { min-width: 0; }
        .user-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user-role-text {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: capitalize;
        }
        .btn-logout {
          width: 100%;
          background: var(--bg-raised);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          padding: 8px 12px;
          border-radius: var(--radius-md);
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-logout:hover {
          background: var(--danger-dim);
          color: #fca5a5;
          border-color: rgba(239,68,68,0.3);
        }

        @media (max-width: 900px) {
          .sidebar { transform: translateX(-100%); }
        }
      `}</style>

      <aside className="sidebar">
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">⬡</div>
          <div>
            <div className="sidebar-brand-text">WorkSpace</div>
            <div className="sidebar-brand-sub">HRM System</div>
          </div>
        </div>

        {/* Role badge */}
        <div className="sidebar-role">
          <span className={`role-badge ${role}`}>
            {role === "admin" ? "⚙ Admin" : "● Employee"}
          </span>
        </div>

        {/* Nav label */}
        <div className="nav-label">Navigation</div>

        {/* Nav links */}
        <ul className="nav-list">
          {nav.map((item) => (
            <li key={item.href} className="nav-item">
              <Link
                href={item.href}
                className={`nav-link ${pathname.startsWith(item.href) ? "active" : ""}`}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User + logout */}
        <div className="sidebar-user">
          <div className="user-card">
            <div className="user-avatar">{initials}</div>
            <div className="user-info">
              <div className="user-name">{userName}</div>
              <div className="user-role-text">{role}</div>
            </div>
          </div>
          <button
            className="btn-logout"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            ↩ Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
