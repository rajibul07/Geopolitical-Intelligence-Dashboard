"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Cell } from "recharts"

interface TopicsChartProps {
    data: any[]
}

const COLORS = [
    '#8b5cf6', // Purple
    '#6366f1', // Indigo
    '#06b6d4', // Cyan
    '#10b981', // Green
    '#f59e0b', // Amber
]

export function TopicsChart({ data }: TopicsChartProps) {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-80 text-muted-foreground">No data available</div>
    }

    // Sort by count and take top 20
    const sortedData = [...data].sort((a, b) => b.count - a.count).slice(0, 20)

    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="topic"
                        type="category"
                        width={100}
                        stroke="#6b7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                        contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                        }}
                    />
                    <Bar dataKey="count" name="Occurrences" radius={[0, 4, 4, 0]}>
                        {sortedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
