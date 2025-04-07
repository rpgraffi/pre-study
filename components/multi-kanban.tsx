"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanBoard } from "./kanban-board";
import { tasks as useCase01Tasks } from "@/data/usecase-01";
import { tasks as useCase02Tasks } from "@/data/usecase-02";
import { tasks as useCase03Tasks } from "@/data/usecase-03";
import { tasks as useCase04Tasks } from "@/data/usecase-04";

export function MultiKanban() {
  return (
    <Tabs defaultValue="usecase1" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="usecase1">Use Case 1</TabsTrigger>
        <TabsTrigger value="usecase2">Use Case 2</TabsTrigger>
        <TabsTrigger value="usecase3">Use Case 3</TabsTrigger>
        <TabsTrigger value="usecase4">Use Case 4</TabsTrigger>
      </TabsList>
      <TabsContent value="usecase1">
        <KanbanBoard initialTasks={useCase01Tasks} />
      </TabsContent>
      <TabsContent value="usecase2">
        <KanbanBoard initialTasks={useCase02Tasks} />
      </TabsContent>
      <TabsContent value="usecase3">
        <KanbanBoard initialTasks={useCase03Tasks} />
      </TabsContent>
      <TabsContent value="usecase4">
        <KanbanBoard initialTasks={useCase04Tasks} />
      </TabsContent>
    </Tabs>
  );
}
