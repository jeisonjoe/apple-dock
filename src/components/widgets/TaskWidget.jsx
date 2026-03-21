import { CheckCircle2, Circle } from "lucide-react";

const tasks = [
  { id: 1, text: "Buy groceries", done: true },
  { id: 2, text: "Call mom", done: false },
  { id: 3, text: "Finish React project", done: false },
  { id: 4, text: "Review PR #4521", done: false },
  { id: 5, text: "Walk the dog", done: true },
];

export default function TaskWidget() {
  return (
    <div className="w-full h-full p-8 flex flex-col text-white select-none pointer-events-none">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-4xl font-bold tracking-tight text-[#ffaa00]">Reminders</h2>
        <span className="ml-auto text-2xl font-bold bg-[#ffaa00]/20 text-[#ffaa00] px-4 py-1.5 rounded-full">
          {tasks.filter(t => !t.done).length}
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-5 justify-center overflow-hidden">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-5">
            {task.done ? (
              <CheckCircle2 className="w-10 h-10 text-[#ffaa00]" />
            ) : (
              <Circle className="w-10 h-10 text-white/30" />
            )}
            <span
              className={`text-3xl font-medium tracking-wide flex-1 truncate ${
                task.done ? "line-through text-white/30" : "text-white/90"
              }`}
            >
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
