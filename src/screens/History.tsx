import { FlatList, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Empty } from '@/components/Empty'
import { PageHeader } from '@/components/PageHeader'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export function History() {
  const { data, isPending } = useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const response = await api.get('/matches')

      return response.data.matches
    },
  })

  return (
    <SafeAreaView className="flex-1">
      <PageHeader title="history" />

      {!data && isPending ? (
        <View className="flex-1 items-center justify-center">
          <Text>is loading...</Text>
        </View>
      ) : (
        <>
          {data.length ? (
            <FlatList
              className="p-6"
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="p-3 bg-zinc-200 mb-3">
                  <Text>{JSON.stringify(item, null, 2)}</Text>
                </View>
              )}
            />
          ) : (
            <Empty title="List empty" text="No matches found." />
          )}
        </>
      )}
    </SafeAreaView>
  )
}
