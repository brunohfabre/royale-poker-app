import { Onboarding } from '@/screens/Onboarding'
import { SignInEmail } from '@/screens/SignIn/SignInEmail'
import { SignInPassword } from '@/screens/SignIn/SignInPassword'
import { SignUpCode } from '@/screens/SignUp/SignUpCode'
import { SignUpEmail } from '@/screens/SignUp/SignUpEmail'
import { SignUpName } from '@/screens/SignUp/SignUpName'
import { SignUpPassword } from '@/screens/SignUp/SignUpPassword'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" component={Onboarding} />
      <Stack.Screen name="sign-in-email" component={SignInEmail} />
      <Stack.Screen name="sign-in-password" component={SignInPassword} />
      <Stack.Screen name="sign-up-name" component={SignUpName} />
      <Stack.Screen name="sign-up-email" component={SignUpEmail} />
      <Stack.Screen name="sign-up-code" component={SignUpCode} />
      <Stack.Screen name="sign-up-password" component={SignUpPassword} />
    </Stack.Navigator>
  )
}
