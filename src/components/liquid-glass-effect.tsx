import { cn } from "@/lib/utils";

export default function LiquidGlassEffect({ className, borders = true, rounded }: { className?: string, rounded?: string, borders?: boolean | "x" | "y" }) {
  return <div
    className={cn("absolute w-full h-full m-0 p-0 left-0 top-0 glass", className)}
    style={{ filter: "url(#liquidDistortion)" }}
  >
    {/* "liquid highlights" */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -inset-1 bg-gradient-to-tr from-white/20 to-transparent opacity-20 blur-2xl" />
    </div>

    {
      <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", rounded)}>
        {/* верхний светлый край */}
        {borders == "y" || borders == true && <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />}
        {/* нижний тёмный край */}
        {borders == "y" || borders == true && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/20 to-transparent" />}
        {/* левый блик */}
        {borders == "x" || borders == true && <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />}
        {/* правый блик */}
        {borders == "x" || borders == true && <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-white/30 to-transparent" />}
      </div>
    }
    <div className="absolute inset-0 rounded-2xl border border-transparent">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 via-transparent to-blue-300/20 blur-xl opacity-30 " />
    </div>

    <svg className="absolute w-0 h-0">
      <svg id="liquidDistortion">
        {/* <!-- These gradients will define the displacement directions --> */}
        <linearGradient id="red">
          {/* <!--Some gradient here--> */}
        </linearGradient>
        <linearGradient id="blue">
          {/* <!--Some gradient here--> */}
        </linearGradient>
      </svg>

      {/* <!-- This filter uses the pixel colors of the map image to distort the content --> */}
      <svg>
        <defs>
          <filter id="my-filter" color-interpolation-filters="sRGB">
            {/* <!-- feImage loads the gradient-based displacement map --> */}
            <feImage href="#lens-map" result="map" />
            {/* <!-- feDisplacementMap shifts pixels of SourceGraphic (what we want to distort)
             based on (R)ed (x) and (B)lue (y) pixel values of the map --> */}
            <feDisplacementMap in="SourceGraphic" in2="map" scale="50" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          </filter>
        </defs>
      </svg>
    </svg>

  </div>
}