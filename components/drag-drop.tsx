"use client";

import React from "react";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./sortable-item";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Item {
  id: string;
  content: string;
}

export function DragDrop() {
  const [sourceItems, setSourceItems] = useState<Item[]>([
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
    { id: "3", content: "Item 3" },
  ]);

  const [targetItems, setTargetItems] = useState<Item[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    // Check if we're moving between containers
    const activeContainer = sourceItems.find((item) => item.id === active.id)
      ? "source"
      : "target";
    const overContainer = sourceItems.find((item) => item.id === over.id)
      ? "source"
      : "target";

    if (activeContainer === overContainer) {
      // Moving within the same container
      if (active.id !== over.id) {
        if (activeContainer === "source") {
          setSourceItems((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
          });
        } else {
          setTargetItems((items) => {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }
    } else {
      // Moving between containers
      if (activeContainer === "source") {
        const item = sourceItems.find((item) => item.id === active.id);
        if (item) {
          setSourceItems((items) => items.filter((i) => i.id !== active.id));
          setTargetItems((items) => [...items, item]);
        }
      } else {
        const item = targetItems.find((item) => item.id === active.id);
        if (item) {
          setTargetItems((items) => items.filter((i) => i.id !== active.id));
          setSourceItems((items) => [...items, item]);
        }
      }
    }
  };

  const addNewItem = () => {
    const newId = (sourceItems.length + targetItems.length + 1).toString();
    setSourceItems([...sourceItems, { id: newId, content: `Item ${newId}` }]);
  };

  return (
    <div className="flex gap-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Source Items</CardTitle>
        </CardHeader>
        <CardContent>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sourceItems}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {sourceItems.map((item) => (
                  <SortableItem key={item.id} id={item.id}>
                    <Card className="w-full">
                      <CardContent className="p-4">{item.content}</CardContent>
                    </Card>
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <Button onClick={addNewItem} className="mt-4 w-full">
            Add New Item
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full min-w-md">
        <CardHeader>
          <CardTitle>Target Area</CardTitle>
        </CardHeader>
        <CardContent>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={targetItems}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {targetItems.map((item) => (
                  <SortableItem key={item.id} id={item.id}>
                    <Card className="w-full">
                      <CardContent className="p-4">{item.content}</CardContent>
                    </Card>
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>
    </div>
  );
}
