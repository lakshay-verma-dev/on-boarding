import { redirect } from "next/navigation";

export default function DashboardPage() {

    /*
      Later:
      Check logged in user role here
      and redirect dynamically
    */

    redirect("/admin/dashboard");
}