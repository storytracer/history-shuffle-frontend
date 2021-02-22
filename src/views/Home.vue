<template>
  <section class="section">
    <div class="container is-max-desktop">
      <header class="has-text-centered">
        <h1 class="title is-1">Temopedia Shuffle</h1>
        <h2 class="subtitle is-3">Shuffle through Digital History collections</h2>
      </header>
      <div v-for="(item, index) in items" :key="index">
        <SourceCard :item="item" />
      </div>
      <div class="has-text-centered">
        <b-button @click="loadMore" class="is-large is-danger">
          <span class="icon">
            <i class="fas fa-random"></i>
          </span>
          <span>Shuffle some more…</span>
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>
import SourceCard from '@/components/SourceCard.vue'

import SupabaseService from '../Supabase.service'
const random = require("simple-random-number-generator")
const europeanaMaxItems = 15768212
const wdlMaxItems = 28005

export default {
  name: 'Home',
  data () {
    return {
      items: []
    }
  },
  components: {
    SourceCard
  },
  async created () {
    const supabaseService = new SupabaseService()
    this.supabase = supabaseService.getInstance()
  },
  methods: {
    async loadMore() {
      const randomEuropeanaRecordID = random({min: 1, max: europeanaMaxItems, integer: true})
      const randomWDLRecordID = random({min: 1, max: wdlMaxItems, integer: true})

      let { data, error } = await this.supabase
          .from('items')
          .select()
          .eq('id', randomEuropeanaRecordID)
      
      if (!error) {
          const europeanaItems = data
          const wdlItems = [{collection_id: 2, record_id: randomWDLRecordID, url: `https://www.wdl.org/en/item/${randomWDLRecordID}/`}]

          const newItems = wdlItems.concat(europeanaItems)

          this.items = this.items.concat(newItems)
          console.log(this.items)
      }
    }
  }
}
</script>

<style scoped>
header {
  margin-bottom: 2rem;
}
</style>
