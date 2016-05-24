<template>
  <swiper :list="topStories" height="200px" :auto.sync="action">
  </swiper>
  <scroller lock-x scrollbar-y use-pulldown use-pullup :pullup-status.sync="pullupStatus" height="auto" :pulldown-status.sync="pulldownStatus" @pulldown:loading="refresh" @pullup:loading="load">
    <!--content slot-->
    <stories :stories-data="data"></stories>
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
  <loading :show="showLoading" :text="loadingText"></loading>
</template>

<script>
import Swiper from 'vux/components/swiper'
// import Swiper from './swiper/swiper'
import SwiperItem from 'vux/components/swiper-item'
import Scroller from 'vux/components/scroller'
import Spinner from 'vux/components/spinner'
import Loading from 'vux/components/loading'
import Stories from './stories/stories'
import Vue from 'vue'
import Resource from 'vue-resource'
import DateChange from '../dateChange.js'

Vue.use(Resource)

export default {
  data () {
    return {
      data: [],
      currentNewsDate: '0',
      topStories: [],
      action: true,
      pulldownStatus: 'default',
      pullupStatus: 'default',
      showLoading: false,
      loadingText: 'loading..'
    }
  },
  methods: {
    refresh: function (uuid) {
      const _this = this
      // refresh
      this.$http.get('/zhihudaily/api/4/news/latest').then(function (response) {
        // backend proxy so get a 200 OK not 304 Not Modified
        // console.log(response.status)
        let index = 0
        if (response.data.date === this.data[0].date) {
          this.data.shift()
        } else {
          this.currentNewsDate = response.data.date
          response.data.dateStr = DateChange(response.data.date)
        }

        for (index in response.data.stories) {
          response.data.stories[index].src = response.data.stories[index].images[0]
          response.data.stories[index].url = '/stories/' + response.data.stories[index].id
        }
        index = 0
        for (index in response.data.top_stories) {
          response.data.top_stories[index].img = response.data.top_stories[index].image
        }
        this.data.unshift(response.data)
        this.topStories = response.data.top_stories
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
        response.data.dateStr = DateChange(response.data.date)
        let index = 0
        for (index in response.data.stories) {
          response.data.stories[index].src = response.data.stories[index].images[0]
          response.data.stories[index].url = '/stories/' + response.data.stories[index].id
        }
        this.data.push(response.data)
      })
      setTimeout(function () {
        _this.$broadcast('pullup:reset', uuid)
      }, 2000)
    }
  },
  ready: function () {
    this.$http.get('/zhihudaily/api/4/news/latest').then(function (response) {
      // this.data = response.data
      response.data.dateStr = DateChange(response.data.date)
      let index = 0
      for (index in response.data.stories) {
        response.data.stories[index].src = response.data.stories[index].images[0]
        response.data.stories[index].url = '/stories/' + response.data.stories[index].id
      }
      index = 0
      for (index in response.data.top_stories) {
        response.data.top_stories[index].img = response.data.top_stories[index].image
      }
      this.data.push(response.data)
      this.currentNewsDate = response.data.date
      this.topStories = response.data.top_stories
    })
  },
  components: {
    Swiper,
    SwiperItem,
    Scroller,
    Spinner,
    Loading,
    Stories
  },
  events: {
    'on-click-item': function (item) {
      const self = this
      self.showLoading = true
      setTimeout(function () {
        self.showLoading = false
        self.$router.go({name: 'story', params: { id: item.id }})
      }, 200)
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
