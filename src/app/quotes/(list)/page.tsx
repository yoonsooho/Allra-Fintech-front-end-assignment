'use client'

import {
  useInfiniteQuotes,
  fetchQuotes,
} from '@/app/quotes/hooks/use-infinite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function QuotesPage() {
  const { data: quotes, fetchNextPage } = useInfiniteQuotes()
  console.log(quotes?.pages)

  return (
    <>
      <InfiniteScroll
        dataLength={quotes?.pages.length || 1} //This is important field to render the next data
        next={fetchNextPage}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={fetchNextPage}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        {quotes?.pages.map(({ quotes }) => {
          return quotes.map(
            ({
              id,
              quote,
              author,
            }: {
              id: number
              quote: string
              author: string
            }) => {
              return (
                <QuoteCard
                  key={id}
                  quote={quote}
                  author={author}
                  isFavorite={false}
                  onFavorite={() => {
                    console.log('Clicked on favorite')
                  }}
                />
              )
            }
          )
        })}
      </InfiniteScroll>
    </>
  )
}
