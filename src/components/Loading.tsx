import { ActivityIndicator, View } from 'react-native'

export function Loading() {
  return (
    <View className="absolute top-0 right-0 bottom-0 left-0 bg-black/50 z-50 items-center justify-center">
      <ActivityIndicator color="white" />
    </View>
  )
}
