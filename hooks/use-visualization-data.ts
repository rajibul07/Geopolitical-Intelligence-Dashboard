"use client"

import { useState, useEffect } from "react"

export interface VisualizationItem {
  _id: string
  intensity: number
  likelihood: number
  relevance: number
  country: string
  region: string
  topic: string
  sector: string
  pestle: string
  source: string
  swot: string
  city: string
  end_year: string | number
  start_year: string | number
  insight: string
  title: string
  url: string
  published: string
  added: string
  impact: string
}

export function useVisualizationData(apiUrl: string) {
  const [allData, setAllData] = useState<VisualizationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiUrl}/api/visualizations`)

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`)
        }

        const data = await response.json()
        setAllData(Array.isArray(data) ? data : [])
        setError(null)
      } catch (err) {
        console.error("[v0] Error fetching visualization data:", err)
        setError(err instanceof Error ? err.message : "Failed to load data")
        setAllData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [apiUrl])

  return { allData, loading, error }
}
