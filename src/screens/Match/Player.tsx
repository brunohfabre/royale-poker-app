import { Text, View } from 'react-native'

export function Player() {
  return (
    <View className="items-center">
      <View className="w-14 h-14 bg-zinc-400 rounded-full" />

      <View className="mt-2">
        <Text className="text-xs">Name</Text>
        <Text className="mt-[2px] text-sm font-medium">$225</Text>
      </View>
    </View>
  )
}
