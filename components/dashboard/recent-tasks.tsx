"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Circle } from "lucide-react";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: Date | string;
}

interface RecentTasksProps {
  tasks: Task[];
}

type TaskStatus = "todo" | "in-progress" | "completed";
type TaskPriority = "low" | "medium" | "high";

const statusIcons: Record<TaskStatus, typeof Circle> = {
  todo: Circle,
  "in-progress": Clock,
  completed: CheckCircle,
};

const statusColors: Record<TaskStatus, string> = {
  todo: "text-slate-500",
  "in-progress": "text-yellow-500",
  completed: "text-green-500",
};

const priorityColors: Record<TaskPriority, string> = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

export function RecentTasks({ tasks }: RecentTasksProps) {
  const recentTasks = tasks.slice(0, 5);

  return (
    <Card className="h-full shadow-sm border-border/50 bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">Recent Tasks</CardTitle>
        <Button variant="outline" size="sm" asChild className="h-8 text-xs font-medium">
          <Link href="/dashboard/board">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {recentTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-3 text-center bg-muted/20 rounded-lg border border-dashed border-border/50">
            <div className="text-4xl">✨</div>
            <p className="text-sm text-muted-foreground font-medium">No tasks yet — get started!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentTasks.map((task) => {
              const taskStatus = task.status as TaskStatus;
              const taskPriority = task.priority as TaskPriority;
              const StatusIcon = statusIcons[taskStatus];
              return (
                <div
                  key={task.id}
                  className="group flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-border/50 hover:bg-accent/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded-md bg-background shadow-sm border border-border/20 group-hover:border-border/40 transition-colors">
                      <StatusIcon className={`h-4 w-4 shrink-0 ${statusColors[taskStatus]}`} />
                    </div>
                    <span className="truncate text-sm font-medium">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${priorityColors[taskPriority]} shrink-0 shadow-sm`} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}