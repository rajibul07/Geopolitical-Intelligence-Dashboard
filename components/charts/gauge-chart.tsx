"use client"

interface GaugeChartProps {
  value: number
  max?: number
}

export function GaugeChart({ value, max = 100 }: GaugeChartProps) {
  const percentage = (value / max) * 100
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center h-64">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="100"
          cy="100"
          r="45"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "100px 100px",
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
        <text x="100" y="110" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#374151">
          {value}%
        </text>
      </svg>
      <p className="text-sm text-muted-foreground mt-4">Overall Score</p>
    </div>
  )
}
