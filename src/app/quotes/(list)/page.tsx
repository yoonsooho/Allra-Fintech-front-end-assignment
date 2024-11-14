'use client'

import { useInfiniteQuotes } from '@/app/quotes/hooks/use-infinite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useFavoriteQuotes } from '../hooks/use-favorite-quotes'
import { quoteType } from '../type/quoteType'

export default function QuotesPage() {
  const {
    data: quotes,
    fetchNextPage,
    error,
    hasNextPage,
  } = useInfiniteQuotes()
  const { hasFavoriteId, favoriteQuotesChangeFn } = useFavoriteQuotes()
  if (error) throw Error
  if (quotes === undefined) return <h4>Loading...</h4>
  return (
    <>
      <InfiniteScroll
        dataLength={quotes?.pages.length || 1} // 데이터를 로드할 때 사용 하는 data 길이 (필수값)
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>마지막 페이지 입니다.</b>
          </p>
        }
      >
        {quotes?.pages.map(({ quotes }) => {
          return quotes.map((quote: quoteType) => {
            return (
              <QuoteCard
                key={quote.id}
                quote={quote.quote}
                author={quote.author}
                isFavorite={hasFavoriteId(quote.id)}
                onFavorite={() => favoriteQuotesChangeFn(quote)}
              />
            )
          })
        })}
      </InfiniteScroll>
    </>
  )
}
