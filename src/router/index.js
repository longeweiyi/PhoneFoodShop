import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import Seller from '@/components/seller/seller'
import Goods from '@/components/seller/goods'
import Ratings from '@/components/seller/ratings'
import Shangjia from '@/components/seller/shangjia'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/seller/:id',
      component: Seller,
      redirect: {name: 'goods'},
      children: [
        {
          path: 'goods',
          name: 'goods',
          component: Goods
        },
        {
          path: 'ratings',
          name: 'ratings',
          component: Ratings
        },
        {
          path: 'shangjia',
          name: 'shangjia',
          component: Shangjia
        }
      ]
    }
  ]
})
