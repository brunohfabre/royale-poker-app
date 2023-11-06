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

const emailFormSchema = z.object({
  email: z.string().min(1).email(),
})

export function SignInEmail() {
  const navigation = useNavigation()

  const [emailInput, setEmailInput] = useState('')

  function handleNavigateToPassword() {
    try {
      const { email } = emailFormSchema.parse({ email: emailInput })

      navigation.navigate('sign-in-password', {
        email,
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
          <Text className="text-lg font-medium">What is your email?</Text>

          <View className="mt-6">
            <Text className="text-sm">Email</Text>
            <TextInput
              placeholder="Email"
              className="h-12 bg-zinc-300 px-4 mt-1"
              returnKeyType="next"
              onSubmitEditing={handleNavigateToPassword}
              onChangeText={setEmailInput}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>

          <Button
            title="Continue"
            className="mt-auto"
            onPress={handleNavigateToPassword}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}
