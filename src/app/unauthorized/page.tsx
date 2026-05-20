"use client";

import Link from "next/link";

import { ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6">

            <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-10 text-center shadow-sm">

                {/* Icon */}
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-red-500/10 text-red-500">
                    <ShieldAlert size={50} />
                </div>

                {/* Content */}
                <h1 className="mt-8 text-5xl font-bold text-foreground">
                    Access Denied
                </h1>

                <p className="mt-5 leading-8 text-muted-foreground">
                    You do not have permission to access
                    this page. Please contact your
                    administrator if you believe this is a
                    mistake.
                </p>

                {/* Actions */}
                <div className="mt-10 flex flex-wrap justify-center gap-4">

                    <Link href="/">
                        <Button variant="secondary">
                            Go Home
                        </Button>
                    </Link>

                    <Link href="/login">
                        <Button>
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}