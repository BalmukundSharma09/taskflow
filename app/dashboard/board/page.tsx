import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { KanbanClient } from "./kanban-client";

export default async function BoardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const tasks = await prisma.task.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return <KanbanClient tasks={tasks} />;
}