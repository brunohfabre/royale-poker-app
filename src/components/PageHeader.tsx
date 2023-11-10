import { Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { CaretLeft } from './icons/CaretLeft'

interface PageHeaderProps {
  title?: string
  beforeBack?: () => void
}

export function PageHeader({ title, beforeBack }: PageHeaderProps) {
  const navigation = useNavigation()

  function handleGoBack() {
    if (beforeBack) {
      beforeBack()

      return
    }

    navigation.goBack()
  }

  return (
    <View className="flex-row px-6 pt-3 items-center justify-between">
      <TouchableOpacity onPress={handleGoBack} hitSlop={16}>
        <CaretLeft />
      </TouchableOpacity>

      {title && (
        <Text className="uppercase text-sm font-medium">
          {title.toUpperCase()}
        </Text>
      )}

      <View className="w-6"></View>
    </View>
  )
}
