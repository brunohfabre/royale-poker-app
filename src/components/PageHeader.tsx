import { Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { CaretLeft } from './icons/CaretLeft'

interface PageHeaderProps {
  title?: string
}

export function PageHeader({ title }: PageHeaderProps) {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <View className="flex-row px-6 pt-3 items-center justify-between">
      <TouchableOpacity onPress={handleGoBack} hitSlop={16}>
        <CaretLeft />
      </TouchableOpacity>

      {title && <Text className="uppercase text-sm font-medium">Title</Text>}

      <View className="w-6"></View>
    </View>
  )
}
