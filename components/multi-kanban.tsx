"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanBoard } from "./kanban-board";
import { tasks as useCase01Tasks } from "@/data/usecase-01";
import { tasks as useCase02Tasks } from "@/data/usecase-02";
import { tasks as useCase03Tasks } from "@/data/usecase-03";
import { useState } from "react";
import { SessionManager } from "@/lib/session-manager";
import { Session } from "@/lib/session-manager";
import { SessionSelector } from "./session-selector";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Column } from "@/models/column_model";

interface BoardStates {
  usecase1: Column[];
  usecase2: Column[];
  usecase3: Column[];
}

export function MultiKanban() {
  const [activeTab, setActiveTab] = useState("usecase1");
  const [sessionName, setSessionName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const headings = {
    usecase1:
      "Navigiere zur Arbeit auf der schnellsten Route und suche nach einem McDonalds.",
    usecase2:
      "Bring mich schnell zu Frau Brommer, die Adresse hat Sie mir gemailt. Und plane eine Schnellladestation ein, falls der Akkustand unterwegs unter 20 % fällt.",
    usecase3:
      "Bring mich zum Konzert aus meinem Kalender und finde vorher die letzte mögliche Ladestation mit Restaurant.",
  };

  const steps = {
    usecase1: [
      { title: "Plane Route", color: "bg-blue-600" },
      { title: "Suche Point of Interest", color: "bg-green-600" },
      { title: "Starte Route", color: "bg-amber-600" },
    ],
    usecase2: [
      { title: "Suche Kontakt", color: "bg-red-600" },
      { title: "Durchsuche Emails", color: "bg-fuchsia-600" },
      { title: "Plane Route", color: "bg-blue-600" },
      { title: "Berechne bleibende Distanz", color: "bg-yellow-600" },
      { title: "Suche Point of Interest", color: "bg-green-600" },
      { title: "Starte Route", color: "bg-amber-600" },
    ],
    usecase3: [
      { title: "Suche Kalender Event", color: "bg-red-600" },
      { title: "Websuche", color: "bg-fuchsia-600" },
      { title: "Plane Route", color: "bg-blue-600" },
      { title: "Berechne bleibende Distanz", color: "bg-yellow-600" },
      { title: "Suche Point of Interest", color: "bg-green-600" },
      { title: "Starte Route", color: "bg-amber-600" },
    ],
  };

  const handleSaveSession = async () => {
    if (!sessionName.trim()) return;

    // Get all board states
    const boardStates: BoardStates = {
      usecase1: JSON.parse(
        localStorage.getItem(`kanban-${headings.usecase1}`) || "[]"
      ) as Column[],
      usecase2: JSON.parse(
        localStorage.getItem(`kanban-${headings.usecase2}`) || "[]"
      ) as Column[],
      usecase3: JSON.parse(
        localStorage.getItem(`kanban-${headings.usecase3}`) || "[]"
      ) as Column[],
    };

    await SessionManager.saveSession(
      sessionName,
      boardStates,
      selectedSession?.id
    );
    setSessionName("");
    setShowSaveDialog(false);
  };

  const handleLoadSession = (session: Session) => {
    setSelectedSession(session);
    setSessionName(session.name);

    // Load states for all boards
    const boardStates = session.columns as BoardStates;
    Object.entries(boardStates).forEach(([key, columns]) => {
      localStorage.setItem(
        `kanban-${headings[key as keyof typeof headings]}`,
        JSON.stringify(columns)
      );
    });
  };

  const handleOpenSaveDialog = () => {
    setSessionName(selectedSession?.name || "");
    setShowSaveDialog(true);
  };

  const handleNewSession = () => {
    setSelectedSession(null);
    setSessionName("");
    setShowSaveDialog(true);
  };

  return (
    <div>
      <div className="flex justify-end gap-2 mb-4">
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={handleOpenSaveDialog}>
              Save Session
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedSession ? "Update Session" : "New Session"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex gap-2 mt-4">
              <Input
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                placeholder={
                  selectedSession
                    ? "Update session name..."
                    : "Enter session name..."
                }
              />
              <Button onClick={handleSaveSession}>
                {selectedSession ? "Update" : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <SessionSelector
          onSelectSession={handleLoadSession}
          onNewSession={handleNewSession}
        />
      </div>

      <Tabs
        defaultValue="usecase1"
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="usecase1">Low Latency</TabsTrigger>
          <TabsTrigger value="usecase2">High Latency</TabsTrigger>
          <TabsTrigger value="usecase3">High Latency (Ambiguous)</TabsTrigger>
        </TabsList>

        <h2 className="text-2xl font-bold mb-5">
          {headings[activeTab as keyof typeof headings]}
        </h2>

        <TabsContent value="usecase1">
          <KanbanBoard
            initialTasks={useCase01Tasks}
            useCaseId={headings.usecase1}
            steps={steps.usecase1}
          />
        </TabsContent>
        <TabsContent value="usecase2">
          <KanbanBoard
            initialTasks={useCase02Tasks}
            useCaseId={headings.usecase2}
            steps={steps.usecase2}
          />
        </TabsContent>
        <TabsContent value="usecase3">
          <KanbanBoard
            initialTasks={useCase03Tasks}
            useCaseId={headings.usecase3}
            steps={steps.usecase3}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
