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
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      suffix: "",
    },
    {
      label: "To Do",
      value: todo,
      icon: Circle,
      color: "text-slate-500",
      bg: "bg-slate-500/10",
      suffix: "",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: Clock,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      suffix: "",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle,
      color: "text-green-500",
      bg: "bg-green-500/10",
      suffix: "",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">
                  {stat.value}{stat.suffix}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}