import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

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
    navigation.navigate('new-game')
  }

  function navigateToHistory() {
    navigation.navigate('history')
  }

  function navigateToAccount() {
    navigation.navigate('account')
  }

  return (
    <View className="flex-1 p-6">
      <Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        perspiciatis enim eum libero, vero dolor autem culpa commodi aliquid
        quam aut a sequi ex possimus debitis unde nihil. Fuga, iusto?
      </Text>

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
            <Text>New game</Text>
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
    </View>
  )
}
