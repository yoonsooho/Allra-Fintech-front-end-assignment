import { useInfiniteQuery } from '@tanstack/react-query'

export const fetchQuotes = async ({ pageParam }: { pageParam: number }) => {
  const limit = 10
  const res = await fetch(
    `https://dummyjson.com/quotes?limit=${limit}&skip=${pageParam * limit}`
  )
  if (!res.ok) {
    throw Error
  }
  return res.json()
}

export const useInfiniteQuotes = () => {
  const { data, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['quotes'],
    queryFn: ({ pageParam }) => fetchQuotes({ pageParam }),
    initialPageParam: 0, //초기 페이지 값
    getNextPageParam: (lastPage, allPages) => {
      //lastPage : 현재 요청한 api 결과값
      //allPages : 지금까지 요청한 api의 결과값이 배열로 저장
      return lastPage.quotes.length ? allPages.length : undefined //api에서 값이 없을 경우 빈배열로 오기 때문에 lastPage.quotes.length로 판단
    },
  })
  return { data, fetchNextPage, error, hasNextPage }
}
