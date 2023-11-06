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
import { useAuthStore } from '@/stores/auth'
import { useRoute } from '@react-navigation/native'

const passwordFormSchema = z.object({
  password: z.string().min(6),
})

type Params = {
  email: string
}

export function SignInPassword() {
  const route = useRoute()
  const params = route.params as Params

  const setCredentials = useAuthStore((state) => state.setCredentials)

  const [passwordInput, setPasswordInput] = useState('')

  function handleSignIn() {
    try {
      const { password } = passwordFormSchema.parse({ password: passwordInput })

      setCredentials({
        token: password,
        user: {
          id: 'id',
          name: 'name',
        },
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
