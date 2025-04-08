"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { analyzeKanbanBoard } from "@/lib/gemini-service";
import { Column } from "@/lib/gemini-service";

interface KanbanAnalyzerProps {
  columns: Column[];
  onResponse: (response: string) => void;
}

export function KanbanAnalyzer({ columns, onResponse }: KanbanAnalyzerProps) {
  const [analysis, setAnalysis] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysis("");

    try {
      const result = await analyzeKanbanBoard(columns);
      let fullResponse = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;
        setAnalysis(fullResponse);
        onResponse(fullResponse);
      }
    } catch (error) {
      console.error("Error during analysis:", error);
      setAnalysis("Error analyzing the Kanban board. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
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
