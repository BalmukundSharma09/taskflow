import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskList } from "@/components/tasks/task-list";
import { TasksClient } from "./tasks-client";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { RecentTasks } from "@/components/dashboard/recent-tasks";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const tasks = await prisma.task.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;
  const todoTasks = tasks.filter((t) => t.status === "todo").length;

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, {user.name}</p>
      </div>

      <div className="mb-8">
        <StatsCards
          total={totalTasks}
          completed={completedTasks}
          inProgress={inProgressTasks}
          todo={todoTasks}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2">
          <RecentTasks tasks={tasks} />
        </div>
        <div>
          <ProgressChart
            todo={todoTasks}
            inProgress={inProgressTasks}
            completed={completedTasks}
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3">
        <Card className="lg:col-span-1 min-w-0">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle>Create New Task</CardTitle>
            <CardDescription>Add a new task to your list</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <TasksClient />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 min-w-0">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle>Your Tasks</CardTitle>
            <CardDescription>Manage and track your tasks</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <TaskList tasks={tasks} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}