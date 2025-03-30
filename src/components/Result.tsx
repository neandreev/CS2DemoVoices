import i18next from 'i18next'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useStore } from '@/store'

const Result = () => {
  const { resultString, copyResult } = useStore()

  return (
    <motion.div
      initial={{ x: '5%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-5%', opacity: 0 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{i18next.t('result')}</CardTitle>
          <CardDescription>{i18next.t('resultDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between gap-2">
          <Input
            className="resize-none font-mono"
            value={resultString}
            spellCheck={false}
          />
          <Button variant="outline" onClick={() => copyResult()}>
            {i18next.t('copy')}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Result
