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
import fetchStories from '../modules/ajax/fetchStories.js'
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
      const self = this
      fetchStories(self)
      setTimeout(function () {
        self.$broadcast('pulldown:reset', uuid)
      }, 2000)
    },
    load: function (uuid) {
      const self = this
      fetchStories(self, 'loadOld')
      setTimeout(function () {
        self.$broadcast('pullup:reset', uuid)
      }, 2000)
    }
  },
  ready: function () {
    if (window.sessionStorage.getItem('storiesData')) {
      // console.log('get from sessionStorage')
      this.data = JSON.parse(window.sessionStorage.getItem('storiesData'))
      this.currentNewsDate = this.data[0].date
      this.topStories = this.data[0].top_stories
      // window.sessionStorage.setItem('scroll', 0)
    } else {
      const self = this
      console.log(self)
      fetchStories(self)
      // console.log('get from intenert')
    }
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
      window.sessionStorage.setItem('scroll', window.scrollY)
      setTimeout(function () {
        self.$router.go({name: 'story', params: { id: item.id }})
      }, 200)
    },
    'on-click-swiper-item': function (swiperItem) {
      // no function
      console.log(swiperItem)
    },
    'loading': function () {
      this.showLoading = true
    }
  },
  route: {
    data: function (transition) {
      this.showLoading = true
      setTimeout(function () {
        let y = window.sessionStorage.getItem('scroll')
        // if (window.scrollTo) {
        //   console.log(y)
        // }
        window.scroll(0, y)
        transition.next({
          showLoading: false
        })
      }, 100)
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
