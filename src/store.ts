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
  players: Players
  selectedValues: Set<number>
  resultString: string
  latestToastId: ToastT['id'] | null
  setAppState: (appState: AppState) => void
  setStringToParse: (stringToParse: string) => void
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

export const useStore = create<StoreState>((set, get) => ({
  appState: AppState.Input,
  stringToParse: '',
  players: {},
  selectedValues: new Set([]),
  resultString: '',
  latestToastId: null,
  setAppState: (appState: AppState): void => set({ appState }),
  setStringToParse: (stringToParse): void => set({ stringToParse }),
  setPlayers: (players: Players): void => set({ players }),
  setLatestToastId: (latestToastId: ToastT['id']): void => set({ latestToastId }),
  showToast: (text: string) => {
    const latestToastId = toast.success(i18next.t(text))

    get().dismissLatestToast()
    get().setLatestToastId(latestToastId)
  },
  dismissLatestToast: (): void => {
    const latestToastId = get().latestToastId

    if (latestToastId) toast.dismiss(latestToastId)
  },
  toggleSelectedValue: (value): void => {
    const selectedValues = new Set(get().selectedValues)

    if (selectedValues.has(value)) {
      selectedValues.delete(value)
    } else {
      selectedValues.add(value)
    }

    set({ selectedValues })
  },
  parseString: (): void => {
    const stringToParse = get().stringToParse

    const strings = stringToParse
      .split(/\r\n|\r|\n/g)
      .map((string) => string.trim())
      .filter((string) => isFirstCharNum(string))

    const players = splitPlayersMuteValues(strings) as Players

    set({ players })
  },
  generateResultString: (): void => {
    const selectedValues = get().selectedValues

    const indicesValue = [...selectedValues].reduce(
      (playerValuesSum, playerValue) => playerValuesSum + 2 ** playerValue,
      0
    )

    set({ resultString: `tv_listen_voice_indices ${indicesValue}` })
  },
  goToNextPage: (): void => {
    const appState = get().appState

    const nextPageByAppState = {
      [AppState.Input]: get().goToSelectPage,
      [AppState.Select]: get().goToResultPage,
      [AppState.Result]: () => null
    }[appState]

    nextPageByAppState()
  },
  goToPreviousPage: (): void => {
    const appState = get().appState

    if (appState === AppState.Input) return

    set({
      appState: appState - 1
    })
  },
  goToInputPage: (): void => {
    set({
      appState: AppState.Input,
      stringToParse: '',
      players: {},
      selectedValues: new Set([]),
      resultString: ''
    })
  },
  goToSelectPage: (): void => {
    get().parseString()
    get().dismissLatestToast()

    if (Object.keys(get().players).length !== 10) {
      get().showToast('incorrectInput')

      return
    }

    set({ appState: AppState.Select, selectedValues: new Set([]) })
  },
  goToResultPage: (): void => {
    get().generateResultString()
    get().dismissLatestToast()

    if (get().selectedValues.size === 0) {
      get().showToast('atLeastOne')

      return
    }

    set({ appState: AppState.Result })
  },
  copyCommand: async (): Promise<void> => {
    await navigator.clipboard.writeText('voice_show_mute')

    get().showToast('copied')
  },
  copyResult: async (): Promise<void> => {
    await navigator.clipboard.writeText(get().resultString)

    get().showToast('copied')
  }
}))
