import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <style>{`
        .dashboard-root {
          display: flex;
          min-height: 100vh;
          background: var(--bg-base);
        }
        .dashboard-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          margin-left: 240px;
        }
        .dashboard-content {
          flex: 1;
          padding: 28px 32px;
          animation: fadeUp 0.4s ease both;
        }
        @media (max-width: 900px) {
          .dashboard-main { margin-left: 0; }
          .dashboard-content { padding: 20px 16px; }
        }
      `}</style>

      <div className="dashboard-root">
        <Sidebar role={session.user.role} userName={session.user.name ?? ""} />

        <div className="dashboard-main">
          <TopBar
            userName={session.user.name ?? ""}
            role={session.user.role}
            email={session.user.email ?? ""}
          />
          <main className="dashboard-content">{children}</main>
        </div>
      </div>
    </>
  );
}
