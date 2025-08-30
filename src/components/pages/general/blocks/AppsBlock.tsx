"use client";
"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ChartRadialStacked } from "../components/chart/chart-radial-stacked";
import { ChartTooltipDefault } from "../components/chart/chart-tooltip-default";
import { ChartBarHorizontal } from "../components/chart/hart-bar-horizontal";
import { LoginForm } from "../components/auth/login-form";
import MainWindow from "../components/window/MainWindow";
import WorkWindow from "../components/window/work/WorkWindow";
import { Globe } from "@/components/magicui/globe";
import { COBEOptions } from "cobe";

const GLOBE_CONFIG: COBEOptions = {
  width: 100,
  height: 100,
  onRender: () => { },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export default function AppsBlock() {
  return (
    <div className="relative flex flex-col w-screen h-min-screen h-[300vh] max-w-[300%] items-center justify-center px-8/10">
      <ResizablePanelGroup
        direction="vertical"
        className="flex rounded-none border max-w-8/10 border-dashed overflow-y-visible"
      >
        <ResizablePanel defaultSize={5} minSize={5} maxSize={5} className="flex items-center justify-center w-full h-full bg-white/5">
          <div className="flex h-[200px] items-center justify-center p-6">
            <h1 className="text-6xl  font-bold font-stretch-125%">Не терпиться попробовать?</h1>
          </div>
        </ResizablePanel>
        <ResizableHandle className="border-dashed bg-transparent border" />
        <ResizablePanel defaultSize={12} minSize={12} maxSize={12}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={33} minSize={23} className="flex items-center justify-center w-full h-full cursor-target">
              <ChartRadialStacked
                header={{
                  title: "Статистика",
                  description: "Количество активных посетителей",
                }}
                chartData={[{
                  month: "Август",
                  desktop: 160,
                  brouser: 100,
                  mobile: 570,
                }]}
                chartConfig={{
                  desktop: {
                    label: "Десктопное приложение",
                    color: "#0c5bed",
                  },
                  mobile: {
                    label: "Мобильное прилжение",
                    color: "#e61e67",
                  },
                  brouser: {
                    label: "Браузерное приложение",
                    color: "#e67e1e",
                  },
                }}
                fields={["desktop", "mobile", "brouser"]}
                visitors="Всего посетителей"
              />
            </ResizablePanel>
            <ResizableHandle className="border-dashed bg-transparent border" />
            <ResizablePanel defaultSize={33} minSize={23} className="flex items-center justify-center w-full h-full cursor-target">
              <ChartBarHorizontal
                header={{
                  title: "Оценки пользователей",
                  description: "Распределение оценок пользователей по приложениям",
                }}
                chartData={
                  [
                    { stars: "★★★★★", count: 186, xd: 100 },
                    { stars: "★★★★", count: 305, xd: 150 },
                    { stars: "★★★", count: 237, xd: 200 },
                    { stars: "★★", count: 73, xd: 300 },
                    { stars: "★", count: 209 },
                  ]
                }
                chartConfig={
                  {
                    count: {
                      label: "Количество оценок",
                      color: "#0c5bed",
                    }
                  }
                }
                detalicField="count"
                lableField="stars"

              />
            </ResizablePanel>
            <ResizableHandle className="border-dashed bg-transparent border" />
            <ResizablePanel defaultSize={33} minSize={23} className="flex items-center justify-center w-full h-full cursor-target">
              <ChartTooltipDefault
                chartConfig={
                  {
                    active: {
                      label: "Активные пользователи",
                      color: "#0c5bed",
                    },
                    all: {
                      label: "Все пользователи",
                      color: "#6598f7",
                    },
                  }
                }
                generalField="all"
                chartData={
                  [
                    { date: "2024-07-13", all: 1450, active: 300 },
                    { date: "2024-07-16", all: 1450, active: 420 },
                    { date: "2024-07-17", all: 1450, active: 120 },
                    { date: "2024-07-18", all: 1450, active: 550 },
                    { date: "2024-07-19", all: 1450, active: 350 },
                    { date: "2024-07-20", all: 1450, active: 400 },
                  ]
                }
                header={{
                  title: "Активные пользователи",
                  description: "Количество активных пользователей за неделю",
                }}
              />
            </ResizablePanel>
            <ResizableHandle />
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle className="border-dashed bg-transparent border" />
        <ResizablePanel defaultSize={23} minSize={23} maxSize={23}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={33.3} maxSize={33.3} minSize={33.3} className="flex items-center justify-center w-full h-full ">
              <LoginForm className="p-0 container border-0" />
            </ResizablePanel>
            <ResizableHandle className="border-dashed bg-transparent border" />
            <ResizablePanel className="flex items-center justify-center w-full h-full ">
              <MainWindow />
            </ResizablePanel>
            <ResizableHandle />
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle className="border-dashed bg-transparent border" />
        <ResizablePanel defaultSize={23} minSize={23} maxSize={23}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={70} maxSize={70} minSize={70} className="flex items-center justify-center w-full h-full ">
              <WorkWindow />
            </ResizablePanel>
            <ResizableHandle className="border-dashed bg-transparent border" />
            <ResizablePanel className="overflow-y-visible">
              <ResizablePanelGroup direction="vertical" className=" overflow-y-visible">
                <ResizablePanel defaultSize={30} maxSize={30} minSize={30} className="flex items-end justify-start w-full h-full p-2 flex-col overflow-y-visible">
                  <div className="relative flex size-full max-w-lg items-center justify-center rounded-lg bg-background px-40 pb-40 pt-8 md:pb-60 overflow-y-visible" >
                    <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                      Speaker
                    </span>
                    <Globe className="top-3 p-5 overflow-y-visible" config={GLOBE_CONFIG} />
                    <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
                  </div>
                </ResizablePanel>
                <ResizableHandle className="border-dashed bg-transparent border" />
                <ResizablePanel defaultSize={60} className="flex items-center justify-center w-full h-full ">
                </ResizablePanel>
                <ResizableHandle className="border-dashed bg-transparent border" />
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle />
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle className="border-dashed bg-transparent border" />
        <ResizablePanel defaultSize={10} className="flex items-center justify-center w-full">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={33.3} maxSize={33.3} minSize={33.3} className="flex items-center justify-center w-full h-full ">
              <h1 className="text-6xl  font-bold font-stretch-125%">Не терпиться попробовать?</h1>
            </ResizablePanel>
            <ResizableHandle className="border-dashed bg-transparent border" />
            <ResizablePanel defaultSize={75} className="flex items-center justify-center w-full h-full ">
              <h1 className="text-6xl  font-bold font-stretch-125%">Не терпиться попробовать?</h1>
            </ResizablePanel>
            <ResizableHandle />
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}