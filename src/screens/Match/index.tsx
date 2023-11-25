import { useMemo, useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { PageHeader } from '@/components/PageHeader'
import { api } from '@/lib/api'
import { useLoadingStore } from '@/stores/loading'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Card } from './Card'
import { Player } from './Player'

const players = ['A', 'B', 'C', 'D', 'E', 'F']
const playerId = 'D'

export function Match() {
  const navigation = useNavigation()
  const route = useRoute()

  const setLoading = useLoadingStore((state) => state.setLoading)

  const params = route.params as { id: string }

  const [backAlertVisible, setBackAlertVisible] = useState(false)

  const playersPreProcessed = useMemo(
    () => [
      ...players.slice(players.indexOf(playerId) + 1),
      ...players.slice(0, players.indexOf(playerId)),
    ],
    [],
  )
  const playersPreProcessedLength = playersPreProcessed.length

  console.log(playersPreProcessed)

  const bottom = playerId
  const left = useMemo(() => {
    if (playersPreProcessedLength === 2 || playersPreProcessedLength === 3) {
      return [playersPreProcessed[0]]
    }

    if (playersPreProcessedLength === 4) {
      return [playersPreProcessed[0]]
    }

    if (playersPreProcessedLength === 5 || playersPreProcessedLength === 6) {
      return [playersPreProcessed[0], playersPreProcessed[1]]
    }

    if (playersPreProcessedLength === 7 || playersPreProcessedLength === 8) {
      return [
        playersPreProcessed[0],
        playersPreProcessed[1],
        playersPreProcessed[2],
      ]
    }

    return []
  }, [playersPreProcessedLength, playersPreProcessed])
  const top = useMemo(() => {
    if (playersPreProcessedLength === 1) {
      return playersPreProcessed
    }
    if (playersPreProcessedLength === 3) {
      return [playersPreProcessed[1]]
    }
    if (playersPreProcessedLength === 4) {
      return [playersPreProcessed[1], playersPreProcessed[2]]
    }
    if (playersPreProcessedLength === 5) {
      return [playersPreProcessed[2]]
    }
    if (playersPreProcessedLength === 6) {
      return [playersPreProcessed[2], playersPreProcessed[3]]
    }
    if (playersPreProcessedLength === 7 || playersPreProcessedLength === 8) {
      return [playersPreProcessed[3], playersPreProcessed[4]]
    }

    return []
  }, [playersPreProcessedLength, playersPreProcessed])
  const right = useMemo(() => {
    if (playersPreProcessedLength === 2) {
      return [playersPreProcessed[1]]
    }
    if (playersPreProcessedLength === 3) {
      return [playersPreProcessed[2]]
    }
    if (playersPreProcessedLength === 4) {
      return [playersPreProcessed[3]]
    }
    if (playersPreProcessedLength === 5) {
      return [playersPreProcessed[3], playersPreProcessed[4]]
    }
    if (playersPreProcessedLength === 6) {
      return [playersPreProcessed[4], playersPreProcessed[5]]
    }
    if (playersPreProcessedLength === 7) {
      return [playersPreProcessed[5], playersPreProcessed[6]]
    }

    if (playersPreProcessedLength === 8) {
      return [
        playersPreProcessed[5],
        playersPreProcessed[6],
        playersPreProcessed[7],
      ]
    }

    return []
  }, [playersPreProcessedLength, playersPreProcessed])

  async function handleExitMatch() {
    try {
      setLoading(true)

      await api.post(`/matches/${params.id}/exit`)

      navigation.goBack()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {backAlertVisible && (
        <Alert
          title="Exit game?"
          text="Do you really want to exit this game?"
          actionText="Yes, exit"
          onAction={handleExitMatch}
          cancelText="No, stay here"
          onCancel={() => setBackAlertVisible(false)}
        />
      )}

      <SafeAreaView className="flex-1">
        <PageHeader beforeBack={() => setBackAlertVisible(true)} />

        <View className="flex-row px-4 py-6 justify-center">
          <Card filled />
          <Card filled />
          <Card filled />
          <Card />
          <Card />
        </View>

        <View className="flex-1 px-[52px] py-7">
          <View className="flex-1 bg-zinc-200 rounded-[56px] justify-center">
            <View className="flex-row h-16 absolute bottom-[-32px] self-center">
              <Card filled />
              <Card filled />
            </View>

            {players.length > 2 && (
              <View className="flex-col-reverse w-14 absolute left-[-28px]">
                {left.map((item) => (
                  <Player key={item} />
                ))}
              </View>
            )}

            {(players.length === 2 || players.length > 3) && (
              <View className="flex-row h-14 absolute top-[-28px] self-center">
                {top.map((item) => (
                  <Player key={item} />
                ))}
              </View>
            )}

            {players.length > 2 && (
              <View className="w-14 absolute right-[-28px]">
                {right.map((item) => (
                  <Player key={item} />
                ))}
              </View>
            )}
          </View>
        </View>

        <View className="p-6">
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="text-xs">total</Text>
              <Text className="text-lg font-medium">$7600</Text>
            </View>

            <View className="flex-1 mx-3" />

            <View className="items-center flex-1">
              <Text className="text-xs">bet</Text>
              <Text className="text-lg font-medium">$1250</Text>
            </View>
          </View>

          <View className="flex-row mt-6">
            <Button title="Fold" className="flex-1" />
            <Button title="Check" className="flex-1 mx-3" />
            <Button title="Raise" className="flex-1" />
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}
