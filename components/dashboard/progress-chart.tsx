"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface ProgressChartProps {
  todo: number;
  inProgress: number;
  completed: number;
}

const COLORS = {
  todo: "#64748b",
  inProgress: "#eab308",
  completed: "#22c55e",
};

export function ProgressChart({ todo, inProgress, completed }: ProgressChartProps) {
  const data = [
    { name: "To Do", value: todo, color: COLORS.todo },
    { name: "In Progress", value: inProgress, color: COLORS.inProgress },
    { name: "Completed", value: completed, color: COLORS.completed },
  ].filter((item) => item.value > 0);

  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No tasks yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Progress</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}