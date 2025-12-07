const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export async function fetchData(filters?: {
  country?: string
  region?: string
  topic?: string
  sector?: string
  pestle?: string
  minIntensity?: number
  maxIntensity?: number
}) {
  const params = new URLSearchParams()
  if (filters?.country) params.append("country", filters.country)
  if (filters?.region) params.append("region", filters.region)
  if (filters?.topic) params.append("topic", filters.topic)
  if (filters?.sector) params.append("sector", filters.sector)
  if (filters?.pestle) params.append("pestle", filters.pestle)
  if (filters?.minIntensity !== undefined) params.append("minIntensity", filters.minIntensity.toString())
  if (filters?.maxIntensity !== undefined) params.append("maxIntensity", filters.maxIntensity.toString())

  const response = await fetch(`${API_URL}/api/data${params.toString() ? "?" + params.toString() : ""}`)
  if (!response.ok) throw new Error("Failed to fetch data")
  return response.json()
}

export async function fetchStats(filters?: {
  country?: string
  region?: string
  topic?: string
  sector?: string
  pestle?: string
  minIntensity?: number
  maxIntensity?: number
}) {
  const params = new URLSearchParams()
  if (filters?.country) params.append("country", filters.country)
  if (filters?.region) params.append("region", filters.region)
  if (filters?.topic) params.append("topic", filters.topic)
  if (filters?.sector) params.append("sector", filters.sector)
  if (filters?.pestle) params.append("pestle", filters.pestle)
  if (filters?.minIntensity !== undefined) params.append("minIntensity", filters.minIntensity.toString())
  if (filters?.maxIntensity !== undefined) params.append("maxIntensity", filters.maxIntensity.toString())

  const response = await fetch(`${API_URL}/api/stats${params.toString() ? "?" + params.toString() : ""}`)
  if (!response.ok) throw new Error("Failed to fetch stats")
  return response.json()
}

export async function fetchByCountry(filters?: {
  sector?: string
  topic?: string
  pestle?: string
}) {
  const params = new URLSearchParams()
  if (filters?.sector) params.append("sector", filters.sector)
  if (filters?.topic) params.append("topic", filters.topic)
  if (filters?.pestle) params.append("pestle", filters.pestle)

  const response = await fetch(`${API_URL}/api/by-country${params.toString() ? "?" + params.toString() : ""}`)
  if (!response.ok) throw new Error("Failed to fetch country data")
  return response.json()
}

export async function fetchByYear(filters?: {
  country?: string
  sector?: string
}) {
  const params = new URLSearchParams()
  if (filters?.country) params.append("country", filters.country)
  if (filters?.sector) params.append("sector", filters.sector)

  const response = await fetch(`${API_URL}/api/by-year${params.toString() ? "?" + params.toString() : ""}`)
  if (!response.ok) throw new Error("Failed to fetch year data")
  return response.json()
}

export async function fetchFilterOptions() {
  const response = await fetch(`${API_URL}/api/filters`)
  if (!response.ok) throw new Error("Failed to fetch filter options")
  return response.json()
}

export async function fetchHealth() {
  const response = await fetch(`${API_URL}/api/health`)
  if (!response.ok) throw new Error("Failed to reach backend")
  return response.json()
}
