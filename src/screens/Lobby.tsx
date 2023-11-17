import { useEffect, useState } from 'react'
import { Text, View, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/Button'
import { PageHeader } from '@/components/PageHeader'
import { socket } from '@/lib/io'
import { useAuthStore } from '@/stores/auth'
import { useNavigation, useRoute } from '@react-navigation/native'

type PlayerType = {
  id: string
  name: string
  ready: boolean
}

export function Lobby() {
  const navigation = useNavigation()
  const route = useRoute()

  const user = useAuthStore((state) => state.user)

  const [players, setPlayers] = useState<PlayerType[]>([])
  const [isReady, setIsReady] = useState(false)

  const { matchId } = route.params as {
    matchId: string
  }

  useEffect(() => {
    socket.emit('match.get', { matchId }, ({ match }: any) => {
      setPlayers(match.players)
    })

    socket.on(`match.${matchId}.player.joined`, ({ player }) => {
      setPlayers((prevState) => [...prevState, player])
    })

    socket.on(`match.${matchId}.player.changed`, ({ player }) => {
      setPlayers((prevState) =>
        prevState.map((item) => (item.id === player.id ? player : item)),
      )

      if (player.id === user?.id) {
        setIsReady((prevState) => !prevState)
      }
    })

    socket.on(`match.${matchId}.player.exited`, ({ playerId }) => {
      setPlayers((prevState) =>
        prevState.filter((player) => player.id !== playerId),
      )
    })

    socket.on(`match.${matchId}.countdown.start`, () => {
      Alert.alert('Countdown start')
    })

    socket.on(`match.${matchId}.countdown.stop`, () => {
      Alert.alert('Countdown stop')
    })

    socket.on(`match.${matchId}.start`, () => {
      Alert.alert('Match start')
    })

    const unsubscribe = navigation.addListener('beforeRemove', () => {
      socket.emit(`match.exit`, { matchId, playerId: user?.id })
    })

    return () => {
      socket.off(`match.${matchId}.player.joined`)
      socket.off(`match.${matchId}.player.changed`)
      socket.off(`match.${matchId}.player.exited`)
      socket.off(`match.${matchId}.countdown.start`)
      socket.off(`match.${matchId}.countdown.stop`)
      socket.off(`match.${matchId}.start`)

      unsubscribe()
    }
  }, [matchId, user?.id, navigation])

  function handleChangeReady() {
    socket.emit('match.player.change-ready', {
      matchId,
      playerId: user?.id,
    })
  }

  return (
    <SafeAreaView className="flex-1">
      <PageHeader title="new game" />

      <View className="flex-1 pb-3 pt-6 px-6">
        {players.map((player) => (
          <View
            key={player.id}
            className="py-3 pl-3 pr-6 flex-row justify-between bg-zinc-200 mb-3 items-center"
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-full bg-zinc-400 mr-3" />
              <Text className="font-medium text-base">{player.name}</Text>
            </View>

            <Text className="font-medium text-xs">
              {player.ready ? 'READY' : 'NOT READY'}
            </Text>
          </View>
        ))}
      </View>

      <View className="p-6">
        <Button
          title={isReady ? "I'm not ready" : 'Get ready'}
          onPress={handleChangeReady}
        />
      </View>
    </SafeAreaView>
  )
}
