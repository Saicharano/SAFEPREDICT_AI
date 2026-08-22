import Link from "next/link";
import { Activity, BarChart3, Gauge, History, Search, Settings2, ShieldCheck, Siren, Wrench } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Command Center", icon: Gauge },
  { href: "/risk-priority", label: "Risk Priority", icon: Siren },
  { href: "/sensor-intelligence", label: "Sensors", icon: Activity },
  { href: "/maintenance", label: "Maintenance", icon: Wrench },
  { href: "/analyzer", label: "AI Analyzer", icon: Settings2 },
  { href: "/audit-log", label: "Audit Log", icon: History },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050812] text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(124,58,237,0.16),transparent_30%),linear-gradient(180deg,#050812,#090d16_44%,#050812)]" />
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-slate-950/55 p-5 backdrop-blur-xl lg:block">
        <Link href="/" className="mb-8 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg border border-blue-400/30 bg-blue-500/15">
            <ShieldCheck className="h-6 w-6 text-blue-300" />
          </span>
          <span>
            <span className="block text-lg font-black tracking-tight">SafePredict AI</span>
            <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">Safety Intelligence</span>
          </span>
        </Link>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-3 text-sm text-slate-300 transition hover:border-blue-400/20 hover:bg-blue-400/10 hover:text-white"
                href={item.href}
                key={item.href}
              >
                <Icon className="h-4 w-4 text-blue-300" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-amber-300/20 bg-amber-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-200">Active AI Watch</p>
          <p className="mt-2 text-sm text-slate-200">5 alerts are escalating across process-critical assets.</p>
        </div>
      </aside>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050812]/85 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black">
            <ShieldCheck className="h-5 w-5 text-blue-300" />
            SafePredict AI
          </Link>
          <BarChart3 className="h-5 w-5 text-slate-300" />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {navItems.map((item) => (
            <Link className="shrink-0 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </header>
      <main className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-blue-300">Industrial Safety Intelligence Platform</p>
              <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">AI Command Center</h1>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-400">
              <Search className="h-4 w-4" />
              Search assets, alerts, inspections
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
