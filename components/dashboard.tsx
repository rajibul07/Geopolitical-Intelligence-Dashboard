"use client"

import { useMemo } from "react"
import { StatCard } from "./stat-card"
import { BarChartComponent } from "./charts/bar-chart"
import { GaugeChart } from "./charts/gauge-chart"
import { ScatterChartComponent } from "./charts/scatter-chart"
import { TimeSeriesChart } from "./charts/time-series-chart"
import { TopicsChart } from "./charts/topics-chart"
import { RegionChart } from "./charts/region-chart"
import type { VisualizationItem } from "@/hooks/use-visualization-data"

interface DashboardProps {
  data: VisualizationItem[]
  loading?: boolean
}

export function Dashboard({ data, loading = false }: DashboardProps) {
  const stats = useMemo(() => {
    if (data.length === 0) {
      return {
        avgIntensity: 0,
        avgLikelihood: 0,
        avgRelevance: 0,
        totalRecords: 0,
      }
    }

    return {
      avgIntensity: Math.round(data.reduce((sum, d) => sum + d.intensity, 0) / data.length),
      avgLikelihood: Math.round(data.reduce((sum, d) => sum + d.likelihood, 0) / data.length),
      avgRelevance: Math.round(data.reduce((sum, d) => sum + d.relevance, 0) / data.length),
      totalRecords: data.length,
    }
  }, [data])

  const chartData = useMemo(() => {
    const byCountry = data.reduce((acc: any, item) => {
      const country = item.country || "Unknown"
      const existing = acc.find((d: any) => d.country === country)
      if (existing) {
        existing.intensity += item.intensity
        existing.likelihood += item.likelihood
        existing.relevance += item.relevance
        existing.count += 1
      } else {
        acc.push({
          country,
          intensity: item.intensity,
          likelihood: item.likelihood,
          relevance: item.relevance,
          count: 1,
        })
      }
      return acc
    }, [])

    return byCountry.map((item: any) => ({
      country: item.country,
      intensity: Math.round(item.intensity / item.count),
      likelihood: Math.round(item.likelihood / item.count),
      relevance: Math.round(item.relevance / item.count),
    }))
  }, [data])

  const sectorData = useMemo(() => {
    const bySector = data.reduce((acc: any, item) => {
      const sector = item.sector || "Other"
      const existing = acc.find((d: any) => d.sector === sector)
      if (existing) {
        existing.intensity += item.intensity
        existing.likelihood += item.likelihood
        existing.count += 1
      } else {
        acc.push({
          sector,
          intensity: item.intensity,
          likelihood: item.likelihood,
          count: 1,
        })
      }
      return acc
    }, [])

    return bySector
      .map((item: any) => ({
        sector: item.sector,
        intensity: Math.round(item.intensity / item.count),
        likelihood: Math.round(item.likelihood / item.count),
      }))
      .sort((a: any, b: any) => b.intensity - a.intensity)
      .slice(0, 10)
  }, [data])

  const timeSeriesData = useMemo(() => {
    const byYear = data.reduce((acc: any, item) => {
      const year = item.start_year || item.end_year || "Unknown"
      if (year === "Unknown") return acc

      const existing = acc.find((d: any) => d.year === year)
      if (existing) {
        existing.intensity += item.intensity
        existing.likelihood += item.likelihood
        existing.relevance += item.relevance
        existing.count += 1
      } else {
        acc.push({
          year,
          intensity: item.intensity,
          likelihood: item.likelihood,
          relevance: item.relevance,
          count: 1,
        })
      }
      return acc
    }, [])

    return byYear
      .map((item: any) => ({
        year: item.year,
        intensity: Math.round(item.intensity / item.count),
        likelihood: Math.round(item.likelihood / item.count),
        relevance: Math.round(item.relevance / item.count),
      }))
      .sort((a: any, b: any) => Number(a.year) - Number(b.year))
  }, [data])

  const topicsData = useMemo(() => {
    const byTopic = data.reduce((acc: any, item) => {
      const topic = item.topic || "Other"
      const existing = acc.find((d: any) => d.topic === topic)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ topic, count: 1 })
      }
      return acc
    }, [])
    return byTopic
  }, [data])

  const regionData = useMemo(() => {
    const byRegion = data.reduce((acc: any, item) => {
      const region = item.region || "Unknown"
      const existing = acc.find((d: any) => d.region === region)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ region, count: 1 })
      }
      return acc
    }, [])
    return byRegion
  }, [data])

  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto bg-background p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground mt-4">Loading dashboard data...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto bg-background p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Geopolitical Intelligence Dashboard</h1>
        <p className="text-muted-foreground">
          Analyze global trends, risks, and opportunities across sectors and regions
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Avg Intensity" value={stats.avgIntensity} subtitle="Impact level" trend={8.2} />
        <StatCard title="Avg Likelihood" value={stats.avgLikelihood} subtitle="Probability" trend={5.1} />
        <StatCard title="Avg Relevance" value={stats.avgRelevance} subtitle="Importance" trend={12.3} />
        <StatCard title="Total Records" value={stats.totalRecords} subtitle="Events tracked" trend={3.2} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">By Country</h2>
          <BarChartComponent data={chartData} />
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Intensity Trend</h2>
          <GaugeChart value={stats.avgIntensity} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">By Sector</h2>
          <BarChartComponent data={sectorData} />
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Correlation Analysis</h2>
          <ScatterChartComponent data={data} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Trends Over Time</h2>
          <TimeSeriesChart data={timeSeriesData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Top Topics</h2>
          <TopicsChart data={topicsData} />
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Regional Distribution</h2>
          <RegionChart data={regionData} />
        </div>
      </div>
    </main>
  )
}
