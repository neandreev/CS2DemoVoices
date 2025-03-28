import i18next from 'i18next'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useStore } from '@/store'
import PlayerButton from './PlayerButton'

const PlayersSelect = () => {
  const { players, toggleSelectedValue } = useStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{i18next.t('selectPlayers')}</CardTitle>
        <CardDescription>{i18next.t('selectPlayersDesc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 w-l gap-2">
          {Object.entries(players).map(([playerName, playerValue]) => (
            <PlayerButton
              key={playerValue}
              playerName={playerName}
              playerValue={playerValue}
              toggleSelectedValue={toggleSelectedValue}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default PlayersSelect
