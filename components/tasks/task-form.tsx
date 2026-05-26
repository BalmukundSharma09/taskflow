"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Calendar } from "lucide-react";

interface TaskFormProps {
  onSuccess?: () => void;
}

export function TaskForm({ onSuccess }: TaskFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description: description || undefined,
          priority,
          dueDate: dueDate || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
      <div className="w-full min-w-0 space-y-1.5">
        <label htmlFor="task-title" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Task Title</label>
        <Input
          id="task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          required
          disabled={isLoading}
          className="h-10 w-full bg-background/50 border-border/50 focus-visible:ring-1 focus-visible:ring-primary shadow-sm transition-all"
        />
      </div>
      <div className="w-full min-w-0 space-y-1.5">
        <label htmlFor="task-desc" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description (Optional)</label>
        <Textarea
          id="task-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description..."
          disabled={isLoading}
          className="min-h-[100px] w-full bg-background/50 border-border/50 focus-visible:ring-1 focus-visible:ring-primary shadow-sm transition-all resize-none"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="w-full min-w-0 space-y-1.5">
          <label htmlFor="task-priority" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Priority</label>
          <Select value={priority} onValueChange={setPriority} disabled={isLoading}>
            <SelectTrigger id="task-priority" className="h-10 w-full bg-background/50 border-border/50 focus:ring-1 focus:ring-primary shadow-sm transition-all">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full min-w-0 space-y-1.5">
          <label htmlFor="task-due-date" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Due Date</label>
          <div className="relative w-full">
            <Input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={isLoading}
              onClick={(e) => {
                try {
                  if ('showPicker' in HTMLInputElement.prototype) {
                    e.currentTarget.showPicker();
                  }
                } catch (err) {}
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Tab') e.preventDefault();
              }}
              className="h-10 w-full bg-background/50 border-border/50 focus-visible:ring-1 focus-visible:ring-primary shadow-sm transition-all pr-1 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2 [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-datetime-edit]:pr-8 md:text-xs md:pr-10 md:cursor-pointer md:[&::-webkit-calendar-picker-indicator]:hidden md:[&::-webkit-datetime-edit]:pr-0"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none hidden md:block" />
          </div>
        </div>
      </div>
      <div className="pt-2">
        <Button type="submit" disabled={isLoading || !title.trim()} className="w-full h-10 font-medium shadow-sm transition-all hover:shadow-md">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Task...
            </>
          ) : (
            "Add Task"
          )}
        </Button>
      </div>
    </form>
  );
}