import * as types from '../mutation-types'

const state = {
    cart_goods: []
}

const getters = {
    cart_goods: state => state.cart_goods,
    cartInfo: state => {
        var ids = []
        var total_num = 0
        var total_price = 0
        var type = {}

        state.cart_goods.forEach(item => {
            ids.push(item.id)
            total_num += item.cart_num
            total_price += item.cart_num * item.price

            if (type[item.type_id]) {
                type[item.type_id] += item.cart_num
            } else {
                type[item.type_id] = item.cart_num
            }
        })

        var idStr = ',' + ids.join(',') + ',';

        return {
            total_num,
            total_price,
            type,
            idStr
        }
    }
}

const mutations = {
    [types.CART_ADD_NUM](state,good) {
        good.cart_num++
        var in_cart = false;
        for (var i = 0;i < state.cart_goods.length; ++i) {
            if(state.cart_goods[i].id == good.id) {
                in_cart = true
                break
            }
        }
        if (!in_cart) {
            state.cart_goods.push(good)
        }
    },
    [types.CART_DEL_NUM](state,good) {
        if(good.cart_num <= 0) {
            return
        }
        good.cart_num--
        if(good.cart_num <= 0) {
            for (var i = 0;i < state.cart_goods.length; ++i) {
                if(state.cart_goods[i].id == good.id) {
                    state.cart_goods.splice(i,1);
                    break
                }
            }
        }
    },
    [types.CART_PUSH](state,good) {
        state.cart_goods.push(good)
    },
    [types.CART_FLUSH](state) {
        state.cart_goods.forEach((item => {
            item.cart_num = 0;
        }));
        state.cart_goods = []
    }
}

const actions = {
    cartAddNum ({commit}, good) {
        setTimeout(() => {
            commit(types.CART_ADD_NUM,good);
        }, 100);
    },
    cartDelNum ({commit}, good) {
        setTimeout(() => {
            commit(types.CART_DEL_NUM,good);
        }, 100);
    },
    cartPush ({getters,commit}, good) {
        if (getters.cartInfo.idStr.indexOf(','+good.id+',') > -1) {
            return
        }
        setTimeout(() => {
            commit(types.CART_PUSH,good);
        }, 100);
    },
    cartFlush ({commit}) {
        setTimeout(() => {
            commit(types.CART_FLUSH);
        }, 100);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}