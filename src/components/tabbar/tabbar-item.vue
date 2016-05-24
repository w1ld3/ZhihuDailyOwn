<template>
  <a href="javascript:;" class="tabbar_item" :class="{'bar_item_on': selected}" @click="onClick">
    <div class="tabbar_icon" :class="{'vux-reddot': showDot}">
      <slot name="icon"></slot>
    </div>
    <p class="tabbar_label">
      <slot name="label"></slot>
    </p>
  </a>
</template>

<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    showDot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick: function () {
      this.$dispatch('on-item-click', this.$el.getAttribute('data-index'))
      this.selected = true
    }
  },
  events: {
    'on-item-click': function (dataIndex) {
      this.selected = this.$el.getAttribute('data-index') === dataIndex
    }
  }
}
</script>

<style>
.tabbar_item {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: #888;
    /*padding: 7px 0 0;*/
    -webkit-tap-highlight-color: transparent;
}
.bar_item_on {
  color: #66FF66;
}
.tabbar_icon {
    margin: 0 auto;
    width: 24px;
    /* height: 24px; */
}
.tabbar_label {
    text-align: center;
    font-size: 16px;
}
p {
  margin: 8px 0;
}
</style>
