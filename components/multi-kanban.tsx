"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanBoard } from "./kanban-board";
import { tasks as useCase01Tasks } from "@/data/usecase-01";
import { tasks as useCase02Tasks } from "@/data/usecase-02";
import { tasks as useCase03Tasks } from "@/data/usecase-03";
import { tasks as useCase04Tasks } from "@/data/usecase-04";
import { useState } from "react";

export function MultiKanban() {
  const [activeTab, setActiveTab] = useState("usecase1");

  const headings = {
    usecase1: "Navigate home on the shortest route and find me the best rated charger on the way",
    usecase2: "Battery and Charging Management",
    usecase3: "Route Intelligence and Conditions",
    usecase4: "User Settings and Preferences",
  };

  return (
    <Tabs
      defaultValue="usecase1"
      className="w-full"
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="grid w-full grid-cols-4 mb-8">
        <TabsTrigger value="usecase1">Use Case 1</TabsTrigger>
        <TabsTrigger value="usecase2">Use Case 2</TabsTrigger>
        <TabsTrigger value="usecase3">Use Case 3</TabsTrigger>
        <TabsTrigger value="usecase4">Use Case 4</TabsTrigger>
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
      <TabsContent value="usecase4">
        <KanbanBoard initialTasks={useCase04Tasks} useCaseId={headings.usecase4} />
      </TabsContent>
    </Tabs>
  );
}
