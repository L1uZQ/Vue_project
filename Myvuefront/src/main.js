// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import  VueResource  from 'vue-resource'
import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

if (window.localStorage) {
  var oStu = {
    id: '10001',
    name: 'king',
    gender: 'male',
    chinese: '100',
    math: '100',
    english: '100',
    total: 300,
    avg: 300,
  }
  if(oStu.id.length==5)
  {
    var key = "stu" + oStu.id;
    var stu = JSON.stringify(oStu);
    localStorage.setItem(key, stu);
  }
  else{
    alert("学号输入有误");
  }

} else {
  alert("This browser cannot support localStorage!");
}

WebSocket