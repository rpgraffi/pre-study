import { SessionAnalytics } from "@/components/session-analytics";

export default function AnalyticsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">Session Analytics Dashboard</h1>
        <SessionAnalytics />
      </div>
    </main>
  );
}
