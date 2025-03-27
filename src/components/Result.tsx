import i18next from 'i18next'

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
    <Card>
      <CardHeader>
        <CardTitle>{i18next.t('result')}</CardTitle>
        <CardDescription>{i18next.t('resultDesc')}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between gap-2">
        <Input
          className="w-70 resize-none font-mono"
          value={resultString}
          spellCheck={false}
        />
        <Button variant="outline" onClick={() => copyResult()}>
          {i18next.t('copy')}
        </Button>
      </CardContent>
    </Card>
  )
}

export default Result
