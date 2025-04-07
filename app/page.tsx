import { MultiKanban } from "@/components/multi-kanban";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Kanban Boards</h1>
        <MultiKanban />
      </div>
    </main>
  );
}
