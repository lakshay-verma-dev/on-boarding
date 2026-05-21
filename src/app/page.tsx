import Link from "next/link";

import {
    ArrowRight,
    CalendarDays,
    ClipboardList,
    FolderKanban,
    ShieldCheck,
    Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import HomeNavbar from "@/components/common/navbar/HomeNavbar";

export default function HomePage() {
    return (
        <>
            <HomeNavbar />
            <main className="relative overflow-hidden bg-background">

                {/* Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.15),transparent_40%)]" />

                {/* Hero */}
                <section className="relative px-6 py-24">

                    <div className="mx-auto max-w-7xl">

                        <div className="grid items-center gap-16 lg:grid-cols-2">

                            {/* Left */}
                            <div>

                                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                                    Modern HRM Platform
                                </div>

                                <h1 className="mt-8 text-5xl font-bold leading-tight text-foreground md:text-7xl">
                                    Manage Your
                                    <span className="block text-primary">
                                        Team Efficiently
                                    </span>
                                </h1>

                                <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
                                    Complete HRM solution for attendance,
                                    employee management, projects, tasks
                                    and team collaboration.
                                </p>

                                {/* Buttons */}
                                <div className="mt-10 flex flex-wrap gap-4">

                                    <Link href="/login">
                                        <Button className="h-12 px-8 text-base">
                                            Get Started

                                            <ArrowRight size={18} />
                                        </Button>
                                    </Link>

                                    <a href="#features">
                                        <Button
                                            variant="secondary"
                                            className="h-12 px-8 text-base"
                                        >
                                            Explore Features
                                        </Button>
                                    </a>
                                </div>

                                {/* Stats */}
                                <div id="about" className="mt-14 grid grid-cols-3 gap-6 scroll-mt-24">

                                    <div>
                                        <h3 className="text-4xl font-bold text-foreground">
                                            250+
                                        </h3>

                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Employees
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-4xl font-bold text-foreground">
                                            48+
                                        </h3>

                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Projects
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-4xl font-bold text-foreground">
                                            98%
                                        </h3>

                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Productivity
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right */}
                            <div id="features" className="grid gap-6 scroll-mt-24">

                                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <Users size={28} />
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-foreground">
                                                Employee Management
                                            </h3>

                                            <p className="mt-1 text-muted-foreground">
                                                Manage employees and teams.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <CalendarDays size={28} />
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-foreground">
                                                Attendance Tracking
                                            </h3>

                                            <p className="mt-1 text-muted-foreground">
                                                Clock in, leaves and reports.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <FolderKanban size={28} />
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-foreground">
                                                Project Management
                                            </h3>

                                            <p className="mt-1 text-muted-foreground">
                                                Assign projects and teams.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <ClipboardList size={28} />
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-foreground">
                                                Task Collaboration
                                            </h3>

                                            <p className="mt-1 text-muted-foreground">
                                                Assign and manage tasks.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Card */}
                        <div id="security" className="mt-24 rounded-[40px] border border-border bg-card p-10 text-center shadow-sm scroll-mt-24">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                                <ShieldCheck size={40} />
                            </div>

                            <h2 className="mt-8 text-4xl font-bold text-foreground">
                                Secure & Scalable HRM System
                            </h2>

                            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                                Built with modern technologies for
                                performance, scalability and secure
                                employee management.
                            </p>

                            <div className="mt-10">

                                <Link href="/login">
                                    <Button className="h-12 px-8 text-base">
                                        Login to Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}