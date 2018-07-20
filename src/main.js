// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
window.axios = axios

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

require('../mock/mock.js')

Vue.mixin({
  methods: {
    jump (path) {
      this.$router.push(path);
    },
    back () {
      this.$router.go(-1);
    }
  },
  filters: {
    secFormat (sec) {
      var str = '';
      
      var hour = Math.floor(sec / 3600)
      if(hour > 0) {
        str += hour + "小时"
      }
      var mod = sec % 3600
      var min = Math.ceil(mod / 60)
      str += min + "分钟"
      return str
    },
    date(format,timestamp,zerofill) {
      timestamp = timestamp == undefined ? Date.parse(new Date()) : timestamp
      if(String(timestamp).length == 10) {
        timestamp = timestamp*1000;
      }
      zerofill = zerofill == undefined ? true : false
      var date = new Date(timestamp)
      var y = date.getFullYear(),
          m = date.getMonth() + 1,
          d = date.getDate(),
          H = date.getHours(),
          M = date.getMinutes(),
          S = date.getSeconds()
          if(zerofill) {
            if (m < 10) m = '0' + m
            if (d < 10) d = '0' + d
            if (H < 10) H = '0' + H
            if (M < 10) M = '0' + M
            if (S < 10) S = '0' + S
          }

          return format.replace(/y/,y).replace(/m/,m).replace(/d/,d)
                        .replace(/H/,H).replace(/M/,M).replace(/S/,S)
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
