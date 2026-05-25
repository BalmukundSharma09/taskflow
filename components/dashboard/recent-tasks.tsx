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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Tasks</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/board">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {recentTasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No tasks yet
          </div>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task) => {
              const taskStatus = task.status as TaskStatus;
              const taskPriority = task.priority as TaskPriority;
              const StatusIcon = statusIcons[taskStatus];
              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <StatusIcon className={`h-4 w-4 shrink-0 ${statusColors[taskStatus]}`} />
                    <span className="truncate text-sm">{task.title}</span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${priorityColors[taskPriority]} shrink-0`} />
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}