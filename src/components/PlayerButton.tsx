import { Button } from '@/components/ui/button'
import { type StoreState, useStore } from '@/store'

interface PlayerButton {
  playerName: string
  playerValue: number
  toggleSelectedValue: StoreState['toggleSelectedValue']
}

const PlayerButton = ({ playerName, playerValue, toggleSelectedValue }: PlayerButton) => {
  const isSelected = useStore((state) => state.selectedValues.has(playerValue))

  return (
    <Button
      variant={isSelected ? 'default' : 'outline'}
      onClick={() => toggleSelectedValue(playerValue)}
    >
      <p className="truncate">{playerName}</p>
    </Button>
  )
}

export default PlayerButton
