import { Account } from '@/screens/Account'
import { Dashboard } from '@/screens/Dashboard'
import { Friends } from '@/screens/Friends'
import { History } from '@/screens/History'
import { NewGame } from '@/screens/NewGame'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" component={Dashboard} />
      <Stack.Screen name="friends" component={Friends} />
      <Stack.Screen name="new-game" component={NewGame} />
      <Stack.Screen name="history" component={History} />
      <Stack.Screen name="account" component={Account} />
    </Stack.Navigator>
  )
}
