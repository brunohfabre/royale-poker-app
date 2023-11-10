import { useState } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Alert } from '@/components/Alert'
import { PageHeader } from '@/components/PageHeader'
import { useNavigation } from '@react-navigation/native'

export function Game() {
  const navigation = useNavigation()

  const [backAlertVisible, setBackAlertVisible] = useState(false)

  return (
    <>
      {backAlertVisible && (
        <Alert
          title="Close game?"
          text="Do you really want to finish this game?"
          actionText="Yes, finish"
          onAction={() => navigation.goBack()}
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
