<template>
    <panel :list='data.stories'></panel>
</template>

<script>
import Panel from 'vux/components/panel'
import Vue from 'vue'
import Resource from 'vue-resource'
// import router from '../main.js'
// import router from '../main'

Vue.use(Resource)

export default {
  data () {
    return {
      data: {}
    }
  },
  ready: function () {
    this.$http.get('/zhihudaily/api/4/news/latest').then(function (response) {
      // this.data = response.data
      let index = 0
      for (index in response.data.stories) {
        response.data.stories[index].src = response.data.stories[index].images[0]
      }
      this.data = response.data
    })
  },
  components: {
    Panel
  },
  events: {
    'on-click-item': function (item) {
      console.log(JSON.stringify(item))
      this.$router.go({name: 'story', params: { id: item.id }})
      // router.go({name: 'story', params: { id: item.id }})
    }
  }
}
</script>

<style>
@import '~vux/vux.css';
</style>
