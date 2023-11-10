import { io } from 'socket.io-client'

export const socket = io(process.env.EXPO_PUBLIC_API_URL ?? '')

socket.on('connect', () => console.log('socket connected'))

socket.on('error', () => console.log('socket error'))
