"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BarChart3, Kanban } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-full max-w-screen-xl mb-4 mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button
              variant={pathname === "/" ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Kanban className="h-4 w-4" />
              Kanban Board
            </Button>
          </Link>
          <Link href="/analytics">
            <Button
              variant={pathname === "/analytics" ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
