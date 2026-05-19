import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Already logged in — redirect away from auth pages
  const session = await getServerSession(authOptions);
  if (session) {
    if (session.user.role === "admin") {
      redirect("/dashboard/admin/employees");
    }
    redirect("/dashboard/employee/attendance");
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {children}
    </div>
  );
}
