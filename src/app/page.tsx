import VoiceWaveCard from "@/components/graph/ForceGraphSection";
import ProductFeaturesBlock from "./ProductFeaturesBlock";
import AnimatedCard from "./AnimatedCard";
import RotatingHero from "./RotatingHero";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-[#080f1a] ">
      <header>

      </header>
      <main className="relative min-h-screen w-screen overflow-hidden flex flex-col items-center justify-center ">
        {/* Градиентный слой */}
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 30%, #372fac60 20%, bg-[#03033120] 70%)',
            opacity: 0.55,
            mixBlendMode: 'screen',
          }}
        />
        {/* Сетка */}
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `
        linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
      `,
            backgroundSize: '48px 48px',
            opacity: 0.35,
            transform: 'rotate(-0deg)',
          }}
        />
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute right-[-120px] top-[-120px] w-2/5 h-[300px] bg-indigo-500 opacity-40 blur-3xl rounded-full" />
        </div>

        {/* Контент */}
        <div className="flex w-screen h-screen flex-row items-center justify-center gap-3">

          <div className="w-1/2 flex items-center justify-center flex-col h-full text-white gap-2">
            <VoiceWaveCard />
          </div>
          <AnimatedCard />
        </div>
        <RotatingHero />
        <ProductFeaturesBlock />
        <div className="flex w-screen h-screen"></div>
      </main>


      <footer>
      </footer>
    </div >
  );
}
