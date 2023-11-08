import { useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { PageHeader } from '@/components/PageHeader'
import { useAuthStore } from '@/stores/auth'

export function Account() {
  const clearCredentials = useAuthStore((state) => state.clearCredentials)

  const [signOutAlertVisible, setSignOutAlertVisible] = useState(false)

  function handleSignOut() {
    setSignOutAlertVisible(true)
  }

  function handleCancel() {
    setSignOutAlertVisible(false)
  }

  return (
    <>
      {signOutAlertVisible && (
        <Alert
          title="Sign out?"
          text="Really want to sign out?"
          actionText="Yes, sign out"
          onAction={clearCredentials}
          cancelText="Cancel"
          onCancel={handleCancel}
        />
      )}

      <SafeAreaView className="flex-1 justify-between">
        <PageHeader title="account" />

        <View className="p-6">
          <Button title="Sign out" onPress={handleSignOut} />
        </View>
      </SafeAreaView>
    </>
  )
}
