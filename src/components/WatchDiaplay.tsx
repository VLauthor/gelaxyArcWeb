"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeInfo } from 'lucide-react';

interface WatchDisplayProps {
  items: Record<string, any>[];
  size?: number;
  itemSize?: number;
  label?: string
  mousePos: { x: number; y: number };
  onHover: (rect: DOMRect, viewFocus?: boolean, newContent?: boolean, handle?: () => void) => void;
  onLeave: (viewFocus?: boolean,) => void;
}

const WatchDisplay: React.FC<WatchDisplayProps> = ({
  items,
  size = 320,
  itemSize = 90,
  label,
  onHover,
  onLeave,
}) => {


  const colorShema = [
    { gradient: 'linear-gradient(135deg, #0f172a 0%, #3b82f6 100%)', color: "#00a6f4" }, // darker blue
    { gradient: 'linear-gradient(135deg, #7f00ff 0%, #e100ff 100%)', color: "#00a6f4" },// violet
    { gradient: 'linear-gradient(135deg, #ff007a 0%, #ff7eb9 100%)', color: "#00a6f4" }, // juicy pink
    { gradient: 'linear-gradient(135deg, #e63946 0%, #900d18 100%)', color: "#00a6f4" },// pleasant red
    { gradient: 'linear-gradient(135deg, #f09819 0%, #edde5d 100%)', color: "#00a6f4" },// orange
    { gradient: 'linear-gradient(135deg, #00796b 0%, #26a69a 100%)', color: "#00a6f4" }  // darker turquoise
  ];

  const [colorI, setColorI] = React.useState<number>();
  const [color, setColor] = React.useState<string>();
  const [itemSelect, setItemSelect] = React.useState<boolean>(false);
  const [dialogRect, setDialogRect] = React.useState<DOMRect | null>(null);

  // Hover index for sliding effect
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Entry and exit offsets based on cursor direction
  const [entryOffsets, setEntryOffsets] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [exitOffsets, setExitOffsets] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const itemGradientsRef = useRef<{ gradient: string, color: string }[]>(
    items.map(() => {
      const colorShemaItem = colorShema[Math.floor(Math.random() * colorShema.length)]
      return { gradient: colorShemaItem.gradient, color: colorShemaItem.color }
    })
  );
  const perRow = Math.ceil(Math.sqrt(items.length));
  const totalRows = Math.ceil(items.length / perRow);
  const horizontalSpacing = itemSize * 1.2;
  const verticalSpacing = (Math.sqrt(3) / 2) * itemSize * 1.2;
  const gridWidth = perRow * horizontalSpacing + horizontalSpacing / 2;
  const gridHeight = totalRows * verticalSpacing + itemSize / 2;
  const initialOffsetX = (size - gridWidth) / 2;
  const initialOffsetY = (size - gridHeight) / 2;
  const dragConstraints = {
    left: initialOffsetX - 20,
    right: -initialOffsetX + 20,
    top: initialOffsetY + 20,
    bottom: -initialOffsetY + 20,
  };


  const handleLouder = (rect: DOMRect, i: number) => {
    setColorI(i)
    setDialogRect(rect);
  };

  useEffect(() => {
    if (dialogRect !== null && colorI !== undefined) {

      setColor(itemGradientsRef.current[colorI!].gradient)
      setItemSelect(true);

    }
  }, [dialogRect]);
  return (
    <motion.div
      className="relative overflow-visible w-full h-full p-4"
      onMouseLeave={() => onLeave}
      onMouseEnter={e => {
        onHover(e.currentTarget.getBoundingClientRect(), true, true);
      }}
    >
      {itemSelect &&
        <>
          {label && (<motion.h3 className='text-white text-3xl w-full text-center font-bold mb-2 mt-4'>{label}</motion.h3>)}
          <motion.div
            className='w-full h-1/2'
            style={{
              background: color
            }}>

          </motion.div>
        </>
      }
      <motion.div
        className="relative bg-gray-950/60 rounded-3xl overflow-hidden border-[8px] border-gray-800 border-spacing-11"
        style={{ width: itemSelect ? size : "100%", height: itemSelect ? size : "100%" }}
        onMouseLeave={() => onLeave(false)}
        onMouseEnter={e => {
          onHover(e.currentTarget.getBoundingClientRect(), false, false);
        }}
      >

        <motion.div
          drag
          dragConstraints={dragConstraints}
          dragMomentum={false}
          dragElastic={0}
          initial={{ x: initialOffsetX, y: initialOffsetY }}
          style={{
            position: 'absolute',
            width: itemSelect ? gridWidth : "150%",
            height: itemSelect ? gridHeight : "150%",
          }}
          className='p-4'
          onMouseLeave={() => onLeave(false)}
          onMouseEnter={e => {
            onHover(e.currentTarget.getBoundingClientRect(), false, false);
          }}
        >
          {items.map((item, index) => {
            const row = Math.floor(index / perRow);
            const col = index % perRow;
            const x = col * horizontalSpacing + (row % 2 ? horizontalSpacing / 2 : 0);
            const y = row * verticalSpacing;
            return (
              <motion.div
                key={index}
                className="flex flex-row justify-center items-center rounded-full overflow-hidden"
                style={{
                  position: 'absolute',
                  left: x * (itemSelect ? 1 : 1.5),
                  top: y * (itemSelect ? 1 : 1.5),
                  width: itemSize * (itemSelect ? 1 : 1.5),
                  height: itemSize * (itemSelect ? 1 : 1.5),
                  background: itemGradientsRef.current[index].gradient,
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}

              >
                <motion.div
                  className="relative overflow-hidden w-full h-full "
                  onMouseEnter={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const dx = e.clientX - (rect.left + rect.width / 2);
                    const dy = e.clientY - (rect.top + rect.height / 2);
                    setEntryOffsets({
                      x: dx >= 0 ? rect.width : -rect.width,
                      y: dy >= 0 ? rect.height : -rect.height
                    });
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const dx = e.clientX - (rect.left + rect.width / 2);
                    const dy = e.clientY - (rect.top + rect.height / 2);
                    setExitOffsets({
                      x: dx >= 0 ? rect.width : -rect.width,
                      y: dy >= 0 ? rect.height : -rect.height
                    });
                    setHoveredIndex(null);
                  }}
                  initial="initial"
                  onClick={e => handleLouder(e.currentTarget.getBoundingClientRect(), index)}
                  variants={{}}
                >
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-white"
                    animate={hoveredIndex === index ? { x: '-100%' } : { x: 0 }}
                    transition={{ type: 'keyframes', stiffness: 300 }}
                  >
                    {index}
                  </motion.div>
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        key={`info-${index}`}
                        className="absolute inset-0 flex items-center justify-center bg-white font-bold flex-col text-sky-500 rounded-full"
                        initial={{ x: entryOffsets.x, y: entryOffsets.y }}
                        animate={{ x: 0, y: 0 }}
                        exit={{ x: exitOffsets.x, y: exitOffsets.y }}
                        transition={{ type: 'keyframes', stiffness: 300 }}
                      >
                        <BadgeInfo size={itemSize / (itemSelect ? 1 : 1.5) / 3} color={itemGradientsRef.current[index].color} />
                        Подробнее
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.div >
  );
};

export default WatchDisplay;