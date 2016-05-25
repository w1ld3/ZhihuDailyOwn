<template>
  <div class="weui_tabbar stay">
    <slot></slot>
  </div>
</template>

<script>
export default {
  ready () {
    const tabList = this.$el.querySelectorAll('.tabbar_item')
    this.tabNumber = tabList.length
    let n = 0
    for (let i of tabList) {
      i.setAttribute('data-index', n)
      n++
    }
  },
  events: {
    'on-item-click': function (index) {
      this.$broadcast('on-item-click', index)
      this.$dispatch('on-tabbar-item-click', index)
      return true
    }
  }
}
</script>
<style>
.stay{
  position: fixed;
  bottom: 0;
  z-index: 1;
}
</style>
