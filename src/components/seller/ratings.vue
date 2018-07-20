<template>
    <div id="ratings">
        <div id="scoreBox">
            <div class="scoreLeft">
                <div class="all_score">{{seller.score}}</div>
                综合评价
            </div>
            <div class="scoreRight">
                <ul>
                    <li>
                        服务态度&nbsp;&nbsp;
                        <star :num="Math.floor(seller.service_score)"></star>&nbsp;&nbsp;
                        <span class="score_num">{{seller.service_score}}</span>
                    </li>
                    <li>
                        菜品评价&nbsp;&nbsp;
                        <star :num="Math.floor(seller.goods_score)"></star>&nbsp;&nbsp;
                        <span class="score_num">{{seller.goods_score}}</span>
                    </li>
                    <li>
                        送达时间&nbsp;&nbsp;{{seller.time|secFormat}}
                    </li>
                </ul>
            </div>
        </div>
        <div id="ratingsBox">
            <div class="ratings-tab">
                <ul class="ratingsTabUl">
                    <li v-for="(tab,i) in tabs" :key="i" :class="{active:i==tab_chk}" @click="tab_chk=i" >{{tab}}</li>
                </ul>
                <div class="cl-b"></div>
            </div>
            <div class="ratings-body">
                <ul class="ratingsUl">
                    <li v-for="(rating,i) in ratingsList" :key="i" >
                        <div class="ratings-media">
                            <img :src="'static/images/users/'+rating.img" alt="">
                        </div>
                        <div class="ratings-info">
                            <ul class="ratingsInfoUl">
                                <li>
                                    {{rating.nickname}}&nbsp;&nbsp;
                                    <span class="created_time">{{"y-m-d H:M:S"|date(rating.created_time)}}</span>
                                    <i :class="['raIco',rating.type?'ding':'cai']"></i>
                                </li>
                                <li>
                                    <star :num="rating.score"></star>
                                </li>
                                <li>
                                    {{rating.content}}
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Star from '@/components/common/star'

export default {
    props: ['seller'],
    data () {
        return {
            tabs: ["全部","满意","不满意"],
            tab_chk: 0,
            ratings: []
        }
    },
    computed: {
        ratingsList () {
            if(this.tab_chk == 0) return this.ratings
            var ratingsList = this.ratings.filter((item) => {
                switch (this.tab_chk) {
                    case 1:
                        if(item.type == 1) return true
                        break;
                    case 2:
                        if(item.type == 0) return true
                        break;
                }
            })
            return ratingsList
        }
    },
    created () {
        axios.get('api/ratings')
            .then((res) => {
                if(res.data.status) {
                    this.ratings = res.data.data
                }
            })
            .catch((err) => {
                console.log("ratings_err",err)
            })
    },
    components: {
        Star
    }
}
</script>


<style scoped>
#scoreBox{padding: 20px;margin-bottom: 1px;display: flex;}
.scoreLeft{width: 125px;text-align: center;}
.all_score{font-size: 24px;font-weight: bold;color: #f60}
.scoreRight{flex: 1;font-size: 12px;}
.scoreRight li{padding-top: 2px}
.score_num{color: #f60}
.ratings-tab{padding: 0 15px 15px;}
.ratingsTabUl>li{float: left;height: 28px;line-height: 28px;padding: 0 15px;margin-right: 8px;font-size: 12px;background-color: #eee;border-radius: 3px;}
.ratingsTabUl>li.active{background-color: #26a2ff;color: #fff;}

ul.ratingsUl>li{display: flex;padding: 15px;border-top: 1px solid #ddd;}
.ratings-media{width: 50px;}
.ratings-media img{width: 32px;border-radius: 50%;vertical-align: top;}
.ratings-info{flex: 1;}
.created_time{font-size: 12px;color: #666;}
i.raIco{display: inline-block;width: 16px;height: 16px;background: no-repeat center center;background-size: 100%;}
i.raIco.ding{background-image: url(../../assets/images/common/ding.gif);vertical-align: sub;}
i.raIco.cai{background-image: url(../../assets/images/common/cai.gif);vertical-align: text-bottom;}

</style>

