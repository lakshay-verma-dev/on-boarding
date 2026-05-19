"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

type AttendanceType = "present" | "leave" | "half-day" | "short-leave" | "wfh";

const LEAVE_TYPES = [
  { key: "leave",       label: "Full Leave",   icon: "🗓", color: "var(--warning)" },
  { key: "half-day",    label: "Half Day",     icon: "🌗", color: "var(--info)" },
  { key: "short-leave", label: "Short Leave",  icon: "⏱", color: "var(--accent-light)" },
  { key: "wfh",         label: "Work From Home", icon: "🏠", color: "var(--success)" },
] as const;

export default function EmployeeAttendancePage() {
  const { data: session } = useSession();
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState("00:00:00");
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState<AttendanceType>("present");
  const [now, setNow] = useState(new Date());

  // Live clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Elapsed timer
  useEffect(() => {
    if (!clockedIn || !clockInTime) return;
    const id = setInterval(() => {
      const diff = Date.now() - clockInTime.getTime();
      const h = Math.floor(diff / 3600000).toString().padStart(2, "0");
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0");
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, "0");
      setElapsed(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(id);
  }, [clockedIn, clockInTime]);

  async function handleClockIn() {
    setLoading(true);
    await fetch("/api/attendance/clock-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: activeType }),
    });
    const t = new Date();
    setClockedIn(true);
    setClockInTime(t);
    setLoading(false);
  }

  async function handleClockOut() {
    setLoading(true);
    await fetch("/api/attendance/clock-out", { method: "POST" });
    setClockedIn(false);
    setClockInTime(null);
    setElapsed("00:00:00");
    setLoading(false);
  }

  return (
    <>
      <style>{`
        .att-grid {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .att-grid { grid-template-columns: 1fr; }
        }

        /* Clock card */
        .clock-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          animation: fadeUp 0.4s ease both;
          position: relative;
          overflow: hidden;
        }
        .clock-card::before {
          content: '';
          position: absolute;
          top: -80px; left: -80px;
          width: 280px; height: 280px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Analog-ish digital clock */
        .big-clock {
          font-family: var(--font-mono);
          font-size: 48px;
          font-weight: 400;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .big-clock-date {
          font-size: 13px;
          color: var(--text-secondary);
          text-align: center;
        }

        /* Status ring */
        .status-ring {
          width: 80px; height: 80px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 28px;
          transition: all 0.3s;
          position: relative;
        }
        .status-ring.out {
          background: var(--bg-raised);
          border: 2px solid var(--border);
        }
        .status-ring.in {
          background: var(--success-dim);
          border: 2px solid rgba(16,185,129,0.4);
          animation: pulse-glow 2.5s ease-in-out infinite;
          --accent-glow: rgba(16,185,129,0.3);
        }

        .elapsed {
          font-family: var(--font-mono);
          font-size: 22px;
          color: var(--success);
          letter-spacing: 0.05em;
        }
        .elapsed-label {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: -18px;
        }

        /* Type selector */
        .type-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          align-self: flex-start;
          width: 100%;
        }
        .type-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          width: 100%;
        }
        .type-chip {
          padding: 6px 12px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          background: var(--bg-raised);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          transition: all 0.15s;
          display: flex; align-items: center; gap: 5px;
        }
        .type-chip:hover { border-color: var(--accent); color: var(--text-primary); }
        .type-chip.active {
          background: var(--accent-dim);
          border-color: var(--border-accent);
          color: var(--accent-light);
        }

        /* Clock button */
        .clock-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: var(--radius-lg);
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .clock-btn.in-btn {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 4px 20px var(--accent-glow);
        }
        .clock-btn.in-btn:hover { background: #4f52d9; transform: translateY(-1px); }
        .clock-btn.out-btn {
          background: var(--danger-dim);
          color: #fca5a5;
          border: 1px solid rgba(239,68,68,0.3);
        }
        .clock-btn.out-btn:hover { background: rgba(239,68,68,0.2); }
        .clock-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Right side — history */
        .history-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          animation: fadeUp 0.4s ease 0.1s both;
          overflow: hidden;
        }
        .history-header {
          padding: 20px 24px 16px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .history-header h3 {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .history-header span {
          font-size: 12px;
          color: var(--text-muted);
        }
        .history-empty {
          padding: 48px 24px;
          text-align: center;
          color: var(--text-muted);
          font-size: 13px;
        }
        .history-empty-icon { font-size: 28px; margin-bottom: 8px; }

        /* Leave type stats */
        .leave-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border);
        }
        .leave-stat {
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px;
        }
        .leave-stat-top {
          display: flex; align-items: center; gap: 6px;
          margin-bottom: 6px;
        }
        .leave-stat-icon { font-size: 14px; }
        .leave-stat-label { font-size: 11px; color: var(--text-muted); font-weight: 500; }
        .leave-stat-value { font-size: 24px; font-weight: 300; color: var(--text-primary); }
      `}</style>

      <div className="att-grid">
        {/* Clock in/out card */}
        <div className="clock-card">
          <div className="big-clock">
            {now.toLocaleTimeString("en-US", {
              hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
            })}
          </div>
          <div className="big-clock-date">
            {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </div>

          <div className={`status-ring ${clockedIn ? "in" : "out"}`}>
            {clockedIn ? "🟢" : "⚫"}
          </div>

          {clockedIn && (
            <>
              <div className="elapsed">{elapsed}</div>
              <div className="elapsed-label">Time elapsed</div>
            </>
          )}

          {!clockedIn && (
            <>
              <div className="type-label">Attendance type</div>
              <div className="type-chips">
                <div
                  className={`type-chip ${activeType === "present" ? "active" : ""}`}
                  onClick={() => setActiveType("present")}
                >
                  🏢 Office
                </div>
                {LEAVE_TYPES.map((t) => (
                  <div
                    key={t.key}
                    className={`type-chip ${activeType === t.key ? "active" : ""}`}
                    onClick={() => setActiveType(t.key as AttendanceType)}
                  >
                    {t.icon} {t.label}
                  </div>
                ))}
              </div>
            </>
          )}

          {clockedIn ? (
            <button
              className="clock-btn out-btn"
              onClick={handleClockOut}
              disabled={loading}
            >
              ⏹ Clock Out
            </button>
          ) : (
            <button
              className="clock-btn in-btn"
              onClick={handleClockIn}
              disabled={loading}
            >
              ▶ Clock In
            </button>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Leave type summary */}
          <div className="history-card">
            <div className="history-header">
              <h3>This month</h3>
              <span>
                {now.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
            </div>
            <div className="leave-stats">
              {[
                { icon: "✅", label: "Present", value: 0 },
                { icon: "🗓", label: "Full Leave", value: 0 },
                { icon: "🌗", label: "Half Day", value: 0 },
                { icon: "🏠", label: "WFH", value: 0 },
              ].map((s) => (
                <div className="leave-stat" key={s.label}>
                  <div className="leave-stat-top">
                    <span className="leave-stat-icon">{s.icon}</span>
                    <span className="leave-stat-label">{s.label}</span>
                  </div>
                  <div className="leave-stat-value">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent records */}
          <div className="history-card">
            <div className="history-header">
              <h3>Attendance history</h3>
              <span>Last 30 days</span>
            </div>
            <div className="history-empty">
              <div className="history-empty-icon">📅</div>
              No attendance records yet. Clock in to get started.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
