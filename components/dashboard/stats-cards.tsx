"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle, Clock, ListTodo } from "lucide-react";

interface StatsCardsProps {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
}

export function StatsCards({ total, completed, inProgress, todo }: StatsCardsProps) {
  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: ListTodo,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10 dark:bg-blue-500/20",
      hover: "hover:border-blue-500/30 hover:shadow-blue-500/10",
      gradient: "from-blue-500/5 to-transparent",
    },
    {
      label: "To Do",
      value: todo,
      icon: Circle,
      color: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-500/10 dark:bg-slate-500/20",
      hover: "hover:border-slate-500/30 hover:shadow-slate-500/10",
      gradient: "from-slate-500/5 to-transparent",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10 dark:bg-amber-500/20",
      hover: "hover:border-amber-500/30 hover:shadow-amber-500/10",
      gradient: "from-amber-500/5 to-transparent",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
      hover: "hover:border-emerald-500/30 hover:shadow-emerald-500/10",
      gradient: "from-emerald-500/5 to-transparent",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat) => (
        <Card 
          key={stat.label} 
          className={`relative overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md border-border/50 bg-card ${stat.hover}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50`} />
          <CardContent className="p-5 md:p-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg} shadow-sm ring-1 ring-inset ring-foreground/5`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
