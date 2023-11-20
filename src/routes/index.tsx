import { useEffect, useState } from 'react'

import * as SplashScreen from 'expo-splash-screen'

import { useAuthStore } from '@/stores/auth'

import { AppRoutes } from './AppRoutes'
import { AuthRoutes } from './AuthRoutes'

type RootStackParamList = {
  onboarding: undefined

  'sign-in-email': undefined
  'sign-in-password': { email: string }

  'sign-up-name': undefined
  'sign-up-email': { name: string }
  'sign-up-code': { email: string }
  'sign-up-password': { token: string }

  dashboard: undefined
  friends: undefined
  'find-match': undefined
  history: undefined
  account: undefined
  lobby: {
    matchId: string
  }
  match: {
    id: string
  }
}

declare global {
  export namespace ReactNavigation {
    export interface RootParamList extends RootStackParamList {}
  }
}

SplashScreen.preventAutoHideAsync()

export function Routes() {
  const token = useAuthStore((state) => state.token)

  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function setAppReady() {
      setAppIsReady(true)

      await SplashScreen.hideAsync()
    }

    setAppReady()
  }, [])

  if (!appIsReady) {
    return <></>
  }

  if (!token) {
    return <AuthRoutes />
  }

  return <AppRoutes />
}
