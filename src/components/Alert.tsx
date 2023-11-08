import { View, Text } from 'react-native'

import { Portal } from '@gorhom/portal'

import { Button } from './Button'

interface AlertProps {
  title: string
  text: string
  actionText: string
  onAction?: () => void
  cancelText?: string
  onCancel?: () => void
}

export function Alert({
  title,
  text,
  actionText,
  onAction,
  cancelText = 'Cancel',
  onCancel,
}: AlertProps) {
  return (
    <Portal>
      <View className="absolute top-0 right-0 bottom-0 left-0 bg-black/50 justify-center">
        <View className="absolute left-6 right-6 translate-y-[50%] bg-white px-6 py-10">
          <Text className="text-lg font-medium text-center">{title}</Text>
          <Text className="text-sm text-center mt-1">{text}</Text>

          {onAction && onCancel && (
            <View className="mt-8">
              {!!onAction && <Button title={actionText} onPress={onAction} />}
              {!!onCancel && (
                <Button
                  title={cancelText}
                  variant="secondary"
                  className="mt-3"
                  onPress={onCancel}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </Portal>
  )
}
