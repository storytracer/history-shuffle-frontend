<template>
  <section class="section">
    <div class="container is-max-desktop">
      <header class="has-text-centered">
        <h1 class="title is-1">Tempopedia Shuffle</h1>
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
        <p class="is-size-5">
          <br>
          (…shuffled enough? Check out more Digital History collections and tools <br> in our directory on <a href="https://tempopedia.org/" target="_blank">tempopedia.org</a>!)
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import SourceCard from '@/components/SourceCard.vue'

import SupabaseService from '../Supabase.service'
const random = require("simple-random-number-generator")

export default {
  name: 'Home',
  data () {
    return {
      items: [],
      collections: [
      ]
    }
  },
  components: {
    SourceCard
  },
  async created () {
    const supabaseService = new SupabaseService()
    this.supabase = supabaseService.getInstance()

    let {data, error} = await this.supabase
      .from('collections')
      .select()
      .order('id', { ascending: false })

    if (!error) {
      const collections = data
      this.collections = collections

      this.loadMore();
    }
  },
  methods: {
    async loadMore() {
      this.collections.forEach(async (collection, index) => {
        const randomRecordID = random({min: 1, max: collection.total_items, integer: true})
        
        let { data, error } = await this.supabase
          .from(collection.table)
          .select()
          .eq('id', randomRecordID)
      
        if (!error) {
            const newItems = data
            this.items = this.items.concat(newItems)
        }
      })
    }
  }
}
</script>

<style scoped>
header {
  margin-bottom: 2rem;
}
</style>
