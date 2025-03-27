import i18next from 'i18next'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const Footer = () => {
  return (
    <Card className="flex text-sm px-3 py-2 border border-b-0 rounded-xl rounded-b-none">
      <CardContent className="flex p-0 gap-16">
        <div className="items-center">
          <p className="inline">{i18next.t('madeBy')}</p>
          <Button variant="link" className="p-1">
            <a href="https://github.com/neandreev" target="_blank" rel="noopener noreferrer">
              @neandreev
            </a>
          </Button>
        </div>
        <Button variant="link" className="p-1">
          <a
            href="https://github.com/neandreev/CS2DemoVoices"
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18next.t('sourceCode')}
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

export default Footer
