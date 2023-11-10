import { useEffect } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/Button'
import { socket } from '@/lib/io'
import { useAuthStore } from '@/stores/auth'
import { CommonActions, useNavigation } from '@react-navigation/native'

export function NewGame() {
  const navigation = useNavigation()

  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    socket.emit('games.create', { userId: user?.id }, (response: any) => {
      console.log(response)
    })
  }, [user])

  function handleNavigateToGame() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'dashboard',
          },
          {
            name: 'game',
          },
        ],
      }),
    )
  }

  return (
    <>
      <SafeAreaView className="p-6">
        <Text>new game</Text>

        <Button
          title="Start game"
          className="mt-6"
          onPress={handleNavigateToGame}
        />
      </SafeAreaView>
    </>
  )
}
