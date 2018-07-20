<template>
    <div id="goods">
        <div id="goodsBox">
            <div id="goodsMenu">
                <ul id="goodsMenuUl">
                    <li v-for="(goods,type_id,i) in goodsList" :key="'goods'+i" :class="{active:type_id==type_chk}" @click="type_chk=type_id">
                        {{goods[0].type_name}}
                        <span class="cartNum" v-show="cartInfo.type[type_id]">{{cartInfo.type[type_id]}}</span>
                    </li>
                </ul>
            </div>
            <div id="goodsList" ref="goodsList">
                <ul id="goodsListUl">
                    <li v-for="(good,i) in goodsList[type_chk]" :key="i">
                        <div class="goods_media" @click="goods_show(good)">
                            <img :src="'static/images/goods/' + good.img" alt="">
                        </div>
                        <div class="goods_body">
                            <div class="goods_title">{{good.title}}</div>
                            <div class="goods_info">
                                 月售{{good.sales}}件&nbsp;&nbsp;好评率{{Math.floor(good.good_ratings_num/good.ratings_num*100)}}%
                            </div>
                            <div class="goods_price">
                                <span class="price_info">&yen;<span class="price"> {{good.price}}</span></span>
                                <cart_btn class="ft-r" :good="good"></cart_btn>
                                <div class="cl-b"></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div id="cartBox">
            <div id="cartInfo" @click="cart_show">
                <div class="cartLogo">
                    <div :class="['cartBg',{active:cartInfo.total_num}]">
                        <span class="cart"></span>
                        <span class="cartNum" v-show="cartInfo.total_num">{{cartInfo.total_num}}</span>
                    </div>
                </div>
                <div class="cartMoney">
                    <span class="price_info">&yen;<span class="price"> {{cartInfo.total_price}}</span></span>
                    &nbsp;&nbsp;配送费&yen;{{seller.distribution_fee}}
                </div>
            </div>
            <div id="cartBtn" :class="{active:payStatus==1}">
                <span v-show="payStatus==1" @click="pay" >去结算</span>
                <span v-show="payStatus==2" class="small">还差{{seller.min_price - cartInfo.total_price}}元起送</span>
                <span v-show="payStatus==0">{{seller.min_price}}元起送</span>
            </div>
        </div>

        <mt-popup v-model="show_good" popup-transition="popup-fade" id="good_popup">
            <div class="goods_popup_media">
                <img :src="'static/images/goods/' + good_chk.img" alt="">
            </div>
            <div class="goods_body">
                <div class="goods_title">{{good_chk.title}}</div>
                <div class="goods_info">
                        月售{{good_chk.sales}}件&nbsp;&nbsp;好评率{{Math.floor(good_chk.good_ratings_num/good_chk.ratings_num*100)}}%
                </div>
                <div class="goods_price">
                    <span class="price_info">&yen;<span class="price"> {{good_chk.price}}</span></span>
                    <cart_btn class="ft-r" :good="good_chk"></cart_btn>
                    <div class="cl-b"></div>
                </div>
            </div>
        </mt-popup>

        <mt-popup v-model="show_cart" position="bottom" id="cart_popup">
            <dl class="cart_popup_dl">
                <dt>
                    <span class="ft-l">已选商品</span>
                    <a href="javascript:void(0)" class="cart_flush ft-r" @click.prevent="cartFlush_2"></a>
                    <div class="cl-b"></div>
                </dt>
                <dd>
                    <ul class="cart_popup_ul">
                        <li v-for="(good,i) in cart_goods" :key="i">
                            <span class="title">{{good.title}}</span>
                            <span class="price_info">&yen;<span class="price"> {{good.price}}</span></span>
                            <cart_btn class="ft-r" :good="good" @cartDelNum="cartDelNum"></cart_btn>
                       </li>
                    </ul>
                </dd>
            </dl>
        </mt-popup>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import cart_btn from "@/components/common/cart_btn"
import { MessageBox } from 'mint-ui';

export default {
    props: ['seller'],
    data () {
        return {
            goods: [],
            type_chk: 1,
            good_chk: {},
            show_good: false,
            show_cart: false
        }
    },
    computed: {
        ...mapGetters([
            'cartInfo',
            'cart_goods'
        ]),
        goodsList () {
            var goodsList = {};
            this.goods.forEach ((item) => {
                if (goodsList[item.type_id]) {
                    goodsList[item.type_id].push(item)
                } else {
                    goodsList[item.type_id] = [item];
                }
            })
            return goodsList
        },
        payStatus () {
            if (this.cartInfo.total_price >= this.seller.min_price) {
                return 1;
            } else if (0 < this.cartInfo.total_price && this.cartInfo.total_price < this.seller.min_price) {
                return 2
            } else {
                return 0;
            }
        }
    },
    watch: {
        type_chk () {
            this.$refs.goodsList.scrollTop = 0
        }
    },
    components: {
        cart_btn
    },
    methods: {
        ...mapActions([
            'cartPush',
            'cartFlush'
        ]),
        goods_show (good) {
            this.good_chk = good
            this.show_good = true
        },
        pay () {
            if (this.payStatus != 1) {
                return
            }
            MessageBox.confirm('Are you sure?')
            .then(action => {
                alert('TODO::去支付')
            })
            .catch(() => {

            });
        },
        cart_show () {
            if (this.cartInfo.total_num <= 0) {
                return
            }
            this.show_cart = true
        },
        cartDelNum () {
            if (this.cartInfo.total_num == 1) {
                this.show_cart = false
            }
        },
        cartFlush_2 () {
            MessageBox.confirm('确定清空购物车？')
            .then(action => {
                this.cartFlush()
                this.show_cart = false
            })
            .catch((err) => {
                
            });
        }
    },
    created () {
        axios.get('api/goods')
            .then((res) => {
                if(res.data.status) {
                    this.goods = res.data.data
                    this.goods.forEach((item) => {
                        if (item.cart_num) {
                            this.cartPush(item)
                        }
                    })
                }
            })
            .catch((err) => {
                console.log('goods_err',err)
            })
    }
}
</script>


<style scoped>
#goods{position: absolute;top: 0;left: 0;width: 100%;height: 100%;overflow: auto;display: flex;flex-direction: column;}
#goodsBox{flex: 1;display: flex;}
#goodsMenu,#goodsList{height: 100%;max-height: 100%;overflow: auto;}
#goodsMenu{width: 85px;background: #f8f8f8;overflow: auto;}
ul#goodsMenuUl>li{height: 50px;line-height: 50px;padding: 0 5px;border-bottom: 1px solid #eee;position: relative;}
ul#goodsMenuUl>li.active{background: #fff}
span.cartNum{position: absolute;top: 0;right: 0;display: inline-block;font-size: 12px;line-height: 14px;padding: 0 5px;border-radius: 7px;background: #f60;color: #fff;}
#goodsList{flex: 1;}
ul#goodsListUl>li{display: flex;padding: 15px}
.goods_media{width: 75px;margin-right: 10px;}
.goods_media img {width: 100%;vertical-align: top;}
.goods_body{flex: 1;display: flex;flex-direction: column;}
.goods_title{font-weight: bold;margin-bottom: 5px;}
.goods_info{flex: 1;font-size: 12px;}
.price_info {font-size: 12px;color: #f60;}
.price{font-size: 14px;font-weight: bold}
#cartBox{height: 50px;line-height: 50px;background: rgba(0, 0, 0, .7);color: #fff;display: flex}
#cartInfo{flex: 1; display: flex;font-size: 12px}
#cartInfo .cartLogo{width: 85px;text-align: center;}
#cartInfo .cartLogo .cartBg{display: inline-block;width: 38px;height: 38px;border-radius: 50%;margin-top: 6px;position: relative;}
#cartInfo .cartLogo .cartBg span.cartNum{top:-5px;right: -10px;}
#cartInfo .cartLogo .cartBg.active{background: #26a2ff}
span.cart{display: inline-block;width: 26px;height: 26px;margin: 6px 0 0 3px;background: url(../../assets/images/common/cart.png) no-repeat center center;background-size: 100%;}
.cartMoney{flex: 1}
#cartBtn{width: 100px;text-align: center;}
#cartBtn.active{background: #4cd964}
#cartBtn span.small{font-size: 12px}
#good_popup{width: 290px;padding: 15px;border-radius: 5px}
.goods_popup_media{padding: 15px;}
.goods_popup_media img{width: 100%;}
#good_popup .goods_price{margin-top: 20px;}

#cart_popup{width: 100%}
dl.cart_popup_dl>dt{padding: 15px;background: #eee;}
.cart_flush{display: inline-block;width: 16px;height: 16px;background: url(../../assets/images/common/del.png) no-repeat center center;background-size: 100%}
dl.cart_popup_dl>dd{max-height: 300px;overflow: auto;}
ul.cart_popup_ul{padding: 25px 15px 0;}
ul.cart_popup_ul>li{display: flex;margin-bottom: 25px;}
ul.cart_popup_ul>li span.title{flex: 1;}
#cart_popup span.price_info{margin-right: 15px;}
</style>

