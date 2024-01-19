<script setup lang="ts">
import ListingItem from '@/views/OffersListing/ListingItem/ListingItem.vue'
import { ListingListProps } from '@/views/OffersListing/ListingList/ListingList.types'

defineProps<ListingListProps>()
</script>
<template>
  <div>
    <span v-if="listings.length === 0" class="d-block text-h4 mb-8 text-center">Brak danych</span>
    <v-row class="d-flex v-list" tag="ul">
      <v-col
        cols="4"
        class="listing-list__grid-item"
        tag="li"
        v-for="item in listings"
        :key="item.id"
      >
        <ListingItem
          class="ma-2"
          :area="item.area"
          :localization="item.localization"
          :price="item.price"
          :rooms="item.rooms"
          :id="item.id"
        />
      </v-col>
    </v-row>
  </div>
</template>
<style scoped lang="scss">
.listing-list {
  &__grid-item {
    list-style: none;
  }
}
</style>
