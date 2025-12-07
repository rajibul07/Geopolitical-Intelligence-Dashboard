"use client"

import { useState } from "react"
import type { VisualizationItem } from "@/hooks/use-visualization-data"

interface FiltersProps {
  onFiltersChange: (filters: any) => void
  allData: VisualizationItem[]
}

export function Filters({ onFiltersChange, allData }: FiltersProps) {
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

  const countries = [...new Set(allData.map((d) => d.country).filter(Boolean))].sort()
  const regions = [...new Set(allData.map((d) => d.region).filter(Boolean))].sort()
  const topics = [...new Set(allData.map((d) => d.topic).filter(Boolean))].sort()
  const sectors = [...new Set(allData.map((d) => d.sector).filter(Boolean))].sort()
  const pestles = [...new Set(allData.map((d) => d.pestle).filter(Boolean))].sort()
  const sources = [...new Set(allData.map((d) => d.source).filter(Boolean))].sort()
  const swots = [...new Set(allData.map((d) => d.swot).filter(Boolean))].sort()
  const cities = [...new Set(allData.map((d) => d.city).filter(Boolean))].sort()
  const end_years = [...new Set(allData.map((d) => d.end_year).filter(Boolean))].sort()

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleResetFilters = () => {
    const resetFilters = {
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
    }
    setFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <button
          onClick={handleResetFilters}
          className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
        {/* Country Filter */}
        <select
          value={filters.country}
          onChange={(e) => handleFilterChange("country", e.target.value)}
          className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Country ({countries.length})</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country || "N/A"}
            </option>
          ))}
        </select>

        {/* Region Filter */}
        <select
          value={filters.region}
          onChange={(e) => handleFilterChange("region", e.target.value)}
          className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Region ({regions.length})</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region || "N/A"}
            </option>
          ))}
        </select>

        {/* Topic Filter */}
        <select
          value={filters.topic}
          onChange={(e) => handleFilterChange("topic", e.target.value)}
          className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Topic ({topics.length})</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic || "N/A"}
            </option>
          ))}
        </select>

        {/* Sector Filter */}
        <select
          value={filters.sector}
          onChange={(e) => handleFilterChange("sector", e.target.value)}
          className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Sector ({sectors.length})</option>
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector || "N/A"}
            </option>
          ))}
        </select>

        {/* PESTLE Filter */}
        <select
          value={filters.pestle}
          onChange={(e) => handleFilterChange("pestle", e.target.value)}
          className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">PESTLE ({pestles.length})</option>
          {pestles.map((pestle) => (
            <option key={pestle} value={pestle}>
              {pestle || "N/A"}
            </option>
          ))}
        </select>

        {/* Source Filter */}
        <select
          value={filters.source}
          onChange={(e) => handleFilterChange("source", e.target.value)}
          className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Source ({sources.length})</option>
          {sources.map((source) => (
            <option key={source} value={source}>
              {source || "N/A"}
            </option>
          ))}
        </select>

        {/* SWOT Filter */}
        <select
          value={filters.swot}
          onChange={(e) => handleFilterChange("swot", e.target.value)}
          className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">SWOT ({swots.length})</option>
          {swots.map((swot) => (
            <option key={swot} value={swot}>
              {swot || "N/A"}
            </option>
          ))}
        </select>

        {/* City Filter */}
        <select
          value={filters.city}
          onChange={(e) => handleFilterChange("city", e.target.value)}
          className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">City ({cities.length})</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city || "N/A"}
            </option>
          ))}
        </select>

        {/* End Year Filter */}
        <select
          value={filters.end_year}
          onChange={(e) => handleFilterChange("end_year", e.target.value)}
          className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">End Year ({end_years.length})</option>
          {end_years.map((year) => (
            <option key={year} value={year}>
              {year || "N/A"}
            </option>
          ))}
        </select>

        {/* Intensity Range Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-muted-foreground">
            Intensity: {filters.intensityRange[0]}-{filters.intensityRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.intensityRange[1]}
            onChange={(e) => handleFilterChange("intensityRange", [filters.intensityRange[0], Number(e.target.value)])}
            className="w-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}
