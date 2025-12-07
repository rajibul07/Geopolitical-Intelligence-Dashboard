"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sidebar border-r border-border overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <span className="font-bold text-lg text-foreground">Dashboard</span>
        </div>

        <nav className="space-y-2">
          <NavItem icon="📊" label="Analytics" href="/" active={pathname === "/"} />
          <NavItem icon="📈" label="Reports" href="/reports" active={pathname === "/reports"} />
          <NavItem icon="⚙️" label="Settings" href="/settings" active={pathname === "/settings"} />
          <NavItem icon="👥" label="Team" href="/teams" active={pathname === "/teams"} />
        </nav>
      </div>
    </aside>
  )
}

function NavItem({ icon, label, href, active }: { icon: string; label: string; href: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`w-full px-4 py-2 rounded-lg text-left flex items-center gap-3 transition-colors ${active ? "bg-primary text-white" : "text-muted-foreground hover:bg-accent"
        }`}
    >
      <span>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}
