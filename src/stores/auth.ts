import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
  id: string
  name: string
}

type SetCredentialsData = {
  token: string
  user: User
}

type Store = {
  token: string
  user: User | null

  setCredentials: (data: SetCredentialsData) => void
  clearCredentials: () => void
}

export const useAuthStore = create(
  persist<Store>(
    (set) => ({
      token: '',
      user: null,
      setCredentials: ({ token, user }: SetCredentialsData) =>
        set(() => ({
          token,
          user,
        })),
      clearCredentials: () =>
        set(() => ({
          token: '',
          user: null,
        })),
    }),
    {
      name: 'royale-poker:auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
