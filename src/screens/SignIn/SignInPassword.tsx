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
import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'
import { useRoute } from '@react-navigation/native'

const passwordFormSchema = z.object({
  password: z.string().min(6),
})

type Params = {
  email: string
}

export function SignInPassword() {
  const route = useRoute()
  const { email } = route.params as Params

  const setCredentials = useAuthStore((state) => state.setCredentials)
  const setLoading = useLoadingStore((state) => state.setLoading)

  const [passwordInput, setPasswordInput] = useState('')

  async function handleSignIn() {
    try {
      setLoading(true)

      const { password } = passwordFormSchema.parse({ password: passwordInput })

      const response = await api.post('/sessions', {
        email,
        password,
      })

      setCredentials(response.data)
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
          <Text className="text-lg font-medium">Now enter your password.</Text>

          <View className="mt-6">
            <Text className="text-sm">Password</Text>
            <TextInput
              placeholder="Password"
              className="h-12 bg-zinc-300 px-4 mt-1"
              returnKeyType="done"
              onSubmitEditing={handleSignIn}
              secureTextEntry
              onChangeText={setPasswordInput}
            />
          </View>

          <Button title="Continue" className="mt-auto" onPress={handleSignIn} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}
