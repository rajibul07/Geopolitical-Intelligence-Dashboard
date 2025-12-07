"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

interface TimeSeriesChartProps {
    data: any[]
}

export function TimeSeriesChart({ data }: TimeSeriesChartProps) {
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-80 text-muted-foreground">No data available</div>
    }

    return (
        <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <defs>
                        <linearGradient id="lineGradient1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="lineGradient2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="lineGradient3" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                        dataKey="year"
                        stroke="#6b7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                        }}
                        itemStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend />
                    <Area
                        type="monotone"
                        dataKey="intensity"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#8b5cf6" }}
                        activeDot={{ r: 6 }}
                        name="Intensity"
                        fill="url(#lineGradient1)"
                    />
                    <Area
                        type="monotone"
                        dataKey="likelihood"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#06b6d4" }}
                        name="Likelihood"
                        fill="url(#lineGradient2)"
                    />
                    <Area
                        type="monotone"
                        dataKey="relevance"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#10b981" }}
                        name="Relevance"
                        fill="url(#lineGradient3)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
