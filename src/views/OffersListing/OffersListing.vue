<script setup lang="ts">
import FetchWrapper from '@/components/api/FetchWrapper/FetchWrapper.vue'
import OffersListingFilters from '@/views/OffersListing/ListingFilters/ListingFilters.vue'
import { computed, ref } from 'vue'
import { ListingFiltersData } from '@/views/OffersListing/ListingFilters/ListingFilters.types'
import ListingList from '@/views/OffersListing/ListingList/ListingList.vue'
import ListingFilters from '@/views/OffersListing/ListingFilters/ListingFilters.vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { toCurrency } from '@/helpers/currency'
import { isEmptyString } from '@/helpers/is-empty'
import { QueryVariables } from '@/views/OffersListing/OfferListing.types'

const listingFilters = ref<null | typeof ListingFilters>()

const page = ref(1)
const filters = ref<QueryVariables>({
  priceFrom: null,
  priceTo: null,
  roomsFrom: null,
  roomsTo: null
})

const queryVariables = computed(() => ({
  ...filters.value,
  numberOfResults: 32,
  pageNumber: page.value
}))

const { result, loading, error, refetch } = useQuery(
  //should be moved to separate file
  //and queries should be typed in apollo client
  gql`
    query fetch(
      $numberOfResults: Int!
      $pageNumber: Int!
      $priceFrom: String
      $priceTo: String
      $roomsFrom: Int
      $roomsTo: Int
    ) {
      searchProperties(
        searchFilters: {
          priceFrom: $priceFrom
          priceTo: $priceTo
          numberOfRoomsFrom: $roomsFrom
          numberOfRoomsTo: $roomsTo
        }
        numberOfResults: $numberOfResults
        pageNumber: $pageNumber
      ) {
        nodes {
          id
          locationShort
          price {
            amount
            currency
          }
          numberOfRooms
          totalArea
        }
        totalCount
      }
    }
  `,
  queryVariables
)

const listingItems = computed(() => {
  if (!result.value?.searchProperties?.nodes) return []
  //use any type for now, becouse of no types in apollo client
  return result.value?.searchProperties?.nodes.map((item: any) => ({
    id: item?.id,
    area: item?.totalArea || 'Brak danych',
    localization: item?.locationShort.join(' - ') || 'Brak danych',
    price: item?.price
      ? toCurrency(Number(item?.price?.amount), item?.price.currency)
      : 'Brak danych',
    rooms: item.numberOfRooms || 'Brak danych'
  }))
})

const length = computed(() =>
  Math.ceil(
    (result.value?.searchProperties?.totalCount || 0) / queryVariables.value.numberOfResults
  )
)

const triggerSearch = () => {
  if (listingFilters.value) {
    listingFilters.value.onSearch()
  }
}

const onSearch = (filtersPayload: ListingFiltersData) => {
  filters.value = {
    ...filtersPayload,
    roomsFrom: !isEmptyString(filtersPayload.roomsFrom) ? Number(filtersPayload.roomsFrom) : null,
    roomsTo: !isEmptyString(filtersPayload.roomsTo) ? Number(filtersPayload.roomsTo) : null
  }
  refetch()
}

const onRetry = () => {
  triggerSearch()
}

const onPageChange = () => {
  triggerSearch()
}
</script>
<template>
  <div>
    <OffersListingFilters :loading="loading" @search="onSearch" ref="listingFilters" />
    <FetchWrapper :loading="loading" :error="error" @retry="onRetry">
      <ListingList :listings="listingItems" />
    </FetchWrapper>
    <v-pagination
      v-if="length > 0"
      :length="length"
      v-model="page"
      @update:modelValue="onPageChange"
    />
  </div>
</template>
