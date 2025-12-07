"use client"

interface BarChartComponentProps {
  data: any[]
}

export function BarChartComponent({ data }: BarChartComponentProps) {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-80 text-muted-foreground">No data available</div>
  }

  const maxValue = Math.max(...data.flatMap((d) => [d.intensity || 0, d.likelihood || 0, d.relevance || 0]))
  const scale = 280 / (maxValue || 100)
  const barWidth = 30
  const spacing = 80

  return (
    <div className="overflow-x-auto">
      <svg width={Math.max(data.length * spacing + 60, 400)} height={380} className="mx-auto">
        <defs>
          <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="barGradient3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="barGradient4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="barGradient5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity={1} />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        {/* Y-axis labels */}
        {[0, 25, 50, 75, 100].map((label) => (
          <g key={label}>
            <line
              x1="40"
              y1={280 - label * 2.8}
              x2="35"
              y2={280 - label * 2.8}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text x="25" y={285 - label * 2.8} fontSize="12" textAnchor="end" fill="#6b7280">
              {label}
            </text>
          </g>
        ))}

        {/* X-axis */}
        <line x1="40" y1="280" x2={data.length * spacing + 20} y2="280" stroke="#e5e7eb" strokeWidth="2" />

        {/* Bars */}
        {data.map((item, idx) => {
          const x = 40 + idx * spacing
          const intensity = (item.intensity || 0) * scale
          const likelihood = (item.likelihood || 0) * scale
          const yBase = 280
          const colorIndex = (idx % 5) + 1

          return (
            <g key={idx}>
              {/* Intensity bar */}
              <rect
                x={x - barWidth - 5}
                y={yBase - intensity}
                width={barWidth}
                height={intensity}
                fill={`url(#barGradient${colorIndex})`}
                rx="4"
              />
              {/* Likelihood bar */}
              <rect
                x={x + 5}
                y={yBase - likelihood}
                width={barWidth}
                height={likelihood}
                fill={`url(#barGradient${((colorIndex) % 5) + 1})`}
                rx="4"
              />
              {/* Label - rotated to prevent overlap */}
              <text
                x={x}
                y={295}
                fontSize="10"
                textAnchor="start"
                fill="#374151"
                transform={`rotate(45 ${x} 295)`}
              >
                {item.country || item.sector || `Item ${idx + 1}`}
              </text>
            </g>
          )
        })}

        {/* Legend */}
        <g>
          <rect x="50" y="10" width="15" height="15" fill="#8b5cf6" rx="2" />
          <text x="70" y="22" fontSize="12" fill="#374151">
            Intensity
          </text>
          <rect x="180" y="10" width="15" height="15" fill="#6366f1" rx="2" />
          <text x="200" y="22" fontSize="12" fill="#374151">
            Likelihood
          </text>
        </g>
      </svg>
    </div>
  )
}
