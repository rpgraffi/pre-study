"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/models/task_model";

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface KanbanBoardProps {
  initialTasks: Task[];
}

export function KanbanBoard({ initialTasks }: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "building-blocks",
      title: "Building Blocks",
      tasks: initialTasks,
    },
    {
      id: "essential",
      title: "Essential",
      tasks: [],
    },
    {
      id: "semi-important",
      title: "Semi Important",
      tasks: [],
    },
    {
      id: "unnecessary",
      title: "Unnecessary",
      tasks: [],
    },
  ]);

  const [newTaskContent, setNewTaskContent] = useState("");

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const column = columns.find((col) => col.id === source.droppableId);
      if (!column) return;

      const newTasks = Array.from(column.tasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      setColumns(
        columns.map((col) =>
          col.id === source.droppableId ? { ...col, tasks: newTasks } : col
        )
      );
    } else {
      // Moving between columns
      const sourceColumn = columns.find((col) => col.id === source.droppableId);
      const destColumn = columns.find(
        (col) => col.id === destination.droppableId
      );

      if (!sourceColumn || !destColumn) return;

      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);

      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      setColumns(
        columns.map((col) => {
          if (col.id === source.droppableId) {
            return { ...col, tasks: sourceTasks };
          }
          if (col.id === destination.droppableId) {
            return { ...col, tasks: destTasks };
          }
          return col;
        })
      );
    }
  };

  const addTask = () => {
    if (!newTaskContent.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskContent,
      description: "",
      step: "building-blocks",
    };

    setColumns(
      columns.map((col) =>
        col.id === "building-blocks"
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );

    setNewTaskContent("");
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <Input
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          placeholder="Enter new task..."
          className="max-w-sm"
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {columns.map((column) => (
            <Card key={column.id} className="min-h-[500px] min-w-[300px]">
              <CardHeader>
                <CardTitle>{column.title}</CardTitle>
              </CardHeader>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <CardContent
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-1 h-[calc(100%-4rem)]"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2"
                          >
                            <CardContent>
                              <span className="font-bold">{task.title}</span>
                              <br />
                              <span className="text-gray-500">
                                {task.description}
                              </span>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </CardContent>
                )}
              </Droppable>
            </Card>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
