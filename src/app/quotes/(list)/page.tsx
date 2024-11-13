'use client'

import { useInfiniteQuotes } from '@/app/quotes/hooks/use-infinite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'

export default function QuotesPage() {
  const quotes = useInfiniteQuotes()
  console.log(quotes?.pages)

  return (
    <>
      {quotes?.pages.map(({ quotes }) => {
        return quotes.map(({ id, quote, author }) => {
          console.log(quote)
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
        })
      })}
    </>
  )
}
