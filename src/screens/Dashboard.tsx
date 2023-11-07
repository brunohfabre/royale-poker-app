import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import { useAuthStore } from '@/stores/auth'

export function Dashboard() {
  const clearCredentials = useAuthStore((state) => state.clearCredentials)

  function handleSignOut() {
    clearCredentials()
  }

  return (
    <View className="flex-1 p-6">
      <Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        perspiciatis enim eum libero, vero dolor autem culpa commodi aliquid
        quam aut a sequi ex possimus debitis unde nihil. Fuga, iusto?
      </Text>

      <SafeAreaView className="absolute left-0 right-0 bottom-0">
        <View className="m-6 h-16 flex-row bg-red-200">
          <TouchableOpacity className="flex-1">
            <Text>1</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1">
            <Text>2</Text>
          </TouchableOpacity>

          <TouchableOpacity className="px-4">
            <Text>New game</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1">
            <Text>3</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1" onPress={handleSignOut}>
            <Text>4</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}
