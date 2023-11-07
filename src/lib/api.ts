import { Alert } from 'react-native'

import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://172.20.18.172:3333',
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.log('ERROR', JSON.stringify(error, null, 2))

    if (error.response.data.message) {
      Alert.alert('Ops.', error.response.data.message)
    } else {
      Alert.alert('Ops.', error.message)
    }

    return Promise.reject(error)
  },
)
