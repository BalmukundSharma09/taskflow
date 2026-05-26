"use client";

import { cn } from "@/lib/utils";
import { Users, CheckCircle, TrendingUp, Building2 } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Active Users",
    color: "text-blue-400",
  },
  {
    icon: CheckCircle,
    value: "2M+",
    label: "Tasks Completed",
    color: "text-green-400",
  },
  {
    icon: TrendingUp,
    value: "85%",
    label: "Productivity Increase",
    color: "text-violet-400",
  },
  {
    icon: Building2,
    value: "500+",
    label: "Teams Onboarded",
    color: "text-amber-400",
  },
];

export function Stats() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-r from-gray-900/50 via-gray-800/30 to-gray-900/50 p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-violet-500/5 rounded-2xl" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/3 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/3 rounded-full blur-[80px]" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center space-y-2 group">
                <stat.icon className={cn("h-6 w-6 mx-auto group-hover:scale-110 transition-transform", stat.color)} />
                <div className="text-3xl md:text-4xl font-bold text-white group-hover:text-blue-300 transition-colors">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
