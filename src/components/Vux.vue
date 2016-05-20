<template>
  <h1>{{msg}}:{{name}}</h1>
  <div>
    <group>
      <cell title="vue" value="cool"></cell>
      <cell :title="msg" :value="name"></cell>
    </group>
  </div>
</template>

<script>
import Group from 'vux/components/group'
import Cell from 'vux/components/cell'

var Vue = require('vue')

Vue.use(require('vue-resource'))

export default {
  data () {
    return {
      msg: 'hello',
      name: 'andy'
    }
  },
  ready: function () {
    this.$http.jsonp('/zhihudaily/api/4/news/latest').then(function (response) {
      console.log(response.ststus)
    })
  },
  components: {
    Group,
    Cell
  }
}
</script>

<style>
@import '~vux/vux.css';
</style>
