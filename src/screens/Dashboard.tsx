import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Book } from '@/components/icons/Book'
import { Home } from '@/components/icons/Home'
import { Paper } from '@/components/icons/Paper'
import { User } from '@/components/icons/User'
import { useNavigation } from '@react-navigation/native'

export function Dashboard() {
  const navigation = useNavigation()

  function navigateToFriends() {
    navigation.navigate('friends')
  }

  function navigateToNewGame() {
    navigation.navigate('lobby')
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

          <TouchableOpacity
            className="px-4 bg-zinc-400 mx-2 justify-center"
            onPress={navigateToNewGame}
          >
            <Text>Play</Text>
          </TouchableOpacity>

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
