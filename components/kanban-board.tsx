"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/models/task_model";
import { Steps } from "@/models/steps_model";
import { Column } from "@/models/column_model";
import { Loader2 } from "lucide-react";
import { KanbanAnalyzer } from "./kanban-analyzer";
import { generateSpeechAction } from "@/lib/actions/tts";
import { TaskCard } from "./task-card";
import { Separator } from "@/components/ui/separator";

interface KanbanBoardProps {
  initialTasks: Task[];
  useCaseId: string;
  steps: Steps[];
}

export function KanbanBoard({
  initialTasks,
  useCaseId,
  steps,
}: KanbanBoardProps) {
  const [columns, setColumns] = useState<Column[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGeneratingSpeech, setIsGeneratingSpeech] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [geminiResponse, setGeminiResponse] = useState<string>("");

  const initialColumns = useMemo(
    () => [
      {
        id: "building-blocks",
        title: "Bausteine",
        tasks: initialTasks,
        colorClass: "bg-gray-100",
      },
      {
        id: "essential",
        title: "Auditiv",
        tasks: [],
        colorClass: "bg-blue-50",
      },
      {
        id: "semi-important",
        title: "Visuell",
        tasks: [],
        colorClass: "bg-green-50",
      },
      {
        id: "unnecessary",
        title: "On Demand",
        tasks: [],
        colorClass: "bg-red-50",
      },
    ],
    [initialTasks]
  );

  useEffect(() => {
    const loadSavedState = () => {
      const savedState = localStorage.getItem(`kanban-${useCaseId}`);
      if (savedState) {
        return JSON.parse(savedState);
      }
      return initialColumns;
    };

    setColumns(loadSavedState());
  }, [initialTasks, useCaseId, initialColumns]);

  useEffect(() => {
    if (columns.length > 0) {
      localStorage.setItem(`kanban-${useCaseId}`, JSON.stringify(columns));
    }
  }, [columns, useCaseId]);

  const resetBoard = () => {
    setColumns(initialColumns);
    localStorage.removeItem(`kanban-${useCaseId}`);
  };

  const onDragEnd = (result: DropResult) => {
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

  const toggleAuditivVisibility = (taskId: string, value: boolean) => {
    setColumns(
      columns.map((col) => {
        if (col.id === "essential") {
          return {
            ...col,
            tasks: col.tasks.map((task) =>
              task.id === taskId ? { ...task, isAuditivVisible: value } : task
            ),
          };
        }
        return col;
      })
    );
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      step: "building-blocks",
    };

    setColumns(
      columns.map((col) =>
        col.id === "building-blocks"
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );

    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const handleSpeech = async () => {
    if (!geminiResponse) return;
    try {
      setIsGeneratingSpeech(true);
      const result = await generateSpeechAction(geminiResponse);
      if (result.error) {
        console.error("Speech generation failed:", result.error);
        return;
      }
      setAudioUrl(result.audioUrl || null);

      if (audioRef.current) {
        audioRef.current.load();
      }
    } catch (error) {
      console.error("Error generating speech:", error);
    } finally {
      setIsGeneratingSpeech(false);
    }
  };

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="pb-8">
      <div className="flex flex-col gap-2 mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full ${step.color} text-white`}
            >
              <span className="text-sm font-medium">{index + 1}</span>
            </div>
            <div className="text-sm">{step.title}</div>
            {index < steps.length - 1 && (
              <div className="absolute left-[1.25rem] top-[2.5rem] w-[1px] h-6 bg-gray-300" />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-12">
        <Input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new task..."
          className="max-w-sm"
        />
        <Input
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Enter new task description..."
          className="max-w-sm"
        />
        <Button variant="secondary" onClick={addTask}>
          Add Task
        </Button>

        <div className="flex-1 min-w-12"></div>

        <Button
          variant="secondary"
          className="hover:bg-red-200 hover:text-red-800"
          onClick={resetBoard}
        >
          Reset Board
        </Button>
      </div>

      <div className="mb-4">
        <KanbanAnalyzer
          columns={columns}
          onResponse={(response) => setGeminiResponse(response)}
          useCase={useCaseId}
        />
        {geminiResponse && (
          <div className="mt-4 flex items-center gap-2">
            <Button
              onClick={handleSpeech}
              variant="outline"
              disabled={isGeneratingSpeech}
            >
              {isGeneratingSpeech ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Generate Speech"
              )}
            </Button>
            {audioUrl && (
              <div className="flex items-center gap-2">
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                />
                <Button
                  onClick={handlePlay}
                  disabled={isPlaying}
                  variant="outline"
                  size="sm"
                >
                  Play
                </Button>
                <Button
                  onClick={handleStop}
                  disabled={!isPlaying}
                  variant="outline"
                  size="sm"
                >
                  Stop
                </Button>
                <Button onClick={handleReplay} variant="outline" size="sm">
                  Replay
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-4 gap-2">
          {columns.map((column) => (
            <Card
              key={column.id}
              className={`min-h-[500px] min-w-[300px] gap-4 py-4 ${column.colorClass}`}
            >
              <CardHeader className="px-6 gap-0">
                <CardTitle>{column.title}</CardTitle>
              </CardHeader>

              <Separator />

              <Droppable droppableId={column.id}>
                {(provided) => (
                  <CardContent
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-1 px-4 h-[calc(100%-4rem)]"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <TaskCard
                            task={task}
                            dragHandleProps={provided.dragHandleProps}
                            draggableProps={provided.draggableProps}
                            innerRef={provided.innerRef}
                            column={column.id}
                            onToggleAuditive={toggleAuditivVisibility}
                          />
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
