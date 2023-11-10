import { Alert } from 'react-native'

import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.log('ERROR', JSON.stringify(error, null, 2))

    if (error.code === 'ERR_NETWORK') {
      Alert.alert('Service unavailable', 'Please try again later.')

      return
    }

    if (error.response.data.message) {
      Alert.alert('Ops.', error.response.data.message)
    } else {
      Alert.alert('Ops.', error.message)
    }

    return Promise.reject(error)
  },
)
