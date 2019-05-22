<template>
  <div class="side-toc hide-scrollbar">
    <panel :title="$t('others.toc')">
      <div id="side-toc" class="list" slot="content" ref="list">
      </div>
    </panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import Panel from '@/components/views/Panel';

  export default {
    name: 'side-toc',
    components: {
      'panel': Panel
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../assets/style/theme.styl";
  @import "../../assets/style/toc.styl";

  .side-toc
    position relative
    background #fff
    max-height 90vh
    overflow scroll
    h4
      font-size 18px
      line-height 18px
      text-align left
    .list
      position relative

</style>
