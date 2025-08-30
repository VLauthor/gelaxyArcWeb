import { motion } from 'framer-motion';

export default function ConnectorBlock({
  active,
}: {
  active: boolean;
  onHover: (rect: DOMRect, viewFocus?: boolean, newContent?: boolean, handle?: () => void) => void;
  onLeave: (viewFocus?: boolean,) => void;
  mousePos: { x: number; y: number },
}) {
  if (!active) return null;
  return <div className="relative flex flex-col w-screen h-fit py-[20%] items-center justify-center gap-8">
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute left-[25%] top-1/3 w-3/6 h-[350px] bg-blue-500 opacity-25 rounded-full" style={{ filter: "blur(80px)" }} />
      <div className="absolute left-[25%] top-1/3 w-3/6 h-[350px] bg-violet-400 opacity-20 rounded-full" style={{ filter: "blur(80px)" }} />
      <div className="absolute -right-1/5 top-1/8 w-2/6 h-[250px] bg-blue-500 opacity-20 blur-3xl rounded-full" />
      <div className="absolute -left-1/5 bottom-0 w-2/6 h-[250px] bg-violet-500 opacity-20 blur-3xl rounded-full" />
    </div>
    <motion.h1 className="text-6xl text-white font-bold w-1/2 text-center z-20">МЫ - команда, которая делает разницу</motion.h1>
    <motion.div className="w-full items-center justify-center flex flex-col">
      <p className="text-3xl text-white font-bold w-4/5 text-center z-20" >Хочешь стать частью нашей тенденции?</p>
      <p className="text-3xl text-white font-bold w-4/5 text-center z-20" >Авторизируйся или зарегистрируйся на этом сайте!</p>
    </motion.div>
    <motion.button
      whileHover={{ scale: 1.2, rotate: -2 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="relative z-10 px-24 py-4 text-white text-[20px] font-bold overflow-hidden bg-blue-500 border-none rounded-[0.625em] hover:text-black before:content-[''] before:absolute before:inset-0 before:-left-[20%] before:-right-[20%] before:top-0 before:bottom-0 before:bg-white before:-skew-x-[45deg] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-500 before:z-[-1]"
    >
      Войти
    </motion.button>
  </div>
}