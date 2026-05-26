"use client";

import { useState } from "react";
import { TaskItem } from "./task-item";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: Date | string | null;
  createdAt: Date | string;
}

interface TaskListProps {
  tasks: Task[];
}

const filters = [
  { key: "all", label: "All" },
  { key: "todo", label: "Todo" },
  { key: "in-progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

export function TaskList({ tasks }: TaskListProps) {
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="space-y-4 sm:space-y-6 min-w-0">
      <div className="flex flex-wrap gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap border shadow-sm",
              filter === f.key
                ? "bg-primary text-primary-foreground border-primary shadow-primary/20 scale-105"
                : "bg-background/50 border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:border-border"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="space-y-3 overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3 text-center bg-muted/20 rounded-xl border border-dashed border-border/50">
            <div className="text-4xl opacity-80">📋</div>
            <p className="text-sm font-medium text-muted-foreground">
              {filter === "all"
                ? "No tasks yet — create one above"
                : `No tasks with status "${filter}"`}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}