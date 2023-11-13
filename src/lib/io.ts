import { io } from 'socket.io-client'

import { useAuthStore } from '@/stores/auth'

export const socket = io(process.env.EXPO_PUBLIC_API_URL ?? '', {
  extraHeaders: {
    userId: useAuthStore.getState().user?.id ?? '',
  },
})

socket.on('connect', () => console.log('socket connected'))

socket.on('error', () => console.log('socket error'))
