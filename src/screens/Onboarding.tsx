import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/Button'
import { useNavigation } from '@react-navigation/native'

export function Onboarding() {
  const navigation = useNavigation()

  function navigateToSignUp() {
    navigation.navigate('sign-up-name')
  }

  function navigateToSignIn() {
    navigation.navigate('sign-in-email')
  }

  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1 bg-zinc-300">
        <View className="flex-1 items-center justify-center">
          <Text className="text-6xl font-medium">Royal</Text>
        </View>
      </SafeAreaView>

      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-end p-6">
          <Button title="I'm new here" onPress={navigateToSignUp} />

          <Button
            title="I already have an account"
            onPress={navigateToSignIn}
            variant="secondary"
            className="mt-3"
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
