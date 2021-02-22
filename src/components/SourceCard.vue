<template>
    <link-prevue v-if="item" :url="item.url">
        <template slot-scope="props">
            <article class="media source-card box">
            <figure class="media-left">
                <p class="image is-128x128">
                    <a v-bind:href="item.url" target="_blank">
                        <img :src="props.img" :alt="props.title" />
                    </a>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>Europeana</strong>
                    </p>
                    <a v-bind:href="item.url" target="_blank">
                        <h4>{{props.title}}</h4>
                    </a>
                    <v-clamp autoresize :max-lines="3">
                        {{props.description}}
                    </v-clamp>
                    <p>
                        <a v-bind:href="props.url" target="_blank">More</a>
                    </p>
                </div>
            </div>
            </article>
        </template>

    </link-prevue>
</template>

<script>
import LinkPrevue from 'link-prevue'
import VClamp from 'vue-clamp'
import PostgrestService from '../Postgrest.service'

export default {
  name: 'SourceCard',
  components: {
    LinkPrevue,
    VClamp
  },
  data () {
    return {
        item: null
    }
  },
  async created () {
    const postgrest = new PostgrestService()
    this.postgrest = postgrest.getInstance()
    const { data, error } = await this.postgrest
        .rpc('randomitem')
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
</style>