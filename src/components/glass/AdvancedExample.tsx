import React, { useRef, useMemo, useCallback } from 'react';
import { LiquidGlass, type LiquidGlassRef } from '@specy/liquid-glass-react';

export default function AdvancedExample() {
  const glassRef = useRef<LiquidGlassRef>(null);

  // ⚠️ IMPORTANT: Memoize all objects and callbacks
  const glassStyle = useMemo(() => ({
    depth: 0.8,
    segments: 64,
    radius: 0.3,
    transmission: 0.95,
    roughness: 0.05
  }), []);

  const onReady = useCallback((instance) => {
    console.log('LiquidGlass instance ready:', instance);
  }, []);

  const handleUpdateScreenshot = useCallback(async () => {
    await glassRef.current?.updateScreenshot();
  }, []);

  const handleUpdateStyle = useCallback(() => {
    glassRef.current?.updateGlassStyle({
      depth: Math.random(),
      transmission: 0.8 + Math.random() * 0.2
    });
  }, []);

  return (
    <div>
      <LiquidGlass
        ref={glassRef}
        glassStyle={glassStyle}
        onReady={onReady}
      >
        <div style={{ padding: '30px' }}>
          <h2>Interactive Glass Effect</h2>
          <button onClick={handleUpdateScreenshot}>
            Update Screenshot
          </button>
          <button onClick={handleUpdateStyle}>
            Randomize Style
          </button>
        </div>
      </LiquidGlass>
    </div>
  );
}