import i18next from 'i18next'
import { motion } from 'motion/react'

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
    <motion.div
      initial={{ x: '5%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-5%', opacity: 0 }}
    >
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
    </motion.div>
  )
}

export default PlayersSelect
