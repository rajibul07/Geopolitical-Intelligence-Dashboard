"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"

interface Stats {
    avgIntensity: number
    avgLikelihood: number
    avgRelevance: number
    totalRecords: number
}

interface CountryData {
    _id: string
    avgIntensity: number
    avgLikelihood: number
    count: number
}

export default function ReportsPage() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [topCountries, setTopCountries] = useState<CountryData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchReportData() {
            try {
                const statsRes = await fetch("http://localhost:5000/api/stats")
                const statsData = await statsRes.json()
                setStats(statsData)

                const countriesRes = await fetch("http://localhost:5000/api/by-country")
                const countriesData = await countriesRes.json()
                setTopCountries(countriesData.slice(0, 10))
            } catch (error) {
                console.error("Error fetching report data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchReportData()
    }, [])

    if (loading) {
        return (
            <div className="flex h-screen bg-background">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-lg">Loading report...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-background">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <div className="p-8 max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2">Executive Summary Report</h1>
                        <p className="text-muted-foreground">
                            Comprehensive overview of global geopolitical intelligence data
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="glass-card glass-card-hover p-6 rounded-xl">
                            <div className="text-sm font-medium text-muted-foreground mb-2">Total Records</div>
                            <div className="text-3xl font-bold">{stats?.totalRecords.toLocaleString() || 0}</div>
                        </div>

                        <div className="glass-card glass-card-hover p-6 rounded-xl">
                            <div className="text-sm font-medium text-muted-foreground mb-2">Avg Intensity</div>
                            <div className="text-3xl font-bold">{stats?.avgIntensity.toFixed(1) || 0}</div>
                            <div className="text-sm text-green-600 mt-1">out of 100</div>
                        </div>

                        <div className="glass-card glass-card-hover p-6 rounded-xl">
                            <div className="text-sm font-medium text-muted-foreground mb-2">Avg Likelihood</div>
                            <div className="text-3xl font-bold">{stats?.avgLikelihood.toFixed(1) || 0}</div>
                            <div className="text-sm text-green-600 mt-1">out of 100</div>
                        </div>

                        <div className="glass-card glass-card-hover p-6 rounded-xl">
                            <div className="text-sm font-medium text-muted-foreground mb-2">Avg Relevance</div>
                            <div className="text-3xl font-bold">{stats?.avgRelevance.toFixed(1) || 0}</div>
                            <div className="text-sm text-green-600 mt-1">out of 100</div>
                        </div>
                    </div>

                    <div className="glass-card rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-6">Top 10 Countries by Intensity</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-3 px-4 font-semibold">Rank</th>
                                        <th className="text-left py-3 px-4 font-semibold">Country</th>
                                        <th className="text-right py-3 px-4 font-semibold">Avg Intensity</th>
                                        <th className="text-right py-3 px-4 font-semibold">Avg Likelihood</th>
                                        <th className="text-right py-3 px-4 font-semibold">Records</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topCountries.map((country, index) => (
                                        <tr key={country._id} className="border-b border-border hover:bg-accent/50 transition-colors">
                                            <td className="py-3 px-4">
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                                                    {index + 1}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 font-medium">{country._id || "Unknown"}</td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <div className="h-2 bg-gray-200 rounded-full w-24">
                                                        <div
                                                            className="h-2 bg-purple-500 rounded-full"
                                                            style={{ width: `${country.avgIntensity}%` }}
                                                        />
                                                    </div>
                                                    <span className="font-semibold w-12">{country.avgIntensity.toFixed(1)}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-right font-semibold">{country.avgLikelihood.toFixed(1)}</td>
                                            <td className="py-3 px-4 text-right font-semibold">{country.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="glass-card rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-4">Key Insights</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">📊</span>
                                <div>
                                    <h3 className="font-semibold mb-1">Data Coverage</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Analysis based on {stats?.totalRecords} geopolitical intelligence records from multiple sources.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🌍</span>
                                <div>
                                    <h3 className="font-semibold mb-1">Global Distribution</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Top performing country: {topCountries[0]?._id || "N/A"} with an average intensity of {topCountries[0]?.avgIntensity.toFixed(1) || "0"}.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-2xl">📈</span>
                                <div>
                                    <h3 className="font-semibold mb-1">Data Quality</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Average relevance score of {stats?.avgRelevance.toFixed(1)} indicates high-quality, reliable intelligence data.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
