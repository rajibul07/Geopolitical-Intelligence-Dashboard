interface StatCardProps {
  title: string
  value: number | string
  subtitle?: string
  trend?: number
}

export function StatCard({ title, value, subtitle, trend }: StatCardProps) {
  const isPositive = trend && trend > 0

  return (
    <div className="glass-card glass-card-hover rounded-xl p-6 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {trend && (
          <div className={`text-sm font-bold px-2 py-1 rounded-full ${isPositive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
            {isPositive ? "+" : ""}
            {trend}%
          </div>
        )}
      </div>
    </div>
  )
}
