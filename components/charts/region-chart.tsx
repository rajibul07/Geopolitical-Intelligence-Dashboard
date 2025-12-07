"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface RegionChartProps {
    data: any[]
}

const COLORS = [
    '#8b5cf6', // Purple
    '#6366f1', // Indigo
    '#06b6d4', // Cyan
    '#10b981', // Green
    '#f59e0b', // Amber
]

export function RegionChart({ data }: RegionChartProps) {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-80 text-muted-foreground">No data available</div>
    }

    return (
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="count"
                        nameKey="region"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                        }}
                    />
                    <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        wrapperStyle={{ fontSize: "12px" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
