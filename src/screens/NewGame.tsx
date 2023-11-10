import { View, Text } from 'react-native'

import { StatusBar } from 'expo-status-bar'

import { Button } from '@/components/Button'
import { useNavigation } from '@react-navigation/native'

export function NewGame() {
  const navigation = useNavigation()

  return (
    <>
      <View className="p-6">
        <Text>new game</Text>

        <Button
          title="Star"
          className="mt-6"
          onPress={() => navigation.navigate('game')}
        />
      </View>

      <StatusBar style="light" />
    </>
  )
}
