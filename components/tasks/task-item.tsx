"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: Date | string | null;
  createdAt: Date | string;
}

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleStatusChange(status: string) {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDelete() {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });
      if (res.ok) router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-start sm:items-center gap-2 sm:gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors max-w-full">
      <Checkbox
        checked={task.status === "completed"}
        onCheckedChange={(checked) =>
          handleStatusChange(checked ? "completed" : "todo")
        }
        disabled={isUpdating}
        className="mt-0.5 sm:mt-0 shrink-0"
      />
      <div className="flex-1 min-w-0 overflow-hidden">
        <p className={`text-sm font-medium truncate ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-muted-foreground truncate">{task.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
          <span className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${
            task.priority === "high"
              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              : task.priority === "medium"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
          }`}>
            {task.priority}
          </span>
          <div className="min-w-0 max-w-[120px] sm:max-w-[140px]">
            <Select
              value={task.status}
              onValueChange={handleStatusChange}
              disabled={isUpdating}
            >
              <SelectTrigger className="h-6 text-xs w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={handleDelete} className="shrink-0 mt-0.5 sm:mt-0">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}