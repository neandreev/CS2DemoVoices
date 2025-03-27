import './index.css'

import React from 'react'
import i18next from 'i18next'
import ReactDOM from 'react-dom/client'
import LanguageDetector from 'i18next-browser-languagedetector'
import { Analytics } from '@vercel/analytics/react'

import App from '@/App'
import { Toaster } from '@/components/ui/sonner'

i18next.use(LanguageDetector).init({
  supportedLngs: ['ru', 'en'],
  resources: {
    en: {
      translation: {
        next: 'Next',
        copy: 'Copy',
        again: 'Start again',
        back: 'Back',
        copied: 'The command has been copied',
        enterString: 'Execute the command in the console',
        enterStringDesc: 'Use the command and copy its result into the field below',
        selectPlayers: 'Select players',
        selectPlayersDesc: "Which players' voices do you want to hear in the demo?",
        incorrectInput: "Couldn't find data for all 10 players, check your input",
        atLeastOne: 'Select at least one player',
        result: 'The final command',
        resultDesc: 'Run it in the console',
        madeBy: 'made by',
        sourceCode: 'source_code'
      }
    },
    ru: {
      translation: {
        next: 'Далее',
        copy: 'Скопировать',
        again: 'Начать заново',
        back: 'Назад',
        copied: 'Команда скопирована',
        enterString: 'Выполни в консоли команду',
        enterStringDesc: 'Используй команду и скопируй результат в поле ниже',
        selectPlayers: 'Выбери игроков',
        selectPlayersDesc: 'Голоса этих игроков будут слышны в демо',
        incorrectInput: 'Не удалось получить данные всех десяти игроков, проверь ввод',
        atLeastOne: 'Выбери хотя бы одного игрока',
        result: 'Итоговая команда',
        resultDesc: 'Используй её в консоли',
        madeBy: 'cделал',
        sourceCode: 'исходный_код'
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Analytics />
    <App />
    <Toaster position="top-center" />
  </React.StrictMode>
)
