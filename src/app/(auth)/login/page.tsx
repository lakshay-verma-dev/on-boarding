"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    // Fetch session to get role for redirect
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();

    if (session?.user?.role === "admin") {
      router.push("/dashboard/admin/employees");
    } else {
      router.push("/dashboard/employee/attendance");
    }
  }

  return (
    <>
      <style>{`
        .login-root {
          min-height: 100vh;
          display: flex;
          background: var(--bg-base);
          position: relative;
          overflow: hidden;
        }

        /* Geometric grid background */
        .login-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        }

        /* Glow orbs */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .glow-orb-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          top: -120px; left: -80px;
        }
        .glow-orb-2 {
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%);
          bottom: -60px; right: 20%;
        }

        /* Split layout */
        .login-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          position: relative;
          z-index: 1;
        }
        .login-right {
          width: 460px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 56px;
          position: relative;
          z-index: 1;
          border-left: 1px solid var(--border);
          background: rgba(18,20,26,0.6);
          backdrop-filter: blur(24px);
        }

        /* Brand mark */
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .brand-icon {
          width: 36px; height: 36px;
          background: var(--accent);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          box-shadow: 0 0 20px var(--accent-glow);
        }
        .brand-name {
          font-size: 17px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        /* Hero text */
        .hero-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 0;
          max-width: 520px;
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--accent-dim);
          border: 1px solid var(--border-accent);
          color: var(--accent-light);
          font-size: 12px;
          font-weight: 500;
          padding: 4px 12px;
          border-radius: 99px;
          margin-bottom: 24px;
          width: fit-content;
          animation: fadeUp 0.5s ease both;
        }
        .hero-tag::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent-light);
        }
        .hero-title {
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 300;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 20px;
          animation: fadeUp 0.5s ease 0.1s both;
        }
        .hero-title strong {
          font-weight: 600;
          color: var(--accent-light);
        }
        .hero-desc {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 400px;
          animation: fadeUp 0.5s ease 0.2s both;
        }

        /* Stat chips */
        .stat-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          animation: fadeUp 0.5s ease 0.3s both;
        }
        .stat-chip {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px 20px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 100px;
        }
        .stat-chip-value {
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }
        .stat-chip-label {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* Form card */
        .form-card {
          width: 100%;
          animation: fadeUp 0.6s ease 0.1s both;
        }
        .form-heading {
          margin-bottom: 32px;
        }
        .form-heading h2 {
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .form-heading p {
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Fields */
        .field {
          margin-bottom: 18px;
        }
        .field label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 8px;
        }
        .input-wrap {
          position: relative;
        }
        .input-wrap input {
          width: 100%;
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--text-primary);
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .input-wrap input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-dim);
        }
        .input-wrap input::placeholder {
          color: var(--text-muted);
        }
        .pass-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          font-size: 16px;
          line-height: 1;
          transition: color 0.2s;
        }
        .pass-toggle:hover { color: var(--text-secondary); }

        /* Error */
        .error-box {
          background: var(--danger-dim);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          font-size: 13px;
          color: #fca5a5;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: fadeIn 0.3s ease;
        }

        /* Submit button */
        .btn-login {
          width: 100%;
          padding: 13px;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: var(--radius-md);
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 2px 12px var(--accent-glow);
          margin-top: 4px;
        }
        .btn-login:hover:not(:disabled) {
          background: #4f52d9;
          box-shadow: 0 4px 20px var(--accent-glow);
          transform: translateY(-1px);
        }
        .btn-login:active:not(:disabled) {
          transform: translateY(0);
        }
        .btn-login:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Spinner */
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* Footer note */
        .form-footer {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
          font-size: 12px;
          color: var(--text-muted);
          text-align: center;
          line-height: 1.6;
        }
        .form-footer span {
          color: var(--text-secondary);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .login-left  { display: none; }
          .login-right { width: 100%; border-left: none; padding: 40px 24px; }
        }
      `}</style>

      <div className="login-root">
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />

        {/* Left — branding panel */}
        <div className="login-left">
          <div className="brand">
            <div className="brand-icon">⬡</div>
            <span className="brand-name">WorkSpace HRM</span>
          </div>

          <div className="hero-block">
            <div className="hero-tag">Human Resource Management</div>
            <h1 className="hero-title">
              Your team,<br />
              <strong>organized.</strong>
            </h1>
            <p className="hero-desc">
              Track attendance, manage projects, and assign tasks — all in one
              place. Built for modern teams that move fast.
            </p>
          </div>

          <div className="stat-row">
            <div className="stat-chip">
              <span className="stat-chip-value">6</span>
              <span className="stat-chip-label">Attendance types</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip-value">Role</span>
              <span className="stat-chip-label">Based access</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip-value">Live</span>
              <span className="stat-chip-label">Clock tracking</span>
            </div>
          </div>
        </div>

        {/* Right — login form */}
        <div className="login-right">
          <div className="form-card">
            <div className="form-heading">
              <h2>Sign in</h2>
              <p>Enter your credentials to access your portal.</p>
            </div>

            <form onSubmit={handleLogin} noValidate>
              <div className="field">
                <label htmlFor="email">Email address</label>
                <div className="input-wrap">
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    style={{ paddingRight: "44px" }}
                  />
                  <button
                    type="button"
                    className="pass-toggle"
                    onClick={() => setShowPass((p) => !p)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="error-box" role="alert">
                  <span>⚠</span> {error}
                </div>
              )}

              <button type="submit" className="btn-login" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner" />
                    Signing in…
                  </>
                ) : (
                  "Sign in to WorkSpace"
                )}
              </button>
            </form>

            <div className="form-footer">
              Account access is managed by your admin.<br />
              Contact <span>hr@yourcompany.com</span> if you need help.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
