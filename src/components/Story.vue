<template>
  <tabbar>
    <tabbar-item>
      <span slot="label" class="icon icon-back"></span>
    </tabbar-item>
    <tabbar-item>
      <span slot="label" class="icon icon-unfold"></span>
    </tabbar-item>
    <tabbar-item>
      <span slot="label" class="icon icon-down"></span>
    </tabbar-item>
    <tabbar-item>
      <span slot="label" class="icon icon-xinxi"></span>
      <!-- <span slot="label">News</span> -->
    </tabbar-item>
  </tabbar>
  <scroller lock-x scrollbar-y use-pulldown use-pullup :pullup-status.sync="pullupStatus" :height="swiperHeight" :pulldown-status.sync="pulldownStatus" @pulldown:loading="refresh" @pullup:loading="load">
    <div class="wrap-container">
      <div class="img-wrap">
        <img class="headline-img" :src="data.image" alt="main Picture"/>
        <h1 class="headline-title">{{data.title}}</h1>
        <span class="img-source">图片: {{data.image_source}}</span>
      </div>
      <div id='body'>
      </div>
    </div>
    <!--pulldown slot-->
    <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
      <span v-show="pulldownStatus === 'default'"></span>
      <span class="pulldown-arrow" v-show="pulldownStatus === 'down' || pulldownStatus === 'up'" :class="{'rotate': pulldownStatus === 'up'}">↓</span>
      <span v-show="pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
    </div>
    <!--pullup slot-->
    <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; line-height: 40px; bottom: -40px; text-align: center;">
      <span v-show="pullupStatus === 'default'"></span>
      <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
      <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
    </div>
  </scroller>
  <loading :show="showLoading" :text="loadingText"></loading>
</template>

<script>
import Vue from 'vue'
import Resource from 'vue-resource'
import Tabbar from './tabbar/tabbar'
import TabbarItem from './tabbar/tabbar-item'
// import TabbarItem from 'vux/components/tabbar-item'
import Scroller from 'vux/components/scroller'
import Spinner from 'vux/components/spinner'
import Loading from 'vux/components/loading'
Vue.use(Resource)

export default {
  data () {
    return {
      data: {},
      id: this.$route.params.id,
      pulldownStatus: 'default',
      pullupStatus: 'default',
      showLoading: false,
      loadingText: 'loading..',
      swiperHeight: 'auto'
    }
  },
  ready: function () {
    this.$http.get('/zhihudaily/api/4/news/' + this.id).then(function (response) {
      this.data = response.data
      let body = document.getElementById('body')
      body.innerHTML = this.data.body
    })
    // this.swiperHeight = document.body.offsetHeight - 41 + 'px'
  },
  methods: {
    refresh: function (uuid) {
      const _this = this
      console.log('refresh')
      setTimeout(function () {
        _this.$broadcast('pulldown:reset', uuid)
      }, 2000)
    },
    load: function (uuid) {
      const _this = this
      console.log('load')
      setTimeout(function () {
        _this.$broadcast('pullup:reset', uuid)
        _this.$broadcast('scroller:reset', uuid)
      }, 2000)
    }
  },
  components: {
    Tabbar,
    TabbarItem,
    Scroller,
    Spinner,
    Loading
  },
  events: {
    'on-tabbar-item-click': function (index) {
      switch (index) {
        case '0': {
          const self = this
          setTimeout(function () {
            self.$router.go({path: '/'})
          }, 200)
        }
      }
    }
  },
  route: {
    data: function (transition) {
      this.showLoading = true
      setTimeout(function () {
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
@import "../assets/fonts/iconfont.css";

.wrap-container{
  max-width: 600px;
  min-height: 300px;
  margin: 0 auto;
}
.headline-img{
  margin-top: -18%;
  width: 100%;
  height: 100%;
}
.img-wrap{
  position: relative;
  max-height: 375px;
  overflow: hidden;
  margin-bottom: 4px;
}
.img-wrap .headline-title{
  z-index: 1;
  bottom: 10px;
  margin: 20px 0;
  position: absolute;
  color: #fff;
  text-shadow: 0px 1px 2px rgba(0,0,0,0.3);
}
.headline-title{
  font-size: 30px;
  line-height: 1.2em;
  padding: 0 40px;
}
.img-wrap .img-source{
  position: absolute;
  bottom: 10px;
  position: absolute;
  font-size: 12px;
  z-index: 1;
  color: rgba(255,255,255,.6);
  right: 40px;
  text-shadow: 0px 1px 2px rgba(0,0,0,.3);
}
body{
  background-color: #f6f6f6;
}
.question{
  background-color: #fff;
  padding:0 40px;
  overflow: hidden;
}
.question-title{
  font-size: 22px;
  line-height: 1.4em;
  color: #222;
  font-weight: bold;
  margin: 25px 0;
}
.meta{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px;
  color: #b8b8b8;
}
.meta img.avatar{
  display: inline-block;
}
.meta .avatar{
  width: 20px;
  height: 20px;
  border-radius: 2px;
  margin-right: 5px;
}
.meta span{
  vertical-align: middle;
}
.meta .author{
  color: #444;
}
.content{
  color: #444;
  line-height: 2em;
  margin: 10px 0 25px;
}
.content img{
  margin: 10px 0;
  display: block;
  max-width: 100%;
}
.content a{
  color: #105cb6;
  text-decoration: none;
}
.view-more{
  text-align: right;
  margin-bottom: 34px;
}
.view-more a{
  color: #689ebf;
  font-size: 14px;
  text-decoration: none;
}
img {
  vertical-align: middle;
  color: transparent;
  font-size: 0;
}
p{
  display: block;
  -webkit-margin-before: 1em;
  -webkit-margin-after: 1em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
}
blockquote{
  border-left: 3px solid #D0E5F2;
  /* font-style: normal; */
  padding: 0 0 0 .5em;
  margin: .5em 0;
  display: block;
  line-height: 1.7em;
  vertical-align: baseline;
  font-size: 100%;
}
blockquote{
  display: block;
  -webkit-margin-before: 1em;
  -webkit-margin-after: 1em;
  -webkit-margin-start: 40px;
  -webkit-margin-end: 40px;
}
i.icon {
    display: inline-block;
    vertical-align: middle;
    background-size: 100% auto;
    background-position: center;
    background-repeat: no-repeat;
    font-style: normal;
    position: relative;
}
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
