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
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 md:px-6 z-50 shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
            <CheckSquare className="h-5 w-5 text-primary" />
            <span>TaskFlow</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r bg-card/30 flex-col hidden md:flex overflow-y-auto">
          <DashboardNav />
          <DashboardSidebar />
        </aside>
        <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/20">
          {children}
        </main>
      </div>
    </div>
  );
}