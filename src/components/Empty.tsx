import { Text, View } from 'react-native'

interface EmptyProps {
  title: string
  text?: string
}

export function Empty({ title, text }: EmptyProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-base font-medium text-center">{title}</Text>
      {text && <Text className="text-sm text-center mt-1">{text}</Text>}
    </View>
  )
}
