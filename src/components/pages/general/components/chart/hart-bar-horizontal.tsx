"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A horizontal bar chart"

interface ChartBarHorizontalProps {
  className?: string
  header?: {
    title: string
    description?: string
  },
  footer?: {
    title: string
    description?: string
  },
  chartConfig: ChartConfig,
  chartData: Array<Record<string, number | string>>
  lableField: string
  detalicField: string
}

export function ChartBarHorizontal({ header, footer, chartConfig, chartData, lableField, detalicField }: ChartBarHorizontalProps) {
  return (
    <div className="container mx-auto">
      <Card className="bg-transparent border-0 gap-2">
        {header && (
          <CardHeader className="w-full ">
            <CardTitle className="text-2xl font-bold">{header.title}</CardTitle>
            {header.description && (
              <CardDescription className="text-[var(--foreground)]/90">{header.description}</CardDescription>
            )}
          </CardHeader>
        )}
        <CardContent className="w-full">
          <ChartContainer config={chartConfig} className="bg-transparent">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 15,
              }}
              className="bg-transparent"
            >
              <XAxis type="number" dataKey={detalicField} hide />
              <YAxis
                dataKey={lableField}
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 10)}
                className="text-[var(--foreground)]/90 fill-[var(--foreground)]"
                color="#ffffff"
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              {Object.entries(chartConfig).map(([key, config]) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="a"
                  fill={config.color}
                  radius={10}
                  className="rounded-2xl shadow-2xl"
                />
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
        {footer && (
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              {footer.title} <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              {footer.description}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
