import * as React from 'react'

import { cn } from '@/lib/utils'

const Card = React.memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-4 rounded-xl border py-6 shadow-sm',
        className
      )}
      {...props}
    />
  )
})

const CardHeader = React.memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 px-6', className)}
      {...props}
    />
  )
})

const CardTitle = React.memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold cursor-default', className)}
      {...props}
    />
  )
})

const CardDescription = React.memo(
  ({ className, ...props }: React.ComponentProps<'div'>) => {
    return (
      <div
        data-slot="card-description"
        className={cn('text-muted-foreground text-sm cursor-default', className)}
        {...props}
      />
    )
  }
)

const CardContent = React.memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      id="test"
      {...props}
    />
  )
})

const CardFooter = React.memo(({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6', className)}
      {...props}
    />
  )
})

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
