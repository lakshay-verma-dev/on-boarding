import { ReactNode } from "react";

interface Column {
    key: string;
    title: string;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    actions?: (row: any) => ReactNode;
}

export default function DataTable({
    columns,
    data,
    actions,
}: DataTableProps) {
    return (
        <div className="overflow-hidden rounded-3xl border border-border bg-card">

            <div className="overflow-x-auto">
                <table className="w-full">

                    {/* Head */}
                    <thead className="border-b border-border bg-muted/40">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-6 py-4 text-left text-sm font-semibold text-foreground"
                                >
                                    {column.title}
                                </th>
                            ))}

                            {actions && (
                                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className="border-b border-border transition-all hover:bg-muted/30"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="px-6 py-5 text-sm text-muted-foreground"
                                    >
                                        {row[column.key]}
                                    </td>
                                ))}

                                {actions && (
                                    <td className="px-6 py-5 text-right">
                                        {actions(row)}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty State */}
            {data.length === 0 && (
                <div className="flex h-40 items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                        No data found.
                    </p>
                </div>
            )}
        </div>
    );
}