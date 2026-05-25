"use client";

import { TaskForm } from "@/components/tasks/task-form";
import { useRouter } from "next/navigation";

export function TasksClient() {
  const router = useRouter();

  return (
    <TaskForm onSuccess={() => router.refresh()} />
  );
}