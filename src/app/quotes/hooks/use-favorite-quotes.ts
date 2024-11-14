import { useEffect, useState } from 'react'
import { quoteType } from '../type/quoteType'

export const useFavoriteQuotes = () => {
  const [preLocalStorageQuotes, setPreLocalStorageQuotes] = useState<
    quoteType[]
  >([])

  useEffect(() => {
    const storedQuotes =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('favoriteQuotes') || '[]')
        : []
    setPreLocalStorageQuotes(storedQuotes)
  }, []) //서버사이드에서 마운트시 500에러 발생으로 인한 조치

  const hasFavoriteId = (quoteId: number) => {
    return preLocalStorageQuotes.some(
      ({ id }: { id: number }) => id === quoteId
    )
  } // 로컬스토리지 데이터에 해당id를 가진 값이 있는지 확인

  const favoriteQuotesChangeFn = (quote: quoteType) => {
    if (hasFavoriteId(quote.id)) {
      const filterData = [...preLocalStorageQuotes].filter(
        ({ id }) => id !== quote.id
      )
      setPreLocalStorageQuotes(filterData)
      localStorage.setItem('favoriteQuotes', JSON.stringify(filterData))
    } else {
      const addData = [...preLocalStorageQuotes, quote]
      setPreLocalStorageQuotes(addData)
      localStorage.setItem('favoriteQuotes', JSON.stringify(addData))
    }
  }
  return { preLocalStorageQuotes, hasFavoriteId, favoriteQuotesChangeFn }
} // 즐겨찾기 별 아이콘 클릭시 사용하는 함수
