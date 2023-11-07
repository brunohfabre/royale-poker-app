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
import { api } from '@/lib/api'
import { useLoadingStore } from '@/stores/loading'
import { useNavigation, useRoute } from '@react-navigation/native'

type Params = {
  email: string
}

const codeFormSchema = z.object({
  verificationCode: z.string().length(6),
})

export function SignUpCode() {
  const navigation = useNavigation()
  const route = useRoute()
  const { email } = route.params as Params

  const setLoading = useLoadingStore((state) => state.setLoading)

  const [codeInput, setCodeInput] = useState('')

  async function handleVerifyCode() {
    try {
      setLoading(true)

      const { verificationCode } = codeFormSchema.parse({
        verificationCode: codeInput,
      })

      const response = await api.post('/verify-mail', {
        email,
        verificationCode,
      })

      navigation.navigate('sign-up-password', {
        token: response.data.token,
      })
    } catch (err) {
      if (err instanceof ZodError) {
        Alert.alert('Oh no!', err.errors[0].message)
      }
    } finally {
      setLoading(false)
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
