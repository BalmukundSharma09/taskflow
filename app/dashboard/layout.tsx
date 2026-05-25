import Link from "next/link";
import { CheckSquare, LayoutDashboard, Kanban } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-14 border-b bg-card flex items-center justify-between px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
          <CheckSquare className="h-5 w-5" />
          TaskFlow
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-56 border-r bg-card flex flex-col hidden md:flex">
          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/board"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Kanban className="h-4 w-4" />
              Kanban Board
            </Link>
          </nav>
          <DashboardSidebar />
        </aside>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}