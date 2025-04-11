"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Column } from "@/models/column_model";
import { analyzeKanbanAction } from "@/lib/actions/gemini";

interface KanbanAnalyzerProps {
  columns: Column[];
  onResponse: (response: string) => void;
  useCase: string;
}

export function KanbanAnalyzer({ columns, onResponse, useCase }: KanbanAnalyzerProps) {
  const [analysis, setAnalysis] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysis("");

    try {
      const result = await analyzeKanbanAction(columns, useCase);
      if (result.error) {
        console.error("Error during analysis:", result.error);
        setAnalysis("Error analyzing the Kanban board. Please try again.");
        return;
      }

      const response = result.response || "";
      setAnalysis(response);
      onResponse(response);
    } catch (error) {
      console.error("Error during analysis:", error);
      setAnalysis("Error analyzing the Kanban board. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleAnalyze} disabled={isLoading}>
        {isLoading ? "Analyzing..." : "Analyze Board"}
      </Button>

      {analysis && (
        <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
          {analysis}
        </div>
      )}
    </div>
  );
}
