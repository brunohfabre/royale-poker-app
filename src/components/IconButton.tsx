import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { twMerge } from 'tailwind-merge'

interface IconButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary'
}

export function IconButton({
  variant = 'primary',
  disabled,
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={twMerge(
        'h-12 w-12 items-center justify-center',
        variant === 'primary' && 'bg-zinc-300',
        disabled && 'opacity-50',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}
