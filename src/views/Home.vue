<template>
  <section class="section">
    <div class="container is-max-desktop">
      <h1 class="title is-1">#historyshuffle</h1>
      <SourceCard v-for="i in cards" :key="i" />
      <div class="has-text-centered">
        <b-button @click="loadMore">Load more…</b-button>
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
</style>
