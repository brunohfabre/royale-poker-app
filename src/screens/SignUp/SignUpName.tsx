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

const nameFormSchema = z.object({
  name: z.string().min(1),
})

export function SignUpName() {
  const navigation = useNavigation()

  const [nameInput, setNameInput] = useState('')

  function handleNavigateToPassword() {
    try {
      const { name } = nameFormSchema.parse({ name: nameInput })

      navigation.navigate('sign-up-email', {
        name,
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
          <Text className="text-lg font-medium">What is your name?</Text>

          <View className="mt-6">
            <Text className="text-sm">Name</Text>
            <TextInput
              placeholder="Name"
              className="h-12 bg-zinc-300 px-4 mt-1"
              returnKeyType="next"
              onSubmitEditing={handleNavigateToPassword}
              onChangeText={setNameInput}
              autoCorrect={false}
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
