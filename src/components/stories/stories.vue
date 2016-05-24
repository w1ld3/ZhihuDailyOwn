<template>
  <div v-for="dayStories in storiesData">
    <div class="date-divider">
    {{dayStories.dateStr}}
    </div>
    <panel :list='dayStories.stories' style="margin-top: 0;"></panel>
  </div>
</template>

<script>
  import Panel from 'vux/components/panel'

  export default {
    props: {
      storiesData: Array
      // type: {
      //   type: Object,
      //   default: {}
      // }
    },
    components: {
      Panel
    }
  }
</script>
<style>
@import '~vux/vux.css';
.date-divider{
  width: 100%;
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  background-color: #06f;
  color: #fff;
  text-align: center;
}
</style>
