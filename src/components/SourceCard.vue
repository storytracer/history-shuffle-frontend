<template>
    <link-prevue v-if="item" :url="item.url" cardWidth="100%">
        <template slot-scope="props">
            <a v-bind:href="item.url" target="_blank">
                <article class="media source-card box">
                    <figure class="media-left">
                        <p class="image is-128x128">
                            <img :src="props.img" :alt="props.title" />
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p class="source-card-collection">Europeana</p>
                            <h4><v-clamp autoresize :max-lines="5">{{props.title}}</v-clamp></h4>
                            <v-clamp autoresize :max-lines="5">
                                {{props.description}}
                            </v-clamp>
                        </div>
                    </div>
                </article>
            </a>
        </template>
        <template slot="loading">
            <div class="source-card-loading box has-text-centered">
                <span class="icon is-large">
                    <i class="fas fa-spinner fa-spin fa-2x"></i>
                </span>
            </div>
        </template>
    </link-prevue>
</template>

<script>
import LinkPrevue from 'link-prevue'
import VClamp from 'vue-clamp'
import PostgrestService from '../Postgrest.service'
const random = require("simple-random-number-generator")

export default {
  name: 'SourceCard',
  components: {
    LinkPrevue,
    VClamp
  },
  data () {
    return {
        item: null,
        isLoading: true
    }
  },
  async created () {
    const postgrest = new PostgrestService()
    this.postgrest = postgrest.getInstance()
    const { data, error } = await this.postgrest
        .from('items')
        .select()
        .eq('id', random({min: 1, max: 15768212, integer: true}))
    if (!error) {
        this.item = data[0]
    }
  }
}
</script>

<style scoped>
.source-card img {
    max-height: 128px;
}

.source-card {
    margin-bottom: 2rem;
}

.source-card-loading {
    margin-bottom: 2rem;
}

.content p.source-card-collection {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.content h4 {
    margin-bottom: 0.5rem;
}
</style>