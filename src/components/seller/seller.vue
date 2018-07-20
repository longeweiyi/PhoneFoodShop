<template>
    <div id="seller" :style="{height:sellerHt+'px'}" v-if="seller">
        <mt-header :title="seller.title">
        <a href="" slot="left" @click.prevent="back">
            <mt-button icon="back"></mt-button>
        </a>
        </mt-header>
        <div id="header">
            <div class="logoBox">
                <img :src="'static/images/sellers/'+seller.logo" alt="">
            </div>
            <div class="infoBox">
                <div class="title">{{seller.title}}</div>
                <div class="distribution">
                    {{seller.distribution}}/{{seller.time|secFormat}}送达/￥{{seller.distribution_fee}}
                </div>
                <mt-badge size="small" @click.native="show_dis=true">{{seller.preferential.length}}个活动 &gt;</mt-badge>
            </div>
        </div>
        <mt-navbar v-model="nav_chk">
            <mt-tab-item v-for="(nav,i) in navs" :id="nav.name" :key="'nav'+i" @click.native="nav_jump(nav.name)">{{nav.text}}</mt-tab-item>
        </mt-navbar>
        <div id="main">
            <keep-alive>
                <router-view :seller="seller"></router-view>
            </keep-alive>
        </div>
        <mt-popup v-model="show_dis" position="right" :closeOnClickModal="false" id="disPopup" >
            <div class="dis_heading">
                <div class="dis_title">{{seller.title}}</div>
                <star :num="seller.score" class="dis_star"></star>
            </div>
            <dl class="disDl">
                <dt>— 优惠信息 —</dt>
                <dd>
                    <ul class="disUl">
                        <li v-for="(pre,i) in seller.preferential" :key="'pre'+i">{{++i + '、' + pre}}</li>
                    </ul>
                </dd>
            </dl>
            <dl class="disD2">
                <dt>— 商家公告 —</dt>
                <dd>
                    {{seller.announcement}}
                </dd>
            </dl>
            <div class="dis_close" @click="show_dis=false">&times;</div>
        </mt-popup>
    </div>
</template>

<script>
import Star from '@/components/common/star'

export default {
    data () {
        return {
            seller: null,
            nav_chk: this.$route.name,
            show_dis: false,
            sellerHt: 0,
            navs: [
                {'text': '商品', 'name': 'goods'},
                {'text': '评价', 'name': 'ratings'},
                {'text': '商家', 'name': 'shangjia'}
            ]
        }
    },
    methods: {
        nav_jump (name) {
            this.$router.replace({name: name})
        }
    },
    components: {
        Star
    },
    created () {
        this.sellerHt = window.innerHeight
        axios.get('api/seller')
            .then ((res) => {
                if (res.data.status) {
                    this.seller = res.data.data
                }
            })
            .catch ((err) => {
                console.log('seller_err', err);
            })
    }
}
</script>

<style scoped>
#seller{display: flex;flex-direction: column;overflow: hidden;}
#header{padding: 20px 15px;background: rgba(0, 0, 0, .5);color: #fff;display: flex}
#main{flex: 1;margin-top: 3px;position: relative;border-top: 1px solid #eee;overflow: auto;}
.logoBox{margin-right: 15px;}
.logoBox img{width: 66px;vertical-align: middle;border-radius: 3px;}
.infoBox,.infoBox>div{overflow: hidden;text-overflow: ellipsis;white-space: nowrap}
.infoBox{flex: 1;font-size: 12px}
.infoBox .title{font-size: 16px;font-weight: bold;}
.infoBox .distribution{margin: 5px 0}
#disPopup{width: 100%;height: 100%;background: rgba(0, 0, 0, .7);color: #fff;font-size: 12px;text-align: center;}
.dis_heading{padding: 40px 0 20px;}
.dis_title{font-size: 18px}
.dis_star{display: block;margin: 5px 0;font-size: 16px;}
dl.disDl{margin-bottom: 25px;padding: 0 15px}
dl.disDl>dt{margin-bottom: 5px;}
dl.disDl>dd{text-align: left}
ul.disUl>li{margin-bottom: 5px;}
dl.disD2 dd{text-indent: 2em;text-align: justify;padding: 15px;line-height: 20px}
.dis_close{width: 24px;height: 24px;line-height: 24px;text-align: center;font-size: 18px;border:1px solid #fff;border-radius: 50%;margin: 10px auto 0;}
</style>


