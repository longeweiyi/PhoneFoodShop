const Mock=require('mockjs')
import reqData from '../api/index.json'
import seller from '../api/seller.json'
import goods from '../api/goods.json'
import ratings from '../api/ratings.json'

Mock.mock('api/sellers', () => {
    return reqData
})

Mock.mock('api/seller', () => {
    return seller
})

Mock.mock('api/goods', () => {
    return goods
})

Mock.mock('api/ratings', () => {
    return ratings
})