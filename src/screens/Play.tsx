import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { PageHeader } from '@/components/PageHeader'

export function Play() {
  return (
    <SafeAreaView className="flex-1">
      <PageHeader title="play" />

      <Text>Play screen</Text>
    </SafeAreaView>
  )
}
