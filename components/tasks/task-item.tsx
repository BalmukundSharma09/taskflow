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
    <div className="group flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-border/50 bg-card hover:bg-accent/40 hover:border-border transition-all duration-200 shadow-sm hover:shadow max-w-full">
      <Checkbox
        checked={task.status === "completed"}
        onCheckedChange={(checked) =>
          handleStatusChange(checked ? "completed" : "todo")
        }
        disabled={isUpdating}
        aria-label={`Mark task "${task.title}" as ${task.status === 'completed' ? 'todo' : 'completed'}`}
        className="mt-1 sm:mt-0 shrink-0 h-5 w-5 rounded-md border-muted-foreground/30 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 transition-all"
      />
      <div className="flex-1 min-w-0 overflow-hidden">
        <p className={`text-sm sm:text-base font-medium truncate transition-all duration-200 ${task.status === "completed" ? "line-through text-muted-foreground/60" : "text-foreground"}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs sm:text-sm text-muted-foreground truncate mt-0.5">{task.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-2.5">
          <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 tracking-wide uppercase ${
            task.priority === "high"
              ? "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-500/20"
              : task.priority === "medium"
              ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-500/20"
              : "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/20"
          }`}>
            {task.priority}
          </span>
          <div className="min-w-0 max-w-[120px] sm:max-w-[140px]">
            <Select
              value={task.status}
              onValueChange={handleStatusChange}
              disabled={isUpdating}
            >
              <SelectTrigger 
                aria-label="Change task status"
                className="h-9 text-xs bg-background/50 border-border/50 hover:bg-accent focus:ring-1 focus:ring-ring w-full rounded-md shadow-none transition-colors"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo" className="text-xs">Todo</SelectItem>
                <SelectItem value="in-progress" className="text-xs">In Progress</SelectItem>
                <SelectItem value="completed" className="text-xs">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleDelete} 
        aria-label={`Delete task "${task.title}"`}
        className="shrink-0 mt-0.5 sm:mt-0 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all duration-200 h-10 w-10"
      >
        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
}