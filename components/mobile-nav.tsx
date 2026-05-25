"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, CheckSquare, LayoutDashboard, Kanban } from "lucide-react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 text-muted-foreground hover:text-foreground"
        aria-label="Toggle navigation"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside
            className={cn(
              "fixed left-0 top-0 bottom-0 w-64 bg-card border-r z-50 flex flex-col",
            )}
          >
            <div className="h-14 border-b flex items-center px-6">
              <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg" onClick={() => setOpen(false)}>
                <CheckSquare className="h-5 w-5" />
                TaskFlow
              </Link>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  pathname === "/dashboard"
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/board"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  pathname === "/dashboard/board"
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Kanban className="h-4 w-4" />
                Kanban Board
              </Link>
            </nav>
            <DashboardSidebar />
          </aside>
        </div>
      )}
    </>
  );
}