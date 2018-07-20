<template>
    <div class="container">
        <div id="header">
            <div id="top">XX订餐系统</div>
            <mt-search id="search" v-model="search" placeholder="搜索商家、商品名称"></mt-search>
        </div>
        <mt-swipe :auto="4000" :style="{height: swipeHt+'px'}" v-if="slides.length">
            <mt-swipe-item v-for="(slide,i) in slides" :key="'slide'+i">
                <a :href="slide.url"><img :src="'static/images/slides/'+slide.img" alt=""></a>
            </mt-swipe-item>
        </mt-swipe>
        <dl id="listDl">
            <dt>— 推荐商家 —</dt>
            <dd>
                <ul id="listUl" v-infinite-scroll="getSellers" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li v-for="(seller,i) in sellers" :key="'seller'+seller.id + i" @click="jump('/seller/'+seller.id)" >
                        <div class="seller-media">
                            <img v-lazy="'static/images/sellers/' + seller.logo">
                        </div>
                        <div class="seller-body">
                            <div class="seller-title">{{seller.title}}</div>
                            <div class="seller-info1">
                                <div class="ft-l">
                                    <star :num="seller.score"></star>
                                    &nbsp;&nbsp;{{seller.score}}&nbsp;&nbsp;月售{{seller.sales}}
                                </div>
                                <div class="ft-r">{{seller.distribution}}</div>
                                <div class="cl-b"></div>
                            </div>
                            <div class="seller-info2">
                                <div class="ft-l">
                                    ￥{{seller.min_price}} 起送，配送费 ￥{{seller.distribution_fee}}
                                </div>
                                <div class="ft-r">{{seller.time | secFormat}}</div>
                                <div class="cl-b"></div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="loadAll" v-if="load">已加载全部</div>
                <div class="loadMore" v-else></div>
            </dd>
        </dl>
        <mt-tabbar v-model="tabbar" :fixed="true">
            <mt-tab-item id="点餐">
                <img slot="icon" src="static/images/index/buy.png">
                点餐
            </mt-tab-item>
            <mt-tab-item id="发现">
                <img slot="icon" src="static/images/index/find.png">
                发现
            </mt-tab-item>
            <mt-tab-item id="订单">
                <img slot="icon" src="static/images/index/order.png">
                订单
            </mt-tab-item>
            <mt-tab-item id="我的">
                <img slot="icon" src="static/images/index/mine.png">
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
import Star from "@/components/common/star"

export default {
  data() {
    return {
      search: "",
      swipeHt: 0,
      slides: [
          {img: 'slide1.jpg', url: '###'},
          {img: 'slide2.jpg', url: '###'},
          {img: 'slide3.jpg', url: '###'}
      ],
      sellers: [],
      tabbar: '点餐',
      page: 1,
      loading: true,
      load: false
    }
  },
  components: {
      Star
  },
  methods: {
      setSwipeHt () {
        this.swipeHt = window.innerWidth*0.43;
      },
      getSellers () {
          this.loading = true;
            axios.get ('api/sellers')
            .then ((res) => {
                if (res.data.status) {
                    this.sellers = this.sellers.concat(res.data.data)
                    this.$nextTick(() => {
                        if(this.page > 5) {
                            this.loading = true
                            this.load = true
                        } else {
                            this.loading = false
                        }
                    })
                    // console.log(this.page, this.loading)
                    this.page ++
                }
            })
            .catch ((err) => {
                console.log('index_err',err)
            })
      }
  },
  created () {
      this.setSwipeHt()
      this.getSellers()

      this.$nextTick(() => {
          window.onresize = () => {
              this.setSwipeHt()
          }
      })
  }
};
</script>

<style scoped>
.container{padding-bottom: 56px}
#header {padding: 20px 15px;background-color: #26a2ff;color: #fff;}
#top {margin-bottom: 10px;}
#search {height: auto;}
dl#listDl {margin-top: 20px;}
dl#listDl > dt {font-weight: bold;text-align: center;}
ul#listUl {padding: 5px 15px;}
ul#listUl > li {display: flex;padding: 13px 0;}
.seller-media {width: 85px;}
.seller-media img {width: 70px;}
.seller-body {flex: 1;overflow: hidden;}
.seller-title {font-weight: bold;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.seller-info1,.seller-info2 {font-size: 12px;color: #666}
.seller-info1 {padding: 7px 0}
</style>




