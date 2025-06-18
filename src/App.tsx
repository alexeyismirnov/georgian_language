import { Toaster } from "sonner";
import { GeorgianLearningApp } from "./components/GeorgianLearningApp";
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import { ReactPlugin } from '@stagewise-plugins/react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Stagewise toolbar only in development */}
      {import.meta.env.DEV && (
        <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      )}
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <GeorgianLearningApp />
        </div>
      </main>
      <Toaster />
    </div>
  );
}