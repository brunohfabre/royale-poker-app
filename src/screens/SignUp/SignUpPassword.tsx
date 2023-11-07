import { useRef, useState } from 'react'
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

const passwordFormSchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type Params = {
  token: string
}

export function SignUpPassword() {
  const route = useRoute()
  const { token } = route.params as Params

  const setCredentials = useAuthStore((state) => state.setCredentials)
  const setLoading = useLoadingStore((state) => state.setLoading)

  const confirmPasswordInputRef = useRef<TextInput>(null)

  const [passwordInput, setPasswordInput] = useState('')
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('')

  function handleFocusConfirmPassword() {
    confirmPasswordInputRef.current?.focus()
  }

  async function handleSignUp() {
    try {
      setLoading(true)

      const { password } = passwordFormSchema.parse({
        password: passwordInput,
        confirmPassword: confirmPasswordInput,
      })

      const response = await api.post(
        '/password',
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

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
          <Text className="text-lg font-medium">Lastly, enter a password.</Text>

          <View className="mt-6">
            <Text className="text-sm">Password</Text>
            <TextInput
              placeholder="Password"
              className="h-12 bg-zinc-300 px-4 mt-1"
              returnKeyType="next"
              onSubmitEditing={handleFocusConfirmPassword}
              secureTextEntry
              onChangeText={setPasswordInput}
            />
          </View>

          <View className="mt-3">
            <Text className="text-sm">Confirm password</Text>
            <TextInput
              ref={confirmPasswordInputRef}
              placeholder="Confirm password"
              className="h-12 bg-zinc-300 px-4 mt-1"
              returnKeyType="done"
              onSubmitEditing={handleSignUp}
              secureTextEntry
              onChangeText={setConfirmPasswordInput}
            />
          </View>

          <Button title="Sign up" className="mt-auto" onPress={handleSignUp} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}
