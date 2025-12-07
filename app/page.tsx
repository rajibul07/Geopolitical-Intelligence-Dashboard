"use client"

import { useState, useEffect, useMemo } from "react"
import { Dashboard } from "@/components/dashboard"
import { Filters } from "@/components/filters"
import { Sidebar } from "@/components/sidebar"
import { fetchData, fetchHealth } from "@/lib/api-client"
import type { VisualizationItem } from "@/hooks/use-visualization-data"

const MOCK_DATA: VisualizationItem[] = [
  {
    _id: "1",
    intensity: 85,
    likelihood: 72,
    relevance: 88,
    country: "United States",
    region: "Northern America",
    topic: "technology",
    sector: "Information Technology",
    pestle: "Technology",
    start_year: "2023",
    end_year: "2025",
    insight: "AI advancement",
    source: "News",
    swot: "Strength",
    city: "San Francisco",
    title: "AI Innovation Report",
    url: "http://example.com",
    published: "2023-01-01",
    added: "2023-01-01",
    impact: "",
  },
  {
    _id: "2",
    intensity: 76,
    likelihood: 68,
    relevance: 82,
    country: "China",
    region: "Eastern Asia",
    topic: "trade",
    sector: "Manufacturing",
    pestle: "Political",
    start_year: "2023",
    end_year: "2024",
    insight: "Trade tensions",
    source: "Report",
    swot: "Threat",
    city: "Beijing",
    title: "Trade Analysis",
    url: "http://example.com",
    published: "2023-01-02",
    added: "2023-01-02",
    impact: "",
  },
  {
    _id: "3",
    intensity: 92,
    likelihood: 85,
    relevance: 90,
    country: "Germany",
    region: "Europe",
    topic: "energy",
    sector: "Energy",
    pestle: "Environmental",
    start_year: "2023",
    end_year: "2025",
    insight: "Energy transition",
    source: "News",
    swot: "Opportunity",
    city: "Berlin",
    title: "Energy Report",
    url: "http://example.com",
    published: "2023-01-03",
    added: "2023-01-03",
    impact: "",
  },
  {
    _id: "4",
    intensity: 78,
    likelihood: 71,
    relevance: 79,
    country: "India",
    region: "Southern Asia",
    topic: "finance",
    sector: "Financial Services",
    pestle: "Economic",
    start_year: "2023",
    end_year: "2024",
    insight: "Market growth",
    source: "Report",
    swot: "Strength",
    city: "Mumbai",
    title: "Finance Report",
    url: "http://example.com",
    published: "2023-01-04",
    added: "2023-01-04",
    impact: "",
  },
  {
    _id: "5",
    intensity: 88,
    likelihood: 79,
    relevance: 85,
    country: "United Kingdom",
    region: "Europe",
    topic: "cybersecurity",
    sector: "Information Technology",
    pestle: "Technology",
    start_year: "2023",
    end_year: "2025",
    insight: "Security threats",
    source: "News",
    swot: "Threat",
    city: "London",
    title: "Cybersecurity Report",
    url: "http://example.com",
    published: "2023-01-05",
    added: "2023-01-05",
    impact: "",
  },
  {
    _id: "6",
    intensity: 71,
    likelihood: 65,
    relevance: 73,
    country: "Japan",
    region: "Eastern Asia",
    topic: "healthcare",
    sector: "Healthcare",
    pestle: "Social",
    start_year: "2023",
    end_year: "2024",
    insight: "Innovation",
    source: "Report",
    swot: "Opportunity",
    city: "Tokyo",
    title: "Healthcare Report",
    url: "http://example.com",
    published: "2023-01-06",
    added: "2023-01-06",
    impact: "",
  },
  {
    _id: "7",
    intensity: 83,
    likelihood: 74,
    relevance: 81,
    country: "France",
    region: "Europe",
    topic: "technology",
    sector: "Information Technology",
    pestle: "Technology",
    start_year: "2023",
    end_year: "2025",
    insight: "Digital strategy",
    source: "News",
    swot: "Strength",
    city: "Paris",
    title: "Digital Strategy Report",
    url: "http://example.com",
    published: "2023-01-07",
    added: "2023-01-07",
    impact: "",
  },
  {
    _id: "8",
    intensity: 79,
    likelihood: 70,
    relevance: 77,
    country: "Brazil",
    region: "South America",
    topic: "agriculture",
    sector: "Agriculture",
    pestle: "Environmental",
    start_year: "2023",
    end_year: "2024",
    insight: "Sustainability",
    source: "Report",
    swot: "Opportunity",
    city: "Brasilia",
    title: "Agriculture Report",
    url: "http://example.com",
    published: "2023-01-08",
    added: "2023-01-08",
    impact: "",
  },
  {
    _id: "9",
    intensity: 90,
    likelihood: 82,
    relevance: 87,
    country: "Canada",
    region: "Northern America",
    topic: "technology",
    sector: "Information Technology",
    pestle: "Technology",
    start_year: "2023",
    end_year: "2025",
    insight: "Tech hub growth",
    source: "News",
    swot: "Strength",
    city: "Toronto",
    title: "Tech Hub Report",
    url: "http://example.com",
    published: "2023-01-09",
    added: "2023-01-09",
    impact: "",
  },
  {
    _id: "10",
    intensity: 75,
    likelihood: 68,
    relevance: 76,
    country: "Australia",
    region: "Oceania",
    topic: "mining",
    sector: "Mining",
    pestle: "Environmental",
    start_year: "2023",
    end_year: "2024",
    insight: "Resource demand",
    source: "Report",
    swot: "Threat",
    city: "Sydney",
    title: "Mining Report",
    url: "http://example.com",
    published: "2023-01-10",
    added: "2023-01-10",
    impact: "",
  },
]

export default function Home() {
  const [allData, setAllData] = useState<VisualizationItem[]>(MOCK_DATA)
  const [loading, setLoading] = useState(true)
  const [backendConnected, setBackendConnected] = useState(false)
  const [filters, setFilters] = useState({
    country: "",
    region: "",
    topic: "",
    sector: "",
    pestle: "",
    source: "",
    swot: "",
    city: "",
    end_year: "",
    intensityRange: [0, 100],
  })

  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        setLoading(true)
        // Check if backend is available
        await fetchHealth()
        setBackendConnected(true)

        // Fetch all data from backend
        const data = await fetchData()
        if (Array.isArray(data)) {
          setAllData(data)
        }
      } catch (error) {
        console.log("[v0] Backend not available, using mock data:", error)
        setBackendConnected(false)
        setAllData(MOCK_DATA)
      } finally {
        setLoading(false)
      }
    }

    fetchBackendData()
  }, [])

  const filteredData = useMemo(() => {
    return allData.filter((item: VisualizationItem) => {
      if (filters.country && item.country !== filters.country) return false
      if (filters.region && item.region !== filters.region) return false
      if (filters.topic && item.topic !== filters.topic) return false
      if (filters.sector && item.sector !== filters.sector) return false
      if (filters.pestle && item.pestle !== filters.pestle) return false
      if (filters.source && item.source !== filters.source) return false
      if (filters.swot && item.swot !== filters.swot) return false
      if (filters.city && item.city !== filters.city) return false
      if (filters.end_year && String(item.end_year) !== String(filters.end_year)) return false
      if (item.intensity < filters.intensityRange[0] || item.intensity > filters.intensityRange[1]) return false
      return true
    })
  }, [filters, allData])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {!backendConnected && (
          <div className="bg-yellow-100 border-b border-yellow-300 px-4 py-2 text-sm text-yellow-800">
            Backend not available - using mock data. Make sure your Node.js backend is running on port 5000.
          </div>
        )}
        <Filters onFiltersChange={setFilters} allData={allData} />
        <Dashboard data={filteredData} loading={loading} />
      </div>
    </div>
  )
}
