import { Toaster } from "sonner";
import { GeorgianLearningApp } from "./components/GeorgianLearningApp";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm h-16 flex justify-between items-center border-b shadow-sm px-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🇬🇪</div>
          <h2 className="text-xl font-semibold text-gray-800">Learn Georgian</h2>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <GeorgianLearningApp />
        </div>
      </main>
      <Toaster />
    </div>
  );
}