"use client"

import { Bar, BarChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = "A stacked bar chart with a legend"
export const iframeHeight = "600px"
export const containerClassName =
  "[&>div]:w-full [&>div]:max-w-md flex items-center justify-center min-h-svh"

interface ChartTooltipAdvancedProps {
  className?: string
  header?: {
    title: string
    description?: string
  },
  chartConfig: ChartConfig,
  chartData: Array<Record<string, number | string>>
  generalField: string
}

export function ChartTooltipDefault({ header, chartConfig, chartData, generalField }: ChartTooltipAdvancedProps) {
  return (
    <div className="container mx-auto">
      <Card className="bg-transparent border-0">
        {header && (
          <CardHeader className="">
            <CardTitle className="text-2xl font-bold">{header.title}</CardTitle>
            {header.description && (
              <CardDescription className="text-[var(--foreground)]/90">
                {header.description}
              </CardDescription>
            )}
          </CardHeader>
        )}
        <CardContent className="bg-transparent">
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    weekday: "short",
                  })
                }}
              />
              {Object.entries(chartConfig).map(([key, config]) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="a"
                  fill={config.color}
                  radius={generalField !== key ? [0, 0, 10, 10] : [10, 10, 0, 0]}
                  className="rounded-2xl shadow-2xl"
                />
              ))}
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} defaultIndex={1} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
