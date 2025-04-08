"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Session, SessionManager } from "@/lib/session-manager";

interface SessionSelectorProps {
  onSelectSession: (session: Session) => void;
  onNewSession: () => void;
}

export function SessionSelector({
  onSelectSession,
  onNewSession,
}: SessionSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [sessions, setSessions] = React.useState<Session[]>([]);

  React.useEffect(() => {
    try {
      const savedSessions = SessionManager.getSessions();
      // Sort sessions by date (newest first)
      const sortedSessions = (
        Array.isArray(savedSessions) ? savedSessions : []
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setSessions(sortedSessions);
    } catch (error) {
      console.error("Error loading sessions:", error);
      setSessions([]);
    }
  }, []);

  const handleDeleteSession = (sessionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    SessionManager.deleteSession(sessionId);
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (value === sessionId) {
      setValue("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? sessions.find((session) => session.id === value)?.name
            : "Select session..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search sessions..." className="h-9" />
          <CommandList>
            <CommandEmpty>No sessions found.</CommandEmpty>
            <CommandGroup>
              {Array.isArray(sessions) &&
                sessions.map((session) => (
                  <CommandItem
                    key={session.id}
                    value={session.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      const selectedSession = sessions.find(
                        (s) => s.id === currentValue
                      );
                      if (selectedSession) {
                        onSelectSession(selectedSession);
                      }
                    }}
                    className="flex items-center justify-between"
                  >
                    <span>{session.name}</span>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={(e) => handleDeleteSession(session.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  onNewSession();
                }}
                className="flex items-center justify-between"
              >
                <span>New Session</span>
                <Plus className="h-4 w-4" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
