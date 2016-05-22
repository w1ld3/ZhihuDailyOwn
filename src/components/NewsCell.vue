<template>
  <swiper :list='data.top_stories' height="200px" :auto.sync="action">
    <p v-on:on-click-list-item="on-click-swiper-item">
      slot test
    </p>
  </swiper>
  <scroller lock-x scrollbar-y use-pulldown use-pullup :pullup-status.sync="pullupStatus" height="auto" :pulldown-status.sync="pulldownStatus" @pulldown:loading="refresh" @pullup:loading="load">
    <!--content slot-->
    <panel :list='data.stories'></panel>
    <!--pulldown slot-->
    <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
      <span v-show="pulldownStatus === 'default'"></span>
      <span class="pulldown-arrow" v-show="pulldownStatus === 'down' || pulldownStatus === 'up'" :class="{'rotate': pulldownStatus === 'up'}">↓</span>
      <span v-show="pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
    </div>
    <!--pullup slot-->
    <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
      <span v-show="pullupStatus === 'default'"></span>
      <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
      <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
    </div>
  </scroller>

</template>

<script>
import Panel from 'vux/components/panel'
import Swiper from 'vux/components/swiper'
import SwiperItem from 'vux/components/swiper-item'
import Scroller from 'vux/components/scroller'
import Spinner from 'vux/components/spinner'
import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

export default {
  data () {
    return {
      data: {},
      action: true,
      currentNewsDate: '0',
      pulldownStatus: 'default',
      pullupStatus: 'default'
    }
  },
  methods: {
    refresh: function (uuid) {
      const _this = this
      // refresh
      this.$http.get('/zhihudaily/api/4/news/latest').then(function (response) {
        // this.data = response.data

        let index = 0
        for (index in response.data.stories) {
          response.data.stories[index].src = response.data.stories[index].images[0]
          response.data.stories[index].url = '/stories/' + response.data.stories[index].id
        }
        index = 0
        for (index in response.data.top_stories) {
          response.data.top_stories[index].img = response.data.top_stories[index].image
        }
        this.data = response.data
      })
      setTimeout(function () {
        _this.$broadcast('pulldown:reset', uuid)
      }, 2000)
    },
    load: function (uuid) {
      const _this = this
      this.$http.get('/zhihudaily/api/4/news/before/' + this.currentNewsDate).then(function (response) {
        // this.data = response.data
        this.currentNewsDate = response.data.date
        let index = 0
        for (index in response.data.stories) {
          response.data.stories[index].src = response.data.stories[index].images[0]
          response.data.stories[index].url = '/stories/' + response.data.stories[index].id
          this.data.stories.push(response.data.stories[index])
        }
        index = 0
        for (index in response.data.top_stories) {
          response.data.top_stories[index].img = response.data.top_stories[index].image
        }
      })
      setTimeout(function () {
        _this.$broadcast('pullup:reset', uuid)
      }, 2000)
    }
  },
  ready: function () {
    this.$http.get('/zhihudaily/api/4/news/latest').then(function (response) {
      // this.data = response.data
      let index = 0
      for (index in response.data.stories) {
        response.data.stories[index].src = response.data.stories[index].images[0]
        response.data.stories[index].url = '/stories/' + response.data.stories[index].id
      }
      index = 0
      for (index in response.data.top_stories) {
        response.data.top_stories[index].img = response.data.top_stories[index].image
      }
      this.data = response.data
      this.currentNewsDate = response.data.date
    })
  },
  components: {
    Panel,
    Swiper,
    SwiperItem,
    Scroller,
    Spinner
  },
  events: {
    'on-click-item': function (item) {
      console.log(JSON.stringify(item))
      this.$router.go({name: 'story', params: { id: item.id }})
      // router.go({name: 'story', params: { id: item.id }})
    },
    'on-click-swiper-item': function (swiperItem) {
      console.log(swiperItem)
    }
  }
}
</script>

<style>
@import '~vux/vux.css';
.rotate {
  transform: rotate(-180deg);
}
.pulldown-arrow {
  display: inline-block;
  transition: all linear 0.2s;
  color: #666;
  font-size: 25px;
}
</style>
