"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radial chart with stacked sections";

interface ChartRadialStackedProps {
  header?: {
    title?: string
    description?: string
  }
  footer?: {
    title?: string
    description?: string
  }
  chartData: Record<string, unknown>[]
  chartConfig: ChartConfig
  fields: string[]
  visitors?: string
}

export function ChartRadialStacked({
  header,
  footer,
  chartConfig,
  chartData,
  fields,
  visitors,
}: ChartRadialStackedProps) {
  const totalVisitors = fields.reduce((acc, field) => {
    const value = chartData.reduce((sum, item) => {
      const item_I = item[field];
      return sum + (typeof item_I == "number" ? item_I : 0);
    }, 0);
    return acc + value;
  }, 0);

  return (
    <Card className="flex flex-col w-full h-full rounded-none bg-transparent gap-4 border-0">
      {header && (
        <CardHeader className="flex-col items-start">
          <CardTitle className="text-2xl font-bold">{header.title}</CardTitle>
          {header.description && (
            <CardDescription className="text-sm text-[var(--foreground)]/90">
              {header.description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                className=""
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        className=""
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-[var(--foreground)] text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-[var(--foreground)]"
                        >
                          {visitors ?? "Всего"}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            {fields.map((field) => {
              const fieldConfig = chartConfig[field];
              return (
                <RadialBar
                  key={field}
                  dataKey={field}
                  stackId="a"
                  fill={fieldConfig.color || "var(--color-default)"}
                  cornerRadius={5}
                  className="stroke-transparent stroke-2"
                />
              );
            })}
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {footer && (
        <CardFooter className="flex-col items-start">
          <CardTitle className="text-lg font-semibold text-white">
            {footer.title}
          </CardTitle>
          {footer.description && (
            <CardDescription className="text-sm text-muted-foreground text-[var(--foreground)]/90">
              {footer.description}
            </CardDescription>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
