import i18next from 'i18next'

import { useStore } from '@/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Result = () => {
  const { resultString, copyResult } = useStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{i18next.t('result')}</CardTitle>
        <CardDescription>{i18next.t('resultDesc')}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between gap-2">
        <Input className="w-64 resize-none" value={resultString} spellCheck={false} />
        <Button variant="outline" onClick={() => copyResult()}>
          {i18next.t('copy')}
        </Button>
      </CardContent>
    </Card>
  )
}

export default Result
