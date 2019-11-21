<template>
  <div class="home-content layout-content">
    <Row>
        <i-col :xs="24" :sm="24" :md="24" :lg="17">
        <Card v-for="poem in poems">
        <h3>{{poem.title}}</h3>
        {{poem.auth_name}}
        <p v-html="poem.content"></p>
        
        </Card>
        </i-col>
        <i-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <!-- <recommend></recommend> -->
          <!-- <tag-wall style="margin-top: 15px;"></tag-wall> -->
          <div class="poem-right-side">
            <poem-search-view
              @search="search"
            ></poem-search-view>
            <div class="random-button-wapper">
              <Button @click="getRandomPoem()">随机一首</Button>
            </div>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PoemSearchView from "@/components/views/PoemSearchView"

export default {
  components: {
    PoemSearchView
  },
  computed: {
    ...mapState({
      poems: state => state.poem.poems
    })
  },
  beforeRouteUpdate(to, from, next) {
    next();
    console.log("beforeRouteUpdate");
    // this.id = this.$route.params.id;
    // this.browse_auth = this.$route.query.browse_auth;
    // this.refreshData();
  },
  beforeDestroy() {
    // 导航离开时清空vuex中数据
    //   this.clearArticleInfo();
    // 恢复通栏
    //   this.resetExpandColumn();
    //   if (this.tocbotControl !== undefined) {
    //     console.log('tocbot destroyed');
    //     this.tocbotControl.destroy();
    //   }
  },
  methods: {
    ...mapActions({
      getPoemInfo: "poem/GET_POEM_INFO"
    }),
    getRandomPoem() {
      this.getPoemInfo({
      params: {
        params: {
          limit: 1,
          offset: Math.ceil(Math.random()*10000)
        }
      }
    }).then(res => {

    }); 
    },
    search(e) {
      this.getPoemInfo({
      params: {
        params: {
          search: e
        }
      }
    }).then(res => {

    }) 
    } 
  },
  beforeMount() {
    this.getPoemInfo({
      params: {
        params: {
          search: '李白',
          limit: 3,
        //   offset: Math.ceil(Math.random()*10000)
        }
      }
    }).then(res => {

    });
  }
};
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .poem-right-side {
    width 360px
    position: relative
    height 120px;
    border : 1px;
    // background-color : #333333;
    margin-left :20px;
  }
  .random-button-wapper {
    margin auto
    width 80px
  }
</style>
