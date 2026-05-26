"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: Date | string | null;
}

interface KanbanBoardProps {
  tasks: Task[];
  onStatusChange: (taskId: string, status: string) => void;
}

const COLUMNS = [
  { id: "todo", title: "To Do", color: "border-slate-500/30 bg-slate-500/5" },
  { id: "in-progress", title: "In Progress", color: "border-blue-500/30 bg-blue-500/5" },
  { id: "completed", title: "Completed", color: "border-green-500/30 bg-green-500/5" },
];

const PRIORITY_COLORS: Record<string, string> = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

export function KanbanBoard({ tasks, onStatusChange }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveId(e.active.id as string)}
      onDragEnd={(e) => {
        const { active, over } = e;
        setActiveId(null);
        if (!over) return;

        const taskId = active.id as string;
        const overId = over.id as string;

        const column = COLUMNS.find((c) => c.id === overId);
        if (column) {
          onStatusChange(taskId, column.id);
          return;
        }

        const overTask = tasks.find((t) => t.id === overId);
        if (overTask) {
          onStatusChange(taskId, overTask.status);
        }
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            id={col.id}
            title={col.title}
            color={col.color}
            tasks={tasks.filter((t) => t.status === col.id)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && (
          <div className="bg-card rounded-lg p-3 shadow-xl border border-primary/50 opacity-95 rotate-[3deg] scale-105">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${PRIORITY_COLORS[activeTask.priority]} animate-pulse`} />
              <span className="text-sm font-medium">{activeTask.title}</span>
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

function Column({
  id,
  title,
  color,
  tasks,
}: {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl border-2 p-4 transition-all duration-200 ${color} ${
        isOver ? "ring-2 ring-primary scale-[1.02] shadow-lg" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${id === "todo" ? "bg-slate-500" : id === "in-progress" ? "bg-blue-500" : "bg-green-500"}`} />
          {title}
        </h3>
        <span className="text-xs bg-background/80 px-2 py-0.5 rounded-full font-medium border">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3 min-h-[200px]">
        {tasks.map((task) => (
          <DraggableCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className={`text-center text-muted-foreground py-8 text-xs border-2 border-dashed rounded-lg transition-colors ${
            isOver ? "border-primary/50 bg-primary/5" : "border-muted-foreground/20"
          }`}>
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}

function DraggableCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-card rounded-lg p-3 shadow-sm border hover:shadow-md hover:border-primary/20 transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-30 ring-2 ring-primary/30" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${PRIORITY_COLORS[task.priority]} shrink-0`} />
        <span className="text-sm font-medium">{task.title}</span>
      </div>
      {task.description && (
        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{task.description}</p>
      )}
    </div>
  );
}
