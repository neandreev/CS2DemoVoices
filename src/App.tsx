import i18next from 'i18next'
import { ArrowLeft, ArrowRight, RefreshCcw } from 'lucide-react'

import Footer from '@/components/Footer'
import ModeToggle from '@/components/ModeToggle'
import PlayersInput from '@/components/PlayersInput'
import PlayersSelect from '@/components/PlayersSelect'
import Result from '@/components/Result'
import { Button } from '@/components/ui/button'
import { AppState, useStore } from '@/store'
import { ThemeProvider } from '@/themeProvider'

const componentByAppState = {
  [AppState.Input]: <PlayersInput />,
  [AppState.Select]: <PlayersSelect />,
  [AppState.Result]: <Result />
}

const App = () => {
  const { appState, goToInputPage, goToPreviousPage, goToNextPage } = useStore()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute inset-0 -z-10 bg-[url(background.png)] bg-center dark:brightness-10 brightness-50 dark:contrast-100 contrast-75" />
      <div className="font-inter h-screen flex flex-col items-center justify-center">
        <div className="flex flex-grow flex-col justify-center gap-4">
          {componentByAppState[appState]}
          <div className="flex justify-between gap-2 w-full">
            <div className="flex gap-2">
              <ModeToggle />
              {appState !== AppState.Input ? (
                <Button
                  variant="outline"
                  className="w-fit"
                  onClick={() => goToPreviousPage()}
                >
                  <ArrowLeft />
                  {i18next.t('back')}
                </Button>
              ) : null}
              {appState !== AppState.Input ? (
                <Button
                  variant="outline"
                  className="w-fit"
                  onClick={() => goToInputPage()}
                >
                  <RefreshCcw />
                  {i18next.t('again')}
                </Button>
              ) : null}
            </div>
            {appState !== AppState.Result ? (
              <Button variant="outline" className="w-fit" onClick={() => goToNextPage()}>
                <ArrowRight />
                {i18next.t('next')}
              </Button>
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
