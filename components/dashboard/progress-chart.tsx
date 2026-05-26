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
      <Card className="h-full shadow-sm border-border/50 bg-card">
        <CardContent className="flex flex-col items-center justify-center h-full min-h-[250px] space-y-3 text-center bg-muted/20 rounded-lg border border-dashed border-border/50 m-4">
          <div className="text-4xl">📊</div>
          <p className="text-sm text-muted-foreground font-medium">Create tasks to see your progress</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full shadow-sm border-border/50 bg-card">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">Progress</h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                formatter={(value) => <span className="text-sm font-medium text-foreground ml-1">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}