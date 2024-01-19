<script setup lang="ts">
import {
  ListingFiltersData,
  ListingFiltersEmits,
  ListingFiltersProps
} from '@/views/OffersListing/ListingFilters/ListingFilters.types'
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, minValue } from '@vuelidate/validators'
import { vuelidateErrorExtractor, errorMessages } from '@/helpers/validation'

defineProps<ListingFiltersProps>()
const emit = defineEmits<ListingFiltersEmits>()
const filters = reactive<ListingFiltersData>({
  priceFrom: '',
  priceTo: '',
  roomsFrom: '',
  roomsTo: ''
})

const fiterslLabels = {
  priceFrom: 'Cena od',
  priceTo: 'Cena do',
  roomsFrom: 'Liczba pokoi od',
  roomsTo: 'Liczba pokoi do'
}

const minValueValidator = helpers.withMessage(errorMessages.cannotBeSmaller('0'), minValue(0))
const rules = {
  priceFrom: {
    minNumber: minValueValidator,
    maxValue: helpers.withMessage(
      errorMessages.cannotBeGreaterThenField(fiterslLabels.priceTo),
      () => {
        if (filters.priceTo !== '') {
          return Number(filters.priceFrom) <= Number(filters.priceTo)
        }
        return true
      }
    )
  },
  priceTo: {
    minNumber: minValueValidator,
    minValue: helpers.withMessage(
      errorMessages.cannotBeSmallerThenField(fiterslLabels.priceFrom),
      () => {
        if (filters.priceTo !== '') {
          return Number(filters.priceTo) >= Number(filters.priceFrom)
        }
        return true
      }
    )
  },
  roomsFrom: {
    minNumber: minValueValidator,
    maxValue: helpers.withMessage(
      errorMessages.cannotBeGreaterThenField(fiterslLabels.roomsTo),
      () => {
        if (filters.roomsTo !== '') {
          return Number(filters.roomsFrom) <= Number(filters.roomsTo)
        }
        return true
      }
    )
  },
  roomsTo: {
    minNumber: minValueValidator,
    minValue: helpers.withMessage(
      errorMessages.cannotBeSmallerThenField(fiterslLabels.roomsFrom),
      () => {
        if (filters.roomsTo !== '') {
          return Number(filters.roomsTo) >= Number(filters.roomsFrom)
        }
        return true
      }
    )
  }
}
const v$ = useVuelidate(rules, filters)
const onSearch = () => {
  v$.value.$touch()

  if (v$.value.$invalid) {
    return
  }
  v$.value.$reset()

  emit('search', filters)
}

defineExpose({
  onSearch
})
</script>
<template>
  <div>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-text-field
              v-model="filters.priceFrom"
              :label="fiterslLabels.priceFrom"
              variant="outlined"
              type="number"
              dense
              :error-messages="vuelidateErrorExtractor(v$['priceFrom'].$errors)"
            />
            {{}}
          </v-col>
          <v-col>
            <v-text-field
              v-model="filters.priceTo"
              :label="fiterslLabels.priceTo"
              variant="outlined"
              type="number"
              dense
              :error-messages="vuelidateErrorExtractor(v$['priceTo'].$errors)"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-text-field
              v-model="filters.roomsFrom"
              :label="fiterslLabels.roomsFrom"
              variant="outlined"
              type="number"
              dense
              :error-messages="vuelidateErrorExtractor(v$['roomsFrom'].$errors)"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="filters.roomsTo"
              :label="fiterslLabels.roomsTo"
              variant="outlined"
              type="number"
              dense
              :error-messages="vuelidateErrorExtractor(v$['roomsTo'].$errors)"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-btn :loading="loading" color="primary" @click="onSearch" height="56">Szukaj</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
