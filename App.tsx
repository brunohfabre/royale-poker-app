import { StatusBar } from 'expo-status-bar'

import { Loading } from '@/components/Loading'
import { Routes } from '@/routes'
import { useLoadingStore } from '@/stores/loading'
import { PortalProvider } from '@gorhom/portal'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  const loading = useLoadingStore((state) => state.loading)

  return (
    <PortalProvider>
      {loading && <Loading />}

      <NavigationContainer>
        <Routes />
      </NavigationContainer>

      <StatusBar style="dark" />
    </PortalProvider>
  )
}
