import { useEffect, useState } from 'react'

import { api } from '@/lib/api'
import { Account } from '@/screens/Account'
import { Dashboard } from '@/screens/Dashboard'
import { FindMatch } from '@/screens/FindMatch'
import { Friends } from '@/screens/Friends'
import { Game } from '@/screens/Game'
import { History } from '@/screens/History'
import { Lobby } from '@/screens/Lobby'
import { useAuthStore } from '@/stores/auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export function AppRoutes() {
  const setCredentials = useAuthStore((state) => state.setCredentials)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get('/me')

        const { user, token } = response.data

        setCredentials({
          user,
          token,
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [setCredentials])

  if (isLoading) {
    return <></>
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" component={Dashboard} />
      <Stack.Screen name="friends" component={Friends} />
      <Stack.Screen name="find-match" component={FindMatch} />
      <Stack.Screen name="history" component={History} />
      <Stack.Screen name="account" component={Account} />
      <Stack.Screen name="lobby" component={Lobby} />
      <Stack.Screen
        name="game"
        component={Game}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  )
}
