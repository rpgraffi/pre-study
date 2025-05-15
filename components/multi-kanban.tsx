"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanBoard } from "./kanban-board";
import { tasks as useCase01Tasks } from "@/data/usecase-01";
import { tasks as useCase02Tasks } from "@/data/usecase-02";
import { tasks as useCase03Tasks } from "@/data/usecase-03";
import { useState } from "react";

export function MultiKanban() {
  const [activeTab, setActiveTab] = useState("usecase1");

  const headings = {
    usecase1: "Navigiere zur Arbeit auf der schnellsten Route und suche nach einem McDonalds.",
    usecase2: "Bring mich schnell zu Frau Brommer, die Adresse hat Sie mir gemailt. Und plane eine Schnellladestation ein, falls der Akkustand unterwegs unter 20 % fällt.",
    usecase3: "Bring mich zum Konzert aus meinem Kalender und finde vorher die letzte mögliche Ladestation mit Restaurant.",
  };

  return (
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
        <KanbanBoard initialTasks={useCase01Tasks} useCaseId={headings.usecase1} />
      </TabsContent>
      <TabsContent value="usecase2">
        <KanbanBoard initialTasks={useCase02Tasks} useCaseId={headings.usecase2} />
      </TabsContent>
      <TabsContent value="usecase3">
        <KanbanBoard initialTasks={useCase03Tasks} useCaseId={headings.usecase3} />
      </TabsContent>
    </Tabs>
  );
}
