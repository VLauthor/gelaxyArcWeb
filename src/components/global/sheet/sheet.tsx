import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

type SheetContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SheetContext = createContext<SheetContextValue | undefined>(undefined);

export const Sheet: React.FC<{ children: ReactNode, className?: string }> = ({
  children,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      <div className={className}>{children}</div>
    </SheetContext.Provider>
  );
};

const useSheetContext = () => {
  const context = useContext(SheetContext);
  if (!context) throw new Error('useSheetContext должен использоваться внутри <Sheet>');
  return context;
};

export const SheetTrigger: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const { setOpen } = useSheetContext();
  return (
    <span
      className={`cursor-pointer hover:underline ${className}`}
      onClick={() => setOpen(true)}
    >
      {children}
    </span>
  );
};

type Side = 'top' | 'right' | 'bottom' | 'left';

const sideToPosition: Record<Side, string> = {
  right: 'fixed top-0 right-0 h-screen w-[400px] shadow-lg',
  left: 'fixed top-0 left-0 h-screen w-[400px] shadow-lg',
  top: 'fixed top-0 left-0 w-screen h-[300px] shadow-lg',
  bottom: 'fixed bottom-0 left-0 w-screen h-[300px] shadow-lg',
};

const closeButtonPosition: Record<Side, string> = {
  right: 'top-4 left-4',
  left: 'top-4 right-4',
  top: 'top-4 right-4',
  bottom: 'bottom-4 right-4',
};

const marginForContent: Record<Side, string> = {
  right: 'mt-8',
  left: 'mt-8',
  top: 'mt-8',
  bottom: 'mt-8',
};

// Стили анимаций
const ANIMATION_DURATION = 300; // ms

export const SheetContent: React.FC<{
  children: ReactNode;
  side?: Side;
  className?: string;
}> = ({ children, side = 'right', className = '' }) => {
  const { open, setOpen } = useSheetContext();
  const [isVisible, setIsVisible] = useState(open);
  const [animating, setAnimating] = useState<false | 'in' | 'out'>(false);

  // Создаём стили анимации один раз
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
    .sheet-anim-overlay {
      transition: opacity ${ANIMATION_DURATION}ms cubic-bezier(.4,0,.2,1);
      opacity: 0;
    }
    .sheet-anim-overlay.sheet-anim-show {
      opacity: 1;
    }
    .sheet-anim-window-right {
      transform: translateX(100%);
      opacity: 0;
      transition:
        transform ${ANIMATION_DURATION}ms cubic-bezier(.4,0,.2,1),
        opacity ${ANIMATION_DURATION}ms cubic-bezier(.4,0,.2,1);
    }
    .sheet-anim-window-right.sheet-anim-show {
      transform: translateX(0);
      opacity: 1;
    }
    .sheet-anim-window-left {
      transform: translateX(-100%);
      opacity: 0;
      transition:
        transform ${ANIMATION_DURATION}ms cubic-bezier(.4,0,.2,1),
        opacity ${ANIMATION_DURATION}ms cubic-bezier(.4,0,.2,1);
    }
    .sheet-anim-window-left.sheet-anim-show {
      transform: translateX(0);
      opacity: 1;
    }
    .sheet-anim-window-top {
      transform: translateY(-100%);
      opacity: 0;
      transition:
        transform ${ANIMATION_DURATION}ms cubic-bezier(.4,0,.2,1),
        opacity ${ANIMATION_DURATION}ms cubic-bezier(.4,0,.2,1);
    }
    .sheet-anim-window-top.sheet-anim-show {
      transform: translateY(0);
      opacity: 1;
    }
    .sheet-anim-window-bottom {
      transform: translateY(100%);
      opacity: 0;
      transition:
              transform ${ANIMATION_DURATION}ms cubic-bezier(.4,0,.2,1),
        opacity ${ANIMATION_DURATION}ms cubic-bezier(.4,0,.2,1);
    }
    .sheet-anim-window-bottom.sheet-anim-show {
      transform: translateY(0);
      opacity: 1;
    }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Контролируем появление и закрытие
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      // Запуск анимации появления через короткую задержку (requestAnimationFrame или timeout)
      setTimeout(() => setAnimating('in'), 10);
    } else if (isVisible) {
      // Запуск анимации скрытия
      setAnimating('out');
      // И удаляем после завершения анимации
      const timer = setTimeout(() => {
        setIsVisible(false);
        setAnimating(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!isVisible) return null;

  // Классы анимаций
  const animWindowClass =
    side === 'right'
      ? 'sheet-anim-window-right'
      : side === 'left'
        ? 'sheet-anim-window-left'
        : side === 'top'
          ? 'sheet-anim-window-top'
          : 'sheet-anim-window-bottom';
  const animShow = animating === 'in' ? 'sheet-anim-show' : animating === 'out' ? '' : '';

  return (
    <>
      {/* Overlay с анимацией */}
      <div
        className={`fixed inset-0 z-[999] bg-[#0000006f] sheet-anim-overlay ${animShow}`}
        onClick={() => setOpen(false)}
      />
      {/* Sheet окно с анимацией */}
      <div
        className={`z-[1000] flex flex-col p-6 transition-shadow duration-300 border-r-2 ${sideToPosition[side]} ${animWindowClass} ${animShow} ${className}`}
        onClick={e => e.stopPropagation()}
        style={{ pointerEvents: 'auto' }}
      >
        <button
          onClick={() => setOpen(false)}
          className={`absolute border-none bg-transparent text-2xl cursor-pointer ${closeButtonPosition[side]}`}
          title="Закрыть"
          type="button"
        >
          ×
        </button>
        <div className={marginForContent[side]}>{children}</div>
      </div>
    </>
  );
};

export const SheetHeader: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`border-b border-gray-200 pb-3 mb-4 ${className}`}>{children}</div>
);

export const SheetTitle: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <h2 className={`m-0 text-2xl font-bold ${className}`}>{children}</h2>
);

export const SheetDescription: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`opacity-90 mt-1 text-base ${className}`}>{children}</div>
);