"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskForm } from "@/components/tasks/task-form";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: Date | string | null;
}

interface KanbanClientProps {
  tasks: Task[];
}

export function KanbanClient({ tasks }: KanbanClientProps) {
  const router = useRouter();

  const handleStatusChange = useCallback(
    async (taskId: string, status: string) => {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    },
    [router]
  );

  function handleSuccess() {
    router.refresh();
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
        <p className="text-muted-foreground">Drag tasks between columns to update status</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Add Task</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          <KanbanBoard tasks={tasks} onStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
}