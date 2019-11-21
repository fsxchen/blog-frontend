<template>
  <div class="book-cell cell-theme">
    <Row type="flex">
      <i-col :xs="24" :sm="24" :md="textSpan" :lg="textSpan" :order="textOrderType"
             style="padding-left: 0;padding-right: 0;">
        <div class="text-wrapper">
          <h4 class="title">
            <i-tool-tip placement="right" :content="$t('book.authTip')" v-if="book.need_auth">
              <Icon type="android-lock" color="#FA5555" v-if="book.need_auth"></Icon>&nbsp;
            </i-tool-tip>
            <nuxt-link @click.prevent="gotoPostDetail(book)" :to="
                    localePath({
                      name: 'books-id',
                      params: {id: book.id}
                    })">
              <Icon type="ios-book"></Icon>&nbsp;&nbsp;{{book[resolveI18N('title')]}}
            </nuxt-link>
            <span class="special" v-if="book.index > 0" :title="$t('others.stickyTip')">{{ $t('others.sticky') }}</span>
          </h4>
          <div class="tags">
            <Tag :color="tag.color" type="border" v-for="tag in book.tags" :key="tag.id" class="border-tag">
              {{tag[resolveI18N('name')]}}
            </Tag>
          </div>
          <p class="desc">{{book[resolveI18N('desc')] | textLineBreak(70) }}
            <nuxt-link @click.prevent="gotoPostDetail(book)" :to="
                    localePath({
                      name: 'books-id',
                      params: {id: book.id}
                    })"> View More
              <Icon type="arrow-right-b"></Icon>
            </nuxt-link>
          </p>
          <p class="operate_info">
            <span class="publish-time"><a>{{ book.add_time | socialDate }}</a></span>
            <span class="readings"><a><Icon type="eye"></Icon> {{book.click_num}} {{ $t("book.read") }}</a></span>
            <span class="comments"><a><Icon type="compose"></Icon> {{book.comment_num}} {{ $t("book.comments") }}</a></span>
            <span class="likes"><a @click="likePost(book)"><Icon type="heart"></Icon> {{book.like_num}} {{ $t("book.likes") }}</a></span>
          </p>
        </div>
      </i-col>
      <i-col :xs="0" :sm="0" :md="imgSpan" :lg="imgSpan" :order="imgOrderType"
             style="padding-left: 0;padding-right: 0">
        <div class="img-wrapper" :class="themeClass">
          <img :src="book.front_image" alt="">
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '~/api/client-api';
  import {checkPostAuth, mixin} from '@/utils/js/utils';

  const ARTICLE_TYPE_NO_IMAGE = 0;
  const ARTICLE_TYPE_NORMAL_IMAGE = 1;
  const ARTICLE_TYPE_BIG_IMAGE = 2;

  export default {
    name: 'book-cell',
    props: {
      book: {
        Type: Object
      }
    },
    mixins: [mixin],
    computed: {
      textOrderType: function () {
        return parseInt(this.book.front_image_type) === ARTICLE_TYPE_BIG_IMAGE ? 2 : 1;
      },
      imgOrderType: function () {
        return parseInt(this.book.front_image_type) === ARTICLE_TYPE_BIG_IMAGE ? 1 : 2;
      },
      textSpan: function () {
        switch (parseInt(this.book.front_image_type)) {
          case ARTICLE_TYPE_NO_IMAGE:
            return 24;
          case ARTICLE_TYPE_NORMAL_IMAGE:
            return 17;
          case ARTICLE_TYPE_BIG_IMAGE:
            return 24;
          default:
            return 24;
        }
      },
      imgSpan: function () {
        switch (parseInt(this.book.front_image_type)) {
          case ARTICLE_TYPE_NO_IMAGE:
            return 0;
          case ARTICLE_TYPE_NORMAL_IMAGE:
            return 7;
          case ARTICLE_TYPE_BIG_IMAGE:
            return 24;
          default:
            return 0;
        }
      },
      themeClass: function () {
        if (parseInt(this.book.front_image_type) === ARTICLE_TYPE_BIG_IMAGE) {
          return 'big-image';
        } else {
          return '';
        }
      }
    },
    methods: {
      gotoPostDetail(post) {
        checkPostAuth.call(this, post, '提示', '该文章已加密，您需要输入阅读密码', () => {
          this.$router.push({name: post.post_type+'s', params: {id: post.id}});
        }, (encryptedBrowseAuth) => {
          this.$router.push({
            name: post.post_type + 's',
            params: {id: post.id},
            query: {browse_auth: encryptedBrowseAuth}
          });
        }, (error) => {
          console.log(error);
          this.$Notice.error({
            title: '密码错误'
          });
        });
      },
      likePost(post) {
        API.addPostLike({
          post_id: post.id
        }).then((response) => {
          post.like_num += 1;
          this.$Message.success('点赞成功');
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../assets/style/theme.styl";

  .book-cell
    margin-bottom 10px
    background-color $default-cell-background-color
    border 1px solid $default-border-color
    img
      width 100%
      transition: All 0.4s ease-in-out
      transform: scale(1.0)
      zoom: 1.0
    &:hover
      border 1px solid $default-border-hover-color
      img
        transform: scale(1.05)
        zoom: 1.02
    .text-wrapper
      padding 20px 20px 0 20px
      text-align left
      @media only screen and (max-width: 768px)
        padding 10px 10px 0 10px
      .title
        font-size 23px
        font-weight 100
        line-height 27px
        @media only screen and (max-width: 768px)
          font-size 17px
          line-height 23px
          word-wrap break-word
        a
          color $default-title-color
          cursor pointer
          &:hover
            color $default-title-hover-color
            text-decoration underline
        span.special
          border-radius $border-radius
          font-size 12px
          font-weight 100
          padding 3px 5px
          margin-left 1px
          vertical-align top
          color $default-background-color
          background $iview-secondary-warning-color
          cursor pointer
      .tags
        margin 8px 0
      .desc
        font-size 14px
        line-height 20px
        font-weight 200
        color $default-desc-color
        @media only screen and (max-width: 768px)
          font-size 13px
        a
          font-weight 500
          color $default-desc-hover-color
          cursor pointer
          &:hover
            text-decoration underline
      .operate_info
        font-size 14px
        margin 15px 0 20px
        span
          margin-right 8px
          a
            color $default-info-color
            cursor pointer
            &:hover
              color $default-info-hover-color
          + span
            margin-left 8px
        @media only screen and (max-width: 768px)
          font-size 13px
          margin 10px 0
          span
            margin-right 4px
            + span
              margin-left 4px
    .img-wrapper
      padding-bottom: 85%
      width 100%
      height 0
      overflow hidden
      &.big-image
        padding-bottom 26%
        box-shadow 1px 1px 1px $default-border-color
</style>
