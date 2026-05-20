import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string;
    change?: string;
    icon: LucideIcon;
    className?: string;
}

export default function StatsCard({
    title,
    value,
    change,
    icon: Icon,
    className,
}: StatsCardProps) {
    return (
        <div
            className={cn(
                "rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg",
                className
            )}
        >
            <div className="flex items-start justify-between">

                {/* Left */}
                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        {title}
                    </p>

                    <h3 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
                        {value}
                    </h3>

                    {change && (
                        <p className="mt-3 text-sm text-primary">
                            {change}
                        </p>
                    )}
                </div>

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={26} />
                </div>
            </div>
        </div>
    );
}