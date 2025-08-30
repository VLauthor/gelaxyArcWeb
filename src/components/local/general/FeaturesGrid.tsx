"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image";

const features = [
  {
    title: "Speaker",
    description: "Удобный мессенджер и звонки для быстрой коммуникации с коллегами и друзьями.",
    fullDescription: "Speaker — это современный мессенджер, объединяющий чаты, голосовые и видеозвонки в одном удобном интерфейсе. Оставайтесь на связи с командой и друзьями, создавайте групповые чаты, мгновенно делитесь файлами и организовывайте видеоконференции — всё это с высоким уровнем безопасности и приватности. Идеально для работы и личного общения.",
    tags: ["Чаты", "Звонки", "Коммуникация"]
  },
  {
    title: "WorkFocus",
    description: "Режим работы и студия с функциями для работодателя и сотрудника, чтобы повысить продуктивность.",
    fullDescription: "WorkFocus — это универсальное рабочее пространство, где сотрудник и работодатель могут эффективно взаимодействовать, отслеживать задачи и управлять временем. Встроенные инструменты для планирования, тайм-менеджмента и аналитики позволяют повысить концентрацию и продуктивность, а гибкая настройка ролей и прав обеспечивает прозрачность в работе.",
    tags: ["Рабочий режим", "Студия", "HR"]
  },
  {
    title: "MissionMate",
    description: "Ваш личный помощник, который поможет организовать задачи и напомнит о важных событиях.",
    fullDescription: "MissionMate — это ваш персональный цифровой ассистент, который помогает структурировать рабочий день, расставлять приоритеты, отслеживать цели и своевременно получать напоминания о важных событиях. Благодаря умной интеграции и адаптивности под ваши привычки, MissionMate станет незаменимым помощником как в работе, так и в повседневной жизни.",
    tags: ["Ассистент", "Органайзер", "Напоминания"]
  },
  {
    title: "NovaView",
    description: "Видео сервис для просмотра обучающих, развлекательных и рабочих видеоматериалов",
    fullDescription: "NovaView — это современная видеоплатформа, где собраны обучающие, развлекательные и профессиональные видео. Удобная система рекомендаций, поддержка плейлистов, функции комментирования и совместного просмотра позволяют находить нужный контент и обсуждать его с коллегами и друзьями. Поддержка высококачественного стриминга делает просмотр максимально комфортным.",
    tags: ["Видео", "Обучение", "Развлечения"]
  },
  {
    title: "AstroBoard",
    description: "Трекер задач для эффективного управления проектами и командной работы.",
    fullDescription: "AstroBoard — это инструмент для управления задачами и проектами с гибкой системой досок, статусами и уведомлениями. Лёгкое распределение ролей, отслеживание прогресса в реальном времени и визуализация процессов позволяют держать команду в фокусе, достигать целей быстрее и не упускать важные детали. Интеграция с другими сервисами облегчает работу на всех этапах проекта.",
    tags: ["Задачи", "Проекты", "Команда"]
  },
  {
    title: "WorkSearch",
    description: "Поиск работы с учетом ваших навыков и предпочтений, быстрый отклик работодателей.",
    fullDescription: "WorkSearch — это площадка для поиска удалённой работы, стажировок и проектов с учётом индивидуальных навыков и пожеланий. Интеллектуальный подбор вакансий, простое создание резюме и удобная коммуникация с работодателями позволяют быстро находить подходящие предложения и получать обратную связь. Доступна фильтрация по направлениям, графику и уровню дохода.",
    tags: ["Вакансии", "Поиск", "Работа"]
  },
  {
    title: "NebulaDrive",
    description: "Облачное хранилище файлов для безопасного доступа и совместной работы.",
    fullDescription: "NebulaDrive — это защищённое облачное хранилище для всех ваших файлов, с возможностью совместного доступа и редактирования документов в реальном времени. Надёжная система резервного копирования, шифрование данных и интеграция с другими сервисами позволяют хранить информацию в безопасности и делиться ею с коллегами без ограничений.",
    tags: ["Облако", "Файлы", "Хранилище"]
  },
  {
    title: "VMeste",
    description: "Социальная сеть для общения, обмена опытом и поиска единомышленников.",
    fullDescription: "VMeste — это современная социальная сеть для общения, обмена знаниями, поиска единомышленников и создания сообществ по интересам. Организуйте тематические группы, публикуйте свои проекты, обсуждайте новости и находите новых друзей. Простая навигация и гибкая система настроек приватности обеспечивают комфорт и безопасность каждого пользователя.",
    tags: ["Соцсеть", "Общение", "Сообщество"]
  },
];

export default function FeaturesGrid({
  active,
  onHover,
  onLeave,
}: {
  active: boolean;
  onHover: (rect: DOMRect, viewFocus?: boolean, newContent?: boolean, handle?: () => void) => void;
  onLeave: (viewFocus?: boolean,) => void;
  mousePos: { x: number; y: number },
}) {

  const [showDialog, setShowDialog] = useState(false);
  const [dialogRect, setDialogRect] = useState<DOMRect | null>(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [featuresState, setFeaturesState] = useState<boolean[]>(Array(features.length).fill(true));
  const [lastItemI, setLastItemI] = useState<number>();
  const [lastItemReact, setLastItemReact] = useState<React.ReactNode>();

  const handleSetData = (rect: DOMRect, i: number) => {
    setLastItemI(i);
    setDialogRect(rect);
  };

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
  };

  useEffect(() => {
    if (dialogRect !== null && lastItemI !== undefined) {
      onHover(dialogRect, true, true, () => {
        setFeaturesState(prev =>
          prev.map((item, idx) => (idx === lastItemI ? false : item))
        );
        setShowDialog(true);
        setIsDialogVisible(true);
      });
    }
  }, [dialogRect]);

  useEffect(() => {
    if (showDialog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showDialog]);

  if (!active) return null;

  return (
    <motion.div
      className="relative cursor-none"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -right-1/5 top-1/8 w-2/6 h-[250px] bg-blue-500 opacity-20 blur-3xl rounded-full" />
        <div className="absolute -left-1/5 bottom-0 w-2/6 h-[250px] bg-violet-500 opacity-20 blur-3xl rounded-full" />
        <div className="absolute right-1/10 top-1/3 w-2/6 h-[250px] bg-blue-500 opacity-20 blur-3xl rounded-full" />
        <div className="absolute left-1/10 top-1/2 w-2/6 h-[250px] bg-blue-500 opacity-20 blur-3xl rounded-full" />
        <div className="absolute right-1/10 top-1/2 w-2/6 h-[250px] bg-violet-500 opacity-20 blur-3xl rounded-full" />
        <div className="absolute left-1/10 top-1/3 w-2/6 h-[250px] bg-violet-500 opacity-20 blur-3xl rounded-full" />
      </div>
      <section className="w-full max-w-7xl mx-auto px-6 py-24 text-white flex flex-col justify-center">
        <div className="flex flex-col w-full items-center justify-center px-2">
          <motion.h2 className="text-3xl font-bold text-center mb-6 w-fit"
            initial={{ opacity: 0, y: 0, scale: 1.0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
            onMouseLeave={() => onLeave(true)}
          >Наши кейсы</motion.h2>

          <motion.p className="text-center text-gray-400 mb-12 w-fit"
            initial={{ opacity: 0, y: 0, scale: 1.0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
            onMouseLeave={() => onLeave(true)}
          >Уже готовые решения для вашего удобства</motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {features.map(({ title, description, tags }, i) => (
            <motion.div
              key={i}
              className="bg-white/15 rounded-xl p-5 border-1 border-white/10 hover:border-white/20 transition-colors duration-300 backdrop-blur-sm h-[400px] cursor-none relative"
              animate={{ opacity: featuresState[i] ? 1 : 0 }}
              onMouseEnter={e => {
                handleSetData(e.currentTarget.getBoundingClientRect(), i);
                setLastItemReact(
                  <div className="flex flex-col w-[100%] h-[100%]">
                    <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
                    {description && <p className="text-sm text-gray-400 mb-6">{description}</p>}
                  </div>
                );
              }}
              onMouseLeave={() => onLeave(true)}
            >
              <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
              {description && <p className="text-sm text-gray-400 mb-6">{description}</p>}
              <div className="absolute right-3 bottom-3 flex gap-2 items-end justify-end flex-wrap-reverse">
                {tags?.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white"
                    whileHover={{ scale: 1.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <AnimatePresence onExitComplete={() => {
        setShowDialog(false);
        setFeaturesState(prev =>
          prev.map((item, idx) => (idx === lastItemI ? true : item))
        );
        setDialogRect(null);
        document.body.style.overflow = '';
      }}>
        {isDialogVisible && dialogRect && (
          <>
            <motion.div
              className="fixed inset-0 z-10 bg-transparent select-none"
              onClick={handleCloseDialog}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              key="dialog"
              className="fixed rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors duration-300 backdrop-blur-sm h-[400px] cursor-pointer z-50 overflow-hidden bg-white/15"
              initial={{
                top: dialogRect.top,
                left: dialogRect.left,
                width: dialogRect.width,
                height: dialogRect.height,
                opacity: 1,
              }}
              animate={{
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                opacity: 1,
                width: dialogRect.width * 3,
                height: dialogRect.height * 2
              }}
              exit={{
                top: dialogRect.top,
                x: 0,
                y: 0,
                left: dialogRect.left,
                width: dialogRect.width,
                height: dialogRect.height,
                opacity: 1,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute"
                initial={{ opacity: 1, x: 0, }}
                animate={{ opacity: 0, x: "-100%", }}
                exit={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
                transition={{ duration: 0.4, delay: 1.2 }}>
                {lastItemReact}
              </motion.div>
              <motion.div
                className="absolute flex flex-col gap-4 items-center justify-start w-full h-full"
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: "100%" }}
                exit={{ opacity: 0, x: "100%", transition: { delay: 0.2 } }}
                transition={{ duration: 0.4, delay: 1.3 }}
                onMouseLeave={() => onLeave(false)}
                onMouseEnter={e => {
                  onHover(e.currentTarget.getBoundingClientRect(), false, false);
                }}
              >
                <div className="flex flex-row w-full h-fit gap-4 items-center">
                  <div className="w-[120px] h-[120px] rounded-md bg-blue-500 flex items-center justify-center">Photo</div>
                  <div className="text-white w-2/3 h-[120px] justify-center flex flex-col">
                    <h3 className="text-2xl font-bold">{features[lastItemI as number].title}</h3>
                    <p className="text-xl">{features[lastItemI as number].description}</p>
                  </div>
                </div>
                <div className="w-full flex items-start">
                  <p className="text-white text-lg w-7/8 max-h-28 text-wrap truncate">{features[lastItemI as number].fullDescription}</p>
                </div>
                <div className="flex w-full h-fit items-center justify-center">
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-6/8 mx-auto rounded-2xl bg-white/15 p-3 ml-0"
                  >
                    <CarouselContent className="relative aspect-[4/3] w-full gap-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="relative overflow-hidden rounded-xl">
                          <Image
                            src="https://cdn.ruwiki.ru/ruwiki/files/5/55/Окак.png"
                            alt="Пример изображения"
                            fill
                            className="object-cover w-full h-full"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div >
  );
}