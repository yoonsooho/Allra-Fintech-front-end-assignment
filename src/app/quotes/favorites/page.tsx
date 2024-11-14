'use client'
import { useFavoriteQuotes } from '@/app/quotes/hooks/use-favorite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { quoteType } from '../type/quoteType'

export default function FavoriteQuotesPage() {
  const {
    preLocalStorageQuotes: favoriteQuotes,
    hasFavoriteId,
    favoriteQuotesChangeFn,
  } = useFavoriteQuotes()

  return (
    <div>
      <h1
        className={'mb-4 text-3xl font-bold italic text-secondary-foreground'}
      >
        My Favorite
      </h1>
      <ul>
        {favoriteQuotes.map((quote: quoteType) => (
          <QuoteCard
            key={quote.id}
            quote={quote.quote}
            author={quote.author}
            isFavorite={hasFavoriteId(quote.id)}
            onFavorite={() => {
              favoriteQuotesChangeFn(quote)
            }}
          />
        ))}
      </ul>
    </div>
  )
}
