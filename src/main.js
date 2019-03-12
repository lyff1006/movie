// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.axios = axios;
Vue.prototype.movie_api = '/movie_api';
Vue.prototype.douban_api = '/douban_api';
Vue.prototype.xyz_api='/xyz_api';
/*Vue.prototype.movie_api = 'http://proxy.weblyff.xyz';
Vue.prototype.douban_api = 'http://proxy.weblyff.xyz/v2api';
Vue.prototype.xyz_api='http://www.weblyff.xyz';*/
//网易电影api：https://3g.163.com/touch/reconstruct/article/list/BD2A9LEIwangning/0-20.html
//新闻api：http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=30
//新闻详情api：http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=161028202106247
Vue.config.productionTip = false
Vue.use(Element)
/* eslint-disable no-new */
//获取cookie的数据
Vue.prototype.getCookie=function(name){
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)){
		return arr;
		// return (arr[2]);
	}else{
		return false;
	}
},
Vue.prototype.getCookieText=function(name){
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)){
		//return arr;
		return unescape(arr[2]);
	}else{
		return false;
	}
},
//设置cookie的数据
Vue.prototype.setCookie=function(name, value, expiretime) {
var d = new Date();
d.setTime(d.getTime()+(expiretime*60*1000));//cookie有效时间，expiretime表示分钟
var expires = ";expires="+d.toGMTString();
document.cookie = name + "=" + escape(value) + expires;
},
//删除cookie中的数据
Vue.prototype.delCookie=function(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = this.getCookie(name);
	if (cval != null)
	document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


