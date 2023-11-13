import { useEffect, useState } from 'react'
import { Text, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/Button'
import { socket } from '@/lib/io'
import { useAuthStore } from '@/stores/auth'
import {
  CommonActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native'

type PlayerType = {
  id: string
  name: string
}

export function Lobby() {
  const navigation = useNavigation()
  const route = useRoute()

  const user = useAuthStore((state) => state.user)

  const [players, setPlayers] = useState<PlayerType[]>([])

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

    socket.on(`match.${matchId}.player.exited`, ({ playerId }) => {
      setPlayers((prevState) =>
        prevState.filter((player) => player.id !== playerId),
      )
    })

    return () => {
      socket.off(`match.${matchId}.user.joined`)
      socket.off(`match.${matchId}.user.exited`)

      socket.emit(`match.exit`, { matchId, playerId: user?.id })
    }
  }, [matchId, user?.id])

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
        {players.map((player) => (
          <Text key={player.id}>{player.name}</Text>
        ))}
      </SafeAreaView>
    </>
  )
}
