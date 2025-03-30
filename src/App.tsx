import i18next from 'i18next'
import { ArrowLeft, ArrowRight, RefreshCcw } from 'lucide-react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'

import Footer from '@/components/Footer'
import ModeToggle from '@/components/ModeToggle'
import PlayersInput from '@/components/PlayersInput'
import PlayersSelect from '@/components/PlayersSelect'
import Result from '@/components/Result'
import { Button } from '@/components/ui/button'
import { AppState, useStore } from '@/store'
import { ThemeProvider } from '@/themeProvider'

const App = () => {
  const { appState, goToInputPage, goToPreviousPage, goToNextPage } = useStore()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MotionConfig transition={{ duration: 0.1, ease: 'easeInOut' }}>
        <div className="absolute inset-0 -z-10 bg-[url(/background.png)] bg-center dark:brightness-10 brightness-50 dark:contrast-100 contrast-75" />
        <div className="font-play h-screen flex flex-col items-center justify-center">
          <div className="flex w-120 flex-grow flex-col justify-center gap-4">
            <div className="flex justify-between gap-2 w-full">
              <MotionConfig transition={{ duration: 0.2, ease: 'easeInOut' }}>
                <div className="flex gap-2">
                  <ModeToggle />
                  <AnimatePresence>
                    {appState !== AppState.Input ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Button
                          variant="outline"
                          className="w-fit"
                          onClick={() => goToPreviousPage()}
                        >
                          <ArrowLeft />
                          {i18next.t('back')}
                        </Button>
                      </motion.div>
                    ) : null}
                    {appState !== AppState.Input ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Button
                          variant="outline"
                          className="w-fit"
                          onClick={() => goToInputPage()}
                        >
                          <RefreshCcw />
                          {i18next.t('again')}
                        </Button>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {appState !== AppState.Result ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button
                        variant="outline"
                        className="w-fit"
                        onClick={() => goToNextPage()}
                      >
                        <ArrowRight />
                        {i18next.t('next')}
                      </Button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </MotionConfig>
            </div>
            <div className="h-120">
              <AnimatePresence initial={false} mode="wait">
                {appState === AppState.Input ? (
                  <PlayersInput key="playersSelectCard" />
                ) : null}
                {appState === AppState.Select ? (
                  <PlayersSelect key="playersInputCard" />
                ) : null}
                {appState === AppState.Result ? <Result key="resultCard" /> : null}
              </AnimatePresence>
            </div>
          </div>
          <Footer />
        </div>
      </MotionConfig>
    </ThemeProvider>
  )
}

export default App
