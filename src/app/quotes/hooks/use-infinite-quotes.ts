import { useInfiniteQuery } from '@tanstack/react-query'

export const fetchQuotes = async ({ pageParam }: { pageParam: number }) => {
  const limit = 100
  const res = await fetch(
    `https://dummyjson.com/quotes?limit=${limit}&skip=${pageParam * limit}`
  )
  const result = await res.json()
  return result
}

export const useInfiniteQuotes = () => {
  const { data, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ['quotes'],
    // queryFn: ({ pageParam }) => fetchQuotes({ pageParam }), // 객체로 전달
    queryFn: ({ pageParam }) => fetchQuotes({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // lastPage의 데이터 확인 후 다음 pageParam 반환
      console.log(lastPage.quotes.length)
      console.log(allPages.length)
      return lastPage.quotes.length ? allPages.length + 1 : undefined
    },
  })

  return { data, fetchNextPage }
}
