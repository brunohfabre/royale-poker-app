import { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Alert } from '@/components/Alert'
import { PageHeader } from '@/components/PageHeader'
import { api } from '@/lib/api'
import { useLoadingStore } from '@/stores/loading'
import { useNavigation, useRoute } from '@react-navigation/native'

export function Match() {
  const navigation = useNavigation()
  const route = useRoute()

  const setLoading = useLoadingStore((state) => state.setLoading)

  const params = route.params as { id: string }

  const [backAlertVisible, setBackAlertVisible] = useState(false)

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
        <PageHeader title="game" beforeBack={() => setBackAlertVisible(true)} />

        <View className="flex-1 items-center justify-center">
          <Text>Game</Text>
        </View>
      </SafeAreaView>
    </>
  )
}
