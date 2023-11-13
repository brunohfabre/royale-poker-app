import { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { IconButton } from '@/components/IconButton'
import { Book } from '@/components/icons/Book'
import { Home } from '@/components/icons/Home'
import { Paper } from '@/components/icons/Paper'
import { User } from '@/components/icons/User'
import { socket } from '@/lib/io'
import { useAuthStore } from '@/stores/auth'
import { useNavigation } from '@react-navigation/native'

export function Dashboard() {
  const navigation = useNavigation()

  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    socket.emit('online', { userId: user?.id })
  }, [user])

  function navigateToFriends() {
    navigation.navigate('friends')
  }

  function navigateToNewGame() {
    navigation.navigate('game-type')
  }

  function navigateToHistory() {
    navigation.navigate('history')
  }

  function navigateToAccount() {
    navigation.navigate('account')
  }

  return (
    <SafeAreaView className="flex-1 p-6">
      <View className="flex-1 items-center justify-center">
        <Text>Dashboard</Text>
      </View>

      <SafeAreaView className="absolute left-0 right-0 bottom-0">
        <View className="m-6 h-16 flex-row bg-zinc-300 p-2">
          <TouchableOpacity
            className="flex-1 items-center justify-center"
            disabled
          >
            <Home />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 items-center justify-center"
            onPress={navigateToFriends}
          >
            <Book />
          </TouchableOpacity>

          <IconButton
            className="px-4 bg-zinc-400 mx-2 justify-center"
            onPress={navigateToNewGame}
          >
            <Text>+</Text>
          </IconButton>

          <TouchableOpacity
            className="flex-1 items-center justify-center"
            onPress={navigateToHistory}
          >
            <Paper />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 items-center justify-center"
            onPress={navigateToAccount}
          >
            <User />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  )
}
