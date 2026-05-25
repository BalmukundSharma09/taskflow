"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, ListTodo, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/15 bg-blue-500/8 text-blue-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Modern productivity platform
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Organize work.{" "}
              <span className="text-blue-400">Achieve more.</span>
            </h1>

            <p className="text-base text-gray-500 max-w-md leading-relaxed">
              TaskFlow helps you manage tasks, track progress, and collaborate efficiently.
              The simplest way to get things done.
            </p>

            <div className="flex flex-wrap gap-2">
              {["AI Insights", "Kanban", "Pomodoro", "Team Sync"].map((f) => (
                <span key={f} className="text-xs px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-gray-400">{f}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Button asChild className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-6 h-10 text-sm shadow-lg shadow-blue-600/20">
                <Link href="/auth/register">
                  Get Started Free
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-white/[0.08] text-gray-300 hover:bg-white/[0.03] rounded-lg px-6 h-10 text-sm">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div className="flex -space-x-1.5">
                {["JD", "AK", "SM"].map((init, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-black bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-[9px] font-semibold text-white">{init}</div>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                <span className="text-blue-400 font-medium">50K+</span> teams onboarded
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-2xl blur-2xl" />
            <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 sm:p-7">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/10">
                    <ListTodo className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-white">Dashboard</span>
                </div>
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-black/40" />
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 border-2 border-black/40" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Total", value: "12", icon: ListTodo, color: "text-blue-400", bg: "bg-blue-500/10" },
                  { label: "Active", value: "4", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
                  { label: "Done", value: "7", icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
                ].map((s) => (
                  <div key={s.label} className={`${s.bg} rounded-lg p-2.5 text-center`}>
                    <s.icon className={`h-3.5 w-3.5 mx-auto ${s.color}`} />
                    <p className="text-lg font-bold text-white mt-0.5">{s.value}</p>
                    <p className="text-[10px] text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {[
                  { title: "Design new landing page", done: true },
                  { title: "Update API endpoints", done: true },
                  { title: "Review pull requests", done: false },
                  { title: "Write documentation", done: false },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-white/[0.03]">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${t.done ? "bg-green-500 border-green-500" : "border-white/20"}`}>
                      {t.done && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <span className={`text-xs flex-1 ${t.done ? "text-gray-500 line-through" : "text-gray-300"}`}>{t.title}</span>
                    <TrendingUp className="h-3 w-3 text-gray-600" />
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-center">
                <span className="text-[10px] text-gray-600">Track progress at a glance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}