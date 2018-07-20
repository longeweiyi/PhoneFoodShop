<template>
    <div id="shangjia" v-once>
        <dl class="dl">
            <dt>配送信息</dt>
            <dd>
                {{seller.distribution}}，约{{seller.time|secFormat}}送达，配送费&yen;{{seller.distribution_fee}}
            </dd>
        </dl>
        <dl class="dl">
            <dt>活动与服务</dt>
            <dd>
               <ul class="preferentialUl">
                   <li v-for="(pre,i) in seller.preferential" :key="i">{{i+1}}、{{pre}}</li>
               </ul>
            </dd>
        </dl>
        <dl class="dl">
            <dt>商家信息</dt>
            <dd>
               <ul class="shangjiaUl">
                   <li>
                       <div class="label">名称：</div>
                       <div class="val">{{seller.title}}</div>
                   </li>
                   <li>
                       <div class="label">电话：</div>
                       <div class="val">{{seller.tel}}</div>
                   </li>
                   <li>
                       <div class="label">地址：</div>
                       <div class="val">{{seller.address}}</div>
                   </li>
                   <li>
                       <div class="label">营业时间：</div>
                       <div class="val">{{seller.business}}</div>
                   </li>
               </ul>
            </dd>
        </dl>
    </div>
</template>

<script>
export default {
    props: ['seller']
}
</script>

<style scoped>
dl.dl{padding: 15px;}
dl.dl>dt{padding: 10px 0;font-weight: bold;}
ul.preferentialUl>li{font-size: 12px;margin-bottom: 5px;}
ul.shangjiaUl>li{display: flex;margin-bottom: 15px;}
ul.shangjiaUl>li .label{width: 125px;font-weight: bold;}
ul.shangjiaUl>li .val{flex: 1;text-align: left;;color: #666;}
</style>

