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
import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource)

export default {
  data () {
    return {
      msg: 'hello',
      name: 'andy'
    }
  },
  ready: function () {
    this.$http.get('/zhihudaily/api/4/news/latest').then(function (response) {
      console.log(response.status)
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
