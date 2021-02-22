<template>
  <section class="section">
    <div class="container is-max-desktop">
      <header class="has-text-centered">
        <h1 class="title is-1">Temopedia Shuffle</h1>
        <h2 class="subtitle is-3">Shuffle through Digital History collections</h2>
        <div class="level has-text-centered">
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <b-button type="is-danger" outlined><span>Europeana</span></b-button>
              </p>
              <p class="control">
                <b-button type="is-danger" outlined><span>World Digital Library</span></b-button>
              </p>
            </div>
          </div>
        </div>
      </header>
      <SourceCard v-for="i in cards" :key="i" />
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
export default {
  name: 'Home',
  data () {
    return {
      cards: 2
    }
  },
  components: {
    SourceCard
  },
  methods: {
    loadMore() {
      this.cards = this.cards + 2;
    }
  }
}
</script>

<style scoped>
header {
  margin-bottom: 2rem;
}
</style>
