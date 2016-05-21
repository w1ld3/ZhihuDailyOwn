<template>
  <div class="wrap-container">
    <div class="img-wrap">
      <img class="headline-img" :src="data.image" alt="main Picture"/>
      <h1 class="headline-title">{{data.title}}</h1>
      <span class="img-source">图片: {{data.image_source}}</span>
    </div>
    <div id='body'>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource)

export default {
  data () {
    return {
      data: {},
      id: this.$route.params.id
    }
  },
  ready: function () {
    this.$http.get('/zhihudaily/api/4/news/' + this.id).then(function (response) {
      this.data = response.data
      let body = document.getElementById('body')
      body.innerHTML = this.data.body
    })
  }
}
</script>

<style>
@import '~vux/vux.css';

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
</style>
