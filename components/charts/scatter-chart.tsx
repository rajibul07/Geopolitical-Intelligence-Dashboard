"use client"

interface ScatterChartComponentProps {
  data: any[]
}

export function ScatterChartComponent({ data }: ScatterChartComponentProps) {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-80 text-muted-foreground">No data available</div>
  }

  const padding = 40
  const width = 400
  const height = 320
  const plotWidth = width - 2 * padding
  const plotHeight = height - 2 * padding

  const scaleX = plotWidth / 100
  const scaleY = plotHeight / 100

  return (
    <svg width={width} height={height} className="w-full">
      {/* Background */}
      <rect
        x={padding}
        y={padding}
        width={plotWidth}
        height={plotHeight}
        fill="#ffffff"
        stroke="#e5e7eb"
        strokeWidth="1"
      />

      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map((val) => (
        <g key={val}>
          <line
            x1={padding}
            y1={padding + (100 - val) * scaleY}
            x2={width - padding}
            y2={padding + (100 - val) * scaleY}
            stroke="#e5e7eb"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
          <line
            x1={padding + val * scaleX}
            y1={padding}
            x2={padding + val * scaleX}
            y2={height - padding}
            stroke="#e5e7eb"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
        </g>
      ))}

      {/* Axes */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="hsl(var(--border))"
        strokeWidth="2"
      />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#e5e7eb" strokeWidth="2" />

      {/* Axis labels */}
      <text x={width / 2} y={height - 10} fontSize="12" textAnchor="middle" fill="#6b7280">
        Intensity
      </text>
      <text
        x="15"
        y={height / 2}
        fontSize="12"
        textAnchor="middle"
        fill="#6b7280"
        transform={`rotate(-90 15 ${height / 2})`}
      >
        Likelihood
      </text>

      {/* Data points */}
      {data.map((point, idx) => {
        const x = padding + (point.intensity || 0) * scaleX
        const y = height - padding - (point.likelihood || 0) * scaleY
        return (
          <circle
            key={idx}
            cx={x}
            cy={y}
            r="5"
            fill="#8b5cf6"
            opacity="0.7"
            style={{ cursor: "pointer" }}
          />
        )
      })}

      {/* Y-axis scale labels */}
      {[0, 25, 50, 75, 100].map((val) => (
        <text
          key={`y-${val}`}
          x={padding - 10}
          y={height - padding - val * scaleY + 4}
          fontSize="10"
          textAnchor="end"
          fill="#6b7280"
        >
          {val}
        </text>
      ))}

      {/* X-axis scale labels */}
      {[0, 25, 50, 75, 100].map((val) => (
        <text
          key={`x-${val}`}
          x={padding + val * scaleX}
          y={height - padding + 20}
          fontSize="10"
          textAnchor="middle"
          fill="#6b7280"
        >
          {val}
        </text>
      ))}
    </svg>
  )
}
