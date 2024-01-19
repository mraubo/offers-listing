<script setup lang="ts">
import { ListingItemProps } from '@/views/OffersListing/ListingItem/ListingItem.types'

defineProps<ListingItemProps>()
</script>
<template>
  <v-card class="pa-4">
    Lokalizacja: {{ localization }} <br />
    Cena: {{ price }} <br />
    Powierzchnia: {{ area }} m<sup>2</sup><br />
    Liczba pokoi: {{ rooms }} <br />
  </v-card>
</template>
