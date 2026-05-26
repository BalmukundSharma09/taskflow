"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Columns3, BarChart3, Users, Bell, Zap } from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Task Management",
    description: "Create, organize, and prioritize tasks with an intuitive drag-and-drop interface.",
    gradient: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Columns3,
    title: "Kanban Workflow",
    description: "Visual workflow management with customizable columns and real-time updates.",
    gradient: "from-violet-500/20 to-violet-600/10",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track productivity with insightful charts, metrics, and performance data.",
    gradient: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with shared workspaces and real-time task updates.",
    gradient: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay informed with intelligent alerts for deadlines, updates, and mentions.",
    gradient: "from-rose-500/20 to-rose-600/10",
    border: "border-rose-500/20",
    iconColor: "text-rose-400",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed with instant updates, zero lag, and smooth interactions.",
    gradient: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Everything you need to stay productive
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Powerful features designed to help you and your team work smarter, not harder.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-gradient-to-br p-6",
                "hover:scale-[1.03] hover:shadow-xl transition-all duration-300 cursor-default animate-slide-up",
                feature.border,
                feature.gradient,
                `stagger-${Math.min(i + 1, 6)}`
              )}
            >
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/[0.01] group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
              <div className="relative">
                <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 ${feature.iconColor} group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
