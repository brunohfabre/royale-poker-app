import { useState } from 'react'
import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ZodError, z } from 'zod'

import { Button } from '@/components/Button'
import { PageHeader } from '@/components/PageHeader'
import { useNavigation } from '@react-navigation/native'

const codeFormSchema = z.object({
  code: z.string().length(6),
})

export function SignUpCode() {
  const navigation = useNavigation()

  const [codeInput, setCodeInput] = useState('')

  function handleVerifyCode() {
    try {
      codeFormSchema.parse({ code: codeInput })

      navigation.navigate('sign-up-password', {
        token: 'token',
      })
    } catch (err) {
      if (err instanceof ZodError) {
        Alert.alert('Oh no!', err.errors[0].message)
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1">
        <PageHeader />

        <View className="flex-1 p-6">
          <Text className="text-lg font-medium">
            Enter the code we sent to your email.
          </Text>

          <View className="mt-6">
            <Text className="text-sm">Code</Text>
            <TextInput
              placeholder="Name"
              className="h-12 bg-zinc-300 px-4 mt-1"
              returnKeyType="next"
              onSubmitEditing={handleVerifyCode}
              onChangeText={setCodeInput}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          <Button
            title="Verify code"
            className="mt-auto"
            onPress={handleVerifyCode}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}
