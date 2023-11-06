import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { twMerge } from 'tailwind-merge'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'primary' | 'secondary'
}

export function Button({
  title,
  variant = 'primary',
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={twMerge(
        'h-12 px-4 items-center justify-center',
        variant === 'primary' && 'bg-zinc-300',
        disabled && 'opacity-50',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <Text className="text-sm font-medium">{title}</Text>
    </TouchableOpacity>
  )
}
