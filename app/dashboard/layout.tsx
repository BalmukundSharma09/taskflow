import Link from "next/link";
import { CheckSquare } from "lucide-react";
import { DashboardNav } from "@/components/dashboard-nav";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <header className="h-14 border-b bg-card flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
            <CheckSquare className="h-5 w-5" />
            TaskFlow
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-56 border-r bg-card flex-col hidden md:flex">
          <DashboardNav />
          <DashboardSidebar />
        </aside>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}