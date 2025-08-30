"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { number } from "motion/react"

export const description = "A radial chart with text"

interface ChartRadialTextProps {
  header?: {
    title: string
    description?: string
  },
  footer?: {
    title: string
    description?: string
  }
  chartData: object[]
  chartConfig: ChartConfig,
  // fields: string[]
}

export function ChartRadialText({ header, footer, chartConfig, chartData }: ChartRadialTextProps) {
  return (
    <Card className="flex flex-col w-full h-full rounded-none bg-transparent gap-4">
      {header && (
        <CardHeader className="flex-col items-start">
          <CardTitle className="text-2xl font-bold text-white">{header.title}</CardTitle>
          {header.description && (
            <CardDescription className="text-sm text-white/90">
              {header.description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />

            {chartData.map((item, index) => (
              <RadialBar
                key={`radial-bar-${index}`}
                dataKey={Object.keys(item)[0]}
                cornerRadius={10 + index * 2}
                animationEasing="ease"
              />
            ))}
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData.reduce((sum, item) => {
                            return sum + Object.values(item).reduce((a, b) => typeof b == "number" ? a + b : a, 0)
                          }, 0).toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {chartConfig.visitors.label}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      {footer && (
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            {footer.title} <TrendingUp className="h-4 w-4" />
          </div>
          {footer.description && (
            <div className="text-muted-foreground leading-none">
              {footer.description}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
