import type { CheckedState } from '@radix-ui/react-checkbox'
import i18next from 'i18next'
import { type ToastT, toast } from 'sonner'
import { create } from 'zustand'

export enum AppState {
  Input = 0,
  Select = 1,
  Result = 2
}

interface Players {
  [playerName: string]: number
}

export interface StoreState {
  appState: AppState
  stringToParse: string
  isPlayerNeeded: CheckedState
  playerName: string
  players: Players
  selectedValues: Set<number>
  resultString: string
  latestToastId: ToastT['id'] | null
  setAppState: (appState: AppState) => void
  setStringToParse: (stringToParse: string) => void
  setIsPlayerNeeded: (isPlayerNeeded: CheckedState) => void
  setPlayerName: (playerName: string) => void
  setPlayers: (players: Players) => void
  setLatestToastId: (latestToastId: ToastT['id']) => void
  showToast: (text: string) => void
  dismissLatestToast: () => void
  toggleSelectedValue: (value: number) => void
  parseString: () => void
  generateResultString: () => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  goToInputPage: () => void
  goToSelectPage: () => void
  goToResultPage: () => void
  copyCommand: () => void
  copyResult: () => void
}

const isFirstCharNum = (str: string): boolean => str.match(new RegExp(/^\d/)) !== null

const splitPlayersMuteValues = (stringArr: string[]): Players => {
  return stringArr.reduce((players: Players, string: string) => {
    const [muteValue, player] = string.replace(/\s+/g, ' ').split(' ')

    players[player] = Number(muteValue)

    return players
  }, {})
}

const findPlayerGap = (knownPlayersValues: number[]) => {
  for (let i = 0; i < knownPlayersValues.length - 1; i++) {
    if (knownPlayersValues[i + 1] !== knownPlayersValues[i] + 1) {
      return knownPlayersValues[i] + 1
    }
  }

  return 0
}

const appendPlayerValue = (players: Players, playerName: string): Players => {
  const playersValues = Object.values(players)

  const lowestPlayerValue = 3
  const highestPlayerValue = 12

  if (!playersValues.includes(lowestPlayerValue)) {
    players[playerName] = lowestPlayerValue
  } else if (!playersValues.includes(highestPlayerValue)) {
    players[playerName] = highestPlayerValue
  } else {
    players[playerName] = findPlayerGap(playersValues)
  }

  return players
}

export const useStore = create<StoreState>((set, get) => ({
  appState: AppState.Input,
  stringToParse: '',
  isPlayerNeeded: true,
  playerName: '',
  players: {},
  selectedValues: new Set([]),
  resultString: '',
  latestToastId: null,
  setAppState: (appState) => set({ appState }),
  setStringToParse: (stringToParse) => set({ stringToParse }),
  setIsPlayerNeeded: (isPlayerNeeded) => set({ isPlayerNeeded }),
  setPlayerName: (playerName) => set({ playerName }),
  setPlayers: (players) => set({ players }),
  setLatestToastId: (latestToastId) => set({ latestToastId }),
  showToast: (text) => {
    const latestToastId = toast.success(i18next.t(text))

    get().dismissLatestToast()
    get().setLatestToastId(latestToastId)
  },
  dismissLatestToast: () => {
    const latestToastId = get().latestToastId

    if (latestToastId) toast.dismiss(latestToastId)
  },
  toggleSelectedValue: (value) => {
    const selectedValues = new Set(get().selectedValues)

    if (selectedValues.has(value)) {
      selectedValues.delete(value)
    } else {
      selectedValues.add(value)
    }

    set({ selectedValues })
  },
  parseString: () => {
    const stringToParse = get().stringToParse

    const strings = stringToParse
      .split(/\r\n|\r|\n/g)
      .map((string) => string.trim())
      .filter((string) => isFirstCharNum(string))

    const parsedPlayers = splitPlayersMuteValues(strings) as Players
    const players = get().isPlayerNeeded
      ? appendPlayerValue(
          parsedPlayers,
          get().playerName || i18next.t('defaultPlayerName')
        )
      : parsedPlayers

    set({ players: players })
  },
  generateResultString: () => {
    const selectedValues = get().selectedValues

    const indicesValue = [...selectedValues].reduce(
      (playerValuesSum, playerValue) => playerValuesSum + 2 ** playerValue,
      0
    )

    set({ resultString: `tv_listen_voice_indices ${indicesValue}` })
  },
  goToNextPage: () => {
    const appState = get().appState

    const nextPageByAppState = {
      [AppState.Input]: get().goToSelectPage,
      [AppState.Select]: get().goToResultPage,
      [AppState.Result]: () => null
    }[appState]

    nextPageByAppState()
  },
  goToPreviousPage: () => {
    const appState = get().appState

    if (appState === AppState.Input) return

    set({
      appState: appState - 1
    })
  },
  goToInputPage: () => {
    set({
      appState: AppState.Input,
      stringToParse: '',
      isPlayerNeeded: false,
      playerName: '',
      players: {},
      selectedValues: new Set([]),
      resultString: ''
    })
  },
  goToSelectPage: () => {
    get().parseString()
    get().dismissLatestToast()

    if (Object.keys(get().players).length !== 10) {
      get().showToast('incorrectInput')

      return
    }

    set({ appState: AppState.Select, selectedValues: new Set([]) })
  },
  goToResultPage: () => {
    get().generateResultString()
    get().dismissLatestToast()

    if (get().selectedValues.size === 0) {
      get().showToast('atLeastOne')

      return
    }

    set({ appState: AppState.Result })
  },
  copyCommand: async () => {
    await navigator.clipboard.writeText('voice_show_mute')

    get().showToast('copied')
  },
  copyResult: async () => {
    await navigator.clipboard.writeText(get().resultString)

    get().showToast('copied')
  }
}))
