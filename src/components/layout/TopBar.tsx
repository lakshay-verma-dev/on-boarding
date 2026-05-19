"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface TopBarProps {
  userName: string;
  role: string;
  email: string;
}

function getPageTitle(pathname: string): { title: string; desc: string } {
  if (pathname.includes("/admin/employees"))
    return { title: "Employees", desc: "Manage your team members" };
  if (pathname.includes("/admin/attendance"))
    return { title: "Attendance", desc: "View all team attendance records" };
  if (pathname.includes("/admin/projects"))
    return { title: "Projects", desc: "Overview of all company projects" };
  if (pathname.includes("/employee/attendance"))
    return { title: "My Attendance", desc: "Track your attendance and leaves" };
  if (pathname.includes("/employee/projects"))
    return { title: "My Projects", desc: "Projects you're assigned to" };
  return { title: "Dashboard", desc: "Welcome back" };
}

export default function TopBar({ userName, role, email }: TopBarProps) {
  const pathname = usePathname();
  const { title, desc } = getPageTitle(pathname);

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        .topbar {
          height: 64px;
          border-bottom: 1px solid var(--border);
          background: rgba(18,20,26,0.8);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: sticky;
          top: 0;
          z-index: 50;
          flex-shrink: 0;
        }
        .topbar-left {}
        .topbar-title {
          font-size: 17px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .topbar-desc {
          font-size: 12px;
          color: var(--text-muted);
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .topbar-clock {
          text-align: right;
        }
        .topbar-time {
          font-family: var(--font-mono);
          font-size: 15px;
          font-weight: 500;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }
        .topbar-date {
          font-size: 11px;
          color: var(--text-muted);
          text-align: right;
        }
        .topbar-divider {
          width: 1px;
          height: 28px;
          background: var(--border);
        }
        .topbar-user {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .topbar-avatar {
          width: 30px; height: 30px;
          border-radius: 50%;
          background: var(--accent-dim);
          border: 1px solid var(--border-accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          font-weight: 600;
          color: var(--accent-light);
        }
        .topbar-user-info {}
        .topbar-user-name {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.2;
        }
        .topbar-user-email {
          font-size: 10px;
          color: var(--text-muted);
        }
        @media (max-width: 600px) {
          .topbar { padding: 0 16px; }
          .topbar-clock { display: none; }
          .topbar-user-email { display: none; }
        }
      `}</style>

      <header className="topbar">
        <div className="topbar-left">
          <div className="topbar-title">{title}</div>
          <div className="topbar-desc">{desc}</div>
        </div>

        <div className="topbar-right">
          <div className="topbar-clock">
            <div className="topbar-time">{time}</div>
            <div className="topbar-date">{date}</div>
          </div>

          <div className="topbar-divider" />

          <div className="topbar-user">
            <div className="topbar-avatar">
              {userName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="topbar-user-info">
              <div className="topbar-user-name">{userName}</div>
              <div className="topbar-user-email">{email}</div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
