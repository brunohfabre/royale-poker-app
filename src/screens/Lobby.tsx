import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CaretRight } from '@/components/icons/CaretRight'
import { PageHeader } from '@/components/PageHeader'
import { useNavigation } from '@react-navigation/native'

export function Lobby() {
  const navigation = useNavigation()

  function handleNavigateToNewGame() {
    navigation.navigate('new-game')
  }

  return (
    <SafeAreaView className="flex-1">
      <PageHeader title="lobby" />

      <View className="p-6">
        <TouchableOpacity
          className="bg-zinc-300 h-32 items-center justify-between flex-row p-6 opacity-50"
          activeOpacity={0.6}
          disabled
        >
          <Text className="text-lg font-medium">Local</Text>

          <CaretRight />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-zinc-300 h-32 items-center justify-between flex-row p-6 mt-3"
          activeOpacity={0.6}
          onPress={handleNavigateToNewGame}
        >
          <Text className="text-lg font-medium">Online</Text>

          <CaretRight />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-zinc-300 h-32 items-center justify-between flex-row p-6 mt-3 opacity-50"
          activeOpacity={0.6}
          disabled
        >
          <Text className="text-lg font-medium">Tournament</Text>

          <CaretRight />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
