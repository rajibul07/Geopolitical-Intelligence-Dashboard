"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"

interface SectorData {
    sector: string
    count: number
    avgIntensity: number
    avgLikelihood: number
    avgRelevance: number
}

const COLORS = ['#8b5cf6', '#6366f1', '#06b6d4', '#10b981', '#f59e0b']

export default function SectorAnalysisPage() {
    const [sectorData, setSectorData] = useState<SectorData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchSectorData() {
            try {
                const res = await fetch("http://localhost:5000/api/data")
                const data = await res.json()

                // Aggregate by sector client-side
                const sectorMap = new Map<string, SectorData>()

                data.forEach((item: any) => {
                    const sector = item.sector || "Unknown"
                    if (!sectorMap.has(sector)) {
                        sectorMap.set(sector, {
                            sector,
                            count: 0,
                            avgIntensity: 0,
                            avgLikelihood: 0,
                            avgRelevance: 0
                        })
                    }

                    const current = sectorMap.get(sector)!
                    current.count++
                    current.avgIntensity += item.intensity || 0
                    current.avgLikelihood += item.likelihood || 0
                    current.avgRelevance += item.relevance || 0
                })

                // Calculate averages and sort
                const sectors = Array.from(sectorMap.values())
                    .map(s => ({
                        ...s,
                        avgIntensity: s.avgIntensity / s.count,
                        avgLikelihood: s.avgLikelihood / s.count,
                        avgRelevance: s.avgRelevance / s.count
                    }))
                    .filter(s => s.sector !== "Unknown" && s.sector !== "")
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 15)

                setSectorData(sectors)
            } catch (error) {
                console.error("Error fetching sector data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchSectorData()
    }, [])

    if (loading) {
        return (
            <div className="flex h-screen bg-background">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-lg">Loading sector analysis...</div>
                </div>
            </div>
        )
    }

    const maxCount = Math.max(...sectorData.map(s => s.count))

    return (
        <div className="flex h-screen bg-background">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <div className="p-8 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2">Sector Analysis Report</h1>
                        <p className="text-muted-foreground">
                            Detailed breakdown of geopolitical intelligence by industry sector
                        </p>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="glass-card glass-card-hover p-6 rounded-xl">
                            <div className="text-sm font-medium text-muted-foreground mb-2">Total Sectors</div>
                            <div className="text-3xl font-bold">{sectorData.length}</div>
                            <div className="text-sm text-muted-foreground mt-1">Analyzed</div>
                        </div>

                        <div className="glass-card glass-card-hover p-6 rounded-xl">
                            <div className="text-sm font-medium text-muted-foreground mb-2">Top Sector</div>
                            <div className="text-2xl font-bold">{sectorData[0]?.sector}</div>
                            <div className="text-sm text-green-600 mt-1">{sectorData[0]?.count} records</div>
                        </div>

                        <div className="glass-card glass-card-hover p-6 rounded-xl">
                            <div className="text-sm font-medium text-muted-foreground mb-2">Highest Intensity</div>
                            <div className="text-2xl font-bold">
                                {[...sectorData].sort((a, b) => b.avgIntensity - a.avgIntensity)[0]?.sector}
                            </div>
                            <div className="text-sm text-green-600 mt-1">
                                {[...sectorData].sort((a, b) => b.avgIntensity - a.avgIntensity)[0]?.avgIntensity.toFixed(1)} avg
                            </div>
                        </div>
                    </div>

                    {/* Sector Breakdown Table */}
                    <div className="glass-card rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-6">Top 15 Sectors</h2>
                        <div className="space-y-4">
                            {sectorData.map((sector, index) => (
                                <div key={sector.sector} className="border-b border-border pb-4 last:border-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm"
                                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                            >
                                                {index + 1}
                                            </span>
                                            <h3 className="font-bold text-lg">{sector.sector}</h3>
                                        </div>
                                        <span className="text-sm font-semibold px-3 py-1 bg-accent rounded-full">
                                            {sector.count} records
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mb-3">
                                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-3 rounded-full transition-all"
                                                style={{
                                                    width: `${(sector.count / maxCount) * 100}%`,
                                                    backgroundColor: COLORS[index % COLORS.length]
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Metrics Grid */}
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <div className="text-muted-foreground mb-1">Intensity</div>
                                            <div className="font-semibold text-lg">{sector.avgIntensity.toFixed(1)}</div>
                                        </div>
                                        <div>
                                            <div className="text-muted-foreground mb-1">Likelihood</div>
                                            <div className="font-semibold text-lg">{sector.avgLikelihood.toFixed(1)}</div>
                                        </div>
                                        <div>
                                            <div className="text-muted-foreground mb-1">Relevance</div>
                                            <div className="font-semibold text-lg">{sector.avgRelevance.toFixed(1)}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Analysis Insights */}
                    <div className="glass-card rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4">Sector Insights</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <span>🏆</span> Most Active Sector
                                </h3>
                                <p className="text-sm">
                                    <strong>{sectorData[0]?.sector}</strong> leads with {sectorData[0]?.count} intelligence records.
                                </p>
                            </div>

                            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <span>📊</span> Distribution
                                </h3>
                                <p className="text-sm">
                                    Top 3 sectors account for a significant portion of all geopolitical intelligence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
