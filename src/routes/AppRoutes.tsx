import { useEffect, useState } from 'react'

import * as SplashScreen from 'expo-splash-screen'

import { Alert } from '@/components/Alert'
import { api } from '@/lib/api'
import { Account } from '@/screens/Account'
import { Dashboard } from '@/screens/Dashboard'
import { FindMatch } from '@/screens/FindMatch'
import { Friends } from '@/screens/Friends'
import { History } from '@/screens/History'
import { Lobby } from '@/screens/Lobby'
import { Match } from '@/screens/Match'
import { useAuthStore } from '@/stores/auth'
import { useLoadingStore } from '@/stores/loading'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator()

type MatchType = {
  id: string
}

export function AppRoutes() {
  const navigation = useNavigation()

  const setCredentials = useAuthStore((state) => state.setCredentials)
  const setLoading = useLoadingStore((state) => state.setLoading)

  const [appIsReady, setAppIsReady] = useState(false)
  const [matchInProgress, setMatchInProgress] = useState<MatchType | null>(null)

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get('/me')

        const { user, token, matchInProgress } = response.data

        if (matchInProgress) {
          setMatchInProgress(matchInProgress)
        }

        setCredentials({
          user,
          token,
        })
      } finally {
        setAppIsReady(true)
        await SplashScreen.hideAsync()
      }
    }

    loadUser()
  }, [setCredentials])

  function handleReturnToMatch() {
    if (!matchInProgress) {
      return
    }

    navigation.navigate('match', {
      id: matchInProgress?.id,
    })

    setMatchInProgress(null)
  }

  async function handleFinishMatch() {
    try {
      setLoading(true)

      await api.post(`/matches/${matchInProgress?.id}/exit`)

      setMatchInProgress(null)
    } finally {
      setLoading(false)
    }
  }

  if (!appIsReady) {
    return <></>
  }

  return (
    <>
      {matchInProgress && (
        <Alert
          title="Match in progress"
          text="Do you want to return to the match in progress?"
          actionText="Yes, return to match"
          onAction={handleReturnToMatch}
          cancelText="No, finish match"
          onCancel={handleFinishMatch}
        />
      )}

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="friends" component={Friends} />
        <Stack.Screen name="find-match" component={FindMatch} />
        <Stack.Screen name="history" component={History} />
        <Stack.Screen name="account" component={Account} />
        <Stack.Screen name="lobby" component={Lobby} />
        <Stack.Screen
          name="match"
          component={Match}
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </>
  )
}
