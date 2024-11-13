import { useInfiniteQuery } from '@tanstack/react-query'

export const fetchQuotes = async ({ pageParam }: { pageParam: number }) => {
  const res = await fetch(
    `https://dummyjson.com/quotes?limit=10&skip=${pageParam * 10}`
  )
  const result = await res.json()
  return result
}

export const useInfiniteQuotes = () => {
  const { data } = useInfiniteQuery({
    queryKey: ['quotes'],
    queryFn: ({ pageParam }) => fetchQuotes({ pageParam }), // 객체로 전달
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // lastPage의 데이터 확인 후 다음 pageParam 반환
      return lastPage.quotes.length ? allPages.length : undefined
    },
  })

  return data
}
