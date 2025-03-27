import i18next from 'i18next'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useStore } from '@/store'
import { useCallback, useMemo } from 'react'

const PlayersSelect = () => {
  const { players, selectedValues, toggleSelectedValue } = useStore()

  const playersEntitiesMemoized = useMemo(() => Object.entries(players), [players])

  const togglePlayerMemoized = useCallback(
    (player: number) => useCallback(() => toggleSelectedValue(player), [player]),
    [toggleSelectedValue]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>{i18next.t('selectPlayers')}</CardTitle>
        <CardDescription>{i18next.t('selectPlayersDesc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 w-l gap-2">
          {playersEntitiesMemoized.map(([playerName, playerValue]) => {
            const isButtonSelected = selectedValues.has(playerValue)

            return (
              <Button
                key={playerValue}
                variant={isButtonSelected ? 'default' : 'outline'}
                onClick={togglePlayerMemoized(playerValue)}
                className="w-48"
              >
                <p className="truncate">{playerName}</p>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default PlayersSelect
