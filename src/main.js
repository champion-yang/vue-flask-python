import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from "v-charts";
import axios from "axios"
import store from "@/store/store"
Vue.use(ElementUI);
Vue.use(VCharts);
// Vue.use(axios)

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;



// 金钱过滤器

Vue.filter('currency', function(value = '0', currencyType = '￥',limit=2) {
  value = Number(value);
  let res;
  value = value.toFixed(limit);
  let prev = value.toString().split('.')[0]; //获取整数部分
  let next = value.toString().split('.')[1];
  res = prev.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + next;
  return currencyType + res
});

// 时间过滤器
Vue.filter("date",function(val,format='yyyy-MM-dd'){
  var date = new Date(val);
  if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  };
  for(let k in o){
      if (new RegExp(`(${k})`).test(format)) {
          let str = o[k] + '';
          format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
      }
  }
  return format;
})

//全局拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.code == "500" || response.data.code == "404"){
      alert("获取数据失败")
    }else{
      return response;
    }
  },
  function(error){
    return Promise.reject(error)
  }
)


Vue.config.productionTip = false

router.beforeEach((to,from,next) => {
    if(to.path === "/"){
        next()
    }else{
        if (sessionStorage.getItem('accessToken')){
            next()
        } else {
            next("/")
        }
    }
})

new Vue({
  router, store,
  render: h => h(App)
}).$mount('#app')



