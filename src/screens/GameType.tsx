import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CaretRight } from '@/components/icons/CaretRight'
import { PageHeader } from '@/components/PageHeader'
import { socket } from '@/lib/io'
import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'
import { useNavigation } from '@react-navigation/native'

export function GameType() {
  const navigation = useNavigation()

  const user = useAuthStore((state) => state.user)
  const setLoading = useLoadingStore((state) => state.setLoading)

  function handleFindMatch() {
    setLoading(true)

    socket.emit(
      'find-match',
      {
        player: {
          id: user?.id,
          name: user?.name,
        },
      },
      (response: any) => {
        setLoading(false)

        navigation.navigate('lobby', {
          matchId: response.match.id,
        })
      },
    )
  }

  return (
    <SafeAreaView className="flex-1">
      <PageHeader title="game type" />

      <View className="p-6">
        <TouchableOpacity
          className="bg-zinc-300 h-32 items-center justify-between flex-row p-6 opacity-50"
          activeOpacity={0.6}
          disabled
        >
          <Text className="text-lg font-medium">Offline</Text>

          <CaretRight />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-zinc-300 h-32 items-center justify-between flex-row p-6 mt-3"
          activeOpacity={0.6}
          onPress={handleFindMatch}
        >
          <Text className="text-lg font-medium">Multiplayer</Text>

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
