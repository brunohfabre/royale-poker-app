import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { PageHeader } from '@/components/PageHeader'

export function Friends() {
  return (
    <SafeAreaView>
      <PageHeader title="friends" />

      <View className="flex-1 items-center justify-center">
        <Text>Friends screen</Text>
      </View>
    </SafeAreaView>
  )
}
