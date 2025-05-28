"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Trash2, FileText } from "lucide-react";
import { Task } from "@/models/task_model";
import { Column } from "@/models/column_model";

interface SessionData {
  id: string;
  name: string;
  date: string;
  columns: {
    usecase1: Column[];
    usecase2: Column[];
    usecase3: Column[];
  };
}

interface UploadedSession {
  id: string;
  name: string;
  data: SessionData;
  enabled: boolean;
}

interface SessionOccurrence {
  sessionName: string;
  columnType: "essential" | "semi-important" | "other";
}

interface TaskAnalysis {
  id: string;
  title: string;
  description: string;
  step: string;
  totalImportanceScore: number;
  occurrences: number;
  sessionOccurrences: SessionOccurrence[];
}

interface UseCaseAnalysis {
  useCase: string;
  tasks: TaskAnalysis[];
  totalTasks: number;
  averageImportance: string;
  highImportanceTasks: number;
}

export function SessionAnalytics() {
  const [uploadedSessions, setUploadedSessions] = useState<UploadedSession[]>(
    []
  );
  const [analysis, setAnalysis] = useState<UseCaseAnalysis[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateImportanceScore = (task: Task, columnId: string): number => {
    let score = 0;

    // Essential column (Auditiv) = 4 points
    if (columnId === "essential") {
      score += 4;
    }

    // Semi-important column (Visuell) = 1 point
    if (columnId === "semi-important") {
      score += 1;
    }

    // isAuditivVisible = +1 point
    if (task.isAuditivVisible) {
      score += 1;
    }

    return score;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const sessionData = JSON.parse(
            e.target?.result as string
          ) as SessionData;
          const newSession: UploadedSession = {
            id: sessionData.id || Date.now().toString(),
            name: sessionData.name || file.name.replace(".json", ""),
            data: sessionData,
            enabled: true,
          };

          setUploadedSessions((prev) => {
            // Check if session already exists
            const exists = prev.find((s) => s.id === newSession.id);
            if (exists) {
              return prev.map((s) => (s.id === newSession.id ? newSession : s));
            }
            return [...prev, newSession];
          });
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert(`Error parsing ${file.name}: Invalid JSON format`);
        }
      };
      reader.readAsText(file);
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleSession = (sessionId: string) => {
    setUploadedSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? { ...session, enabled: !session.enabled }
          : session
      )
    );
  };

  const removeSession = (sessionId: string) => {
    setUploadedSessions((prev) =>
      prev.filter((session) => session.id !== sessionId)
    );
  };

  const generateAnalysis = () => {
    const enabledSessions = uploadedSessions.filter(
      (session) => session.enabled
    );
    if (enabledSessions.length === 0) {
      setAnalysis([]);
      return;
    }

    const useCaseAnalysis: UseCaseAnalysis[] = [];

    // Process each use case separately
    const useCases = [
      { key: "usecase1", name: "Low Latency" },
      { key: "usecase2", name: "High Latency" },
      { key: "usecase3", name: "High Latency (Ambiguous)" },
    ];

    useCases.forEach(({ key, name }) => {
      const taskMap = new Map<string, TaskAnalysis>();

      enabledSessions.forEach((session) => {
        const columns =
          session.data.columns[key as keyof typeof session.data.columns];

        columns.forEach((column) => {
          column.tasks.forEach((task) => {
            const taskKey = `${task.title}-${task.step}`;
            const importanceScore = calculateImportanceScore(task, column.id);

            // Determine column type for session occurrence tracking
            const columnType: "essential" | "semi-important" | "other" =
              column.id === "essential"
                ? "essential"
                : column.id === "semi-important"
                ? "semi-important"
                : "other";

            if (taskMap.has(taskKey)) {
              const existing = taskMap.get(taskKey)!;
              existing.totalImportanceScore += importanceScore;

              // Only count occurrences for essential and semi-important columns
              if (
                columnType === "essential" ||
                columnType === "semi-important"
              ) {
                existing.occurrences += 1;
              }

              // Add session occurrence if not already present
              const existingSessionOccurrence =
                existing.sessionOccurrences.find(
                  (so) => so.sessionName === session.name
                );
              if (!existingSessionOccurrence) {
                existing.sessionOccurrences.push({
                  sessionName: session.name,
                  columnType,
                });
              } else {
                // Update to higher priority column type if needed
                if (
                  columnType === "essential" ||
                  (columnType === "semi-important" &&
                    existingSessionOccurrence.columnType === "other")
                ) {
                  existingSessionOccurrence.columnType = columnType;
                }
              }
            } else {
              taskMap.set(taskKey, {
                id: task.id,
                title: task.title,
                description: task.description,
                step: task.step,
                totalImportanceScore: importanceScore,
                occurrences:
                  columnType === "essential" || columnType === "semi-important"
                    ? 1
                    : 0,
                sessionOccurrences: [
                  {
                    sessionName: session.name,
                    columnType,
                  },
                ],
              });
            }
          });
        });
      });

      const tasks = Array.from(taskMap.values()).sort((a, b) => {
        // Sort by total importance score first, then by occurrences
        if (b.totalImportanceScore !== a.totalImportanceScore) {
          return b.totalImportanceScore - a.totalImportanceScore;
        }
        return b.occurrences - a.occurrences;
      });

      const totalTasks = tasks.length;
      const averageImportance =
        totalTasks > 0
          ? (
              tasks.reduce((sum, task) => sum + task.totalImportanceScore, 0) /
              totalTasks
            ).toFixed(2)
          : "0";
      const highImportanceTasks = tasks.filter(
        (task) => task.totalImportanceScore >= 4
      ).length;

      useCaseAnalysis.push({
        useCase: name,
        tasks,
        totalTasks,
        averageImportance,
        highImportanceTasks,
      });
    });

    setAnalysis(useCaseAnalysis);
  };

  const getImportanceColor = (score: number) => {
    if (score > 15) return "bg-blue-500";
    if (score > 10) return "bg-green-500";
    if (score >= 5) return "bg-amber-500";
    return "bg-red-500";
  };

  const getSessionBadgeColor = (
    columnType: "essential" | "semi-important" | "other"
  ) => {
    switch (columnType) {
      case "essential":
        return "bg-green-500 text-white";
      case "semi-important":
        return "bg-amber-500 text-white";
      case "other":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Input
              ref={fileInputRef}
              type="file"
              accept=".json"
              multiple
              onChange={handleFileUpload}
              className="flex-1"
            />
            <Button onClick={() => fileInputRef.current?.click()}>
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sessions Management */}
      {uploadedSessions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Uploaded Sessions ({uploadedSessions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {uploadedSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={session.enabled}
                      onCheckedChange={() => toggleSession(session.id)}
                    />
                    <div>
                      <div className="font-medium">{session.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ID: {session.id} | Date:{" "}
                        {new Date(session.data.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeSession(session.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button onClick={generateAnalysis} className="w-full">
                Generate Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysis.length > 0 && (
        <Tabs defaultValue="usecase1" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usecase1">Low Latency</TabsTrigger>
            <TabsTrigger value="usecase2">High Latency</TabsTrigger>
            <TabsTrigger value="usecase3">High Latency (Ambiguous)</TabsTrigger>
          </TabsList>

          {analysis.map((useCaseData, index) => (
            <TabsContent key={index} value={`usecase${index + 1}`}>
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {useCaseData.totalTasks}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Importance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {useCaseData.averageImportance}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      High Importance Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {useCaseData.highImportanceTasks}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Score ≥ 4
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Task Analysis - {useCaseData.useCase}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {useCaseData.tasks.map((task, taskIndex) => (
                      <div
                        key={`${task.id}-${taskIndex}`}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold">{task.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {task.description}
                            </p>
                          </div>
                          <Badge
                            className={`${getImportanceColor(
                              task.totalImportanceScore
                            )} text-white`}
                          >
                            Score: {task.totalImportanceScore}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Step:</span>{" "}
                            {task.step}
                          </div>
                          <div>
                            <span className="font-medium">Occurrences:</span>{" "}
                            {task.occurrences}
                          </div>
                          <div>
                            <span className="font-medium">Avg Score:</span>{" "}
                            {task.occurrences > 0
                              ? (
                                  task.totalImportanceScore / task.occurrences
                                ).toFixed(1)
                              : "N/A"}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="font-medium text-sm">Sessions:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {task.sessionOccurrences.map(
                              (sessionOccurrence) => (
                                <Badge
                                  key={sessionOccurrence.sessionName}
                                  className={`text-xs ${getSessionBadgeColor(
                                    sessionOccurrence.columnType
                                  )}`}
                                >
                                  {sessionOccurrence.sessionName}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
