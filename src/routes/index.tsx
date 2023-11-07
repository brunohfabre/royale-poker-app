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
}

declare global {
  export namespace ReactNavigation {
    export interface RootParamList extends RootStackParamList {}
  }
}

export function Routes() {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <AuthRoutes />
  }

  return <AppRoutes />
}
