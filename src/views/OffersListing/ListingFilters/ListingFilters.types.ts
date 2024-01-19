export interface ListingFiltersProps {
  loading: boolean
}

export interface ListingFiltersData {
  priceFrom: string
  priceTo: string
  roomsFrom: string
  roomsTo: string
}

export interface ListingFiltersEmits {
  (e: 'search', payload: ListingFiltersData): void
}
