import { View } from 'react-native'

import { twMerge } from 'tailwind-merge'

interface CardProps {
  filled?: boolean
}

export function Card({ filled }: CardProps) {
  return (
    <View
      className={twMerge(
        'h-16 w-[46px] bg-transparent border-2 border-zinc-300 border-dashed rounded-lg mx-1',
        filled && 'bg-zinc-300 border-solid',
      )}
    />
  )
}
