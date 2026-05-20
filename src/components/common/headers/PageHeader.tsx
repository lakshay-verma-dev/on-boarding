import { ReactNode } from "react";
import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function PageHeader({
    title,
    description,
    action,
    breadcrumbs,
}: PageHeaderProps) {
    return (
        <div className="mb-8">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Link
                        href="/admin/dashboard"
                        className="transition-colors hover:text-primary"
                    >
                        Dashboard
                    </Link>
                    <span className="text-muted-foreground/40 text-[10px] select-none">/</span>
                    {breadcrumbs.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="transition-colors hover:text-primary"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-foreground font-semibold">
                                    {item.label}
                                </span>
                            )}
                            {index < breadcrumbs.length - 1 && (
                                <span className="text-muted-foreground/40 text-[10px] select-none">/</span>
                            )}
                        </div>
                    ))}
                </nav>
            )}

            {/* Header Content */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Left */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {title}
                    </h1>

                    {description && (
                        <p className="mt-2 text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>

                {/* Right */}
                {action && (
                    <div>
                        {action}
                    </div>
                )}
            </div>
        </div>
    );
}