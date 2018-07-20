<template>
    <div class="goodsBtn">
        <div class="delGoods" v-show="good.cart_num" @click="cartDelNum_2(good)">-</div>
        <div class="goodNum" v-show="good.cart_num">{{good.cart_num}}</div>
        <div class="addGoods" @click="cartAddNum(good)">+</div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    props: ['good'],
    methods: {
        ...mapActions([
            'cartAddNum',
            'cartDelNum'
        ]),
        cartDelNum_2 (good) {
            this.cartDelNum(good)
            this.$emit('cartDelNum')
        }
    }
}
</script>


<style scoped>
.goodsBtn>div{box-sizing: border-box;float: left;height: 20px;line-height: 20px;text-align: center;}
.delGoods,.addGoods{width: 20px;border-radius: 50%}
.delGoods{border: 1px solid #26a2ff;color: #26a2ff}
.goodNum{padding: 0 10px}
.addGoods{background: #26a2ff;color: #fff}
</style>

