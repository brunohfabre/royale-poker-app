import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { PageHeader } from '@/components/PageHeader'

export function History() {
  return (
    <SafeAreaView className="flex-1">
      <PageHeader title="history" />

      <View className="flex-1 items-center justify-center">
        <Text>History screen</Text>
      </View>
    </SafeAreaView>
  )
}
