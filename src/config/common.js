// 引入新的依赖
import Vue from 'vue'
import Axios from '../api/axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../assets/css/element-variables.scss'
Vue.use(ElementUI);

import { Swipe, SwipeItem } from 'vant';
import 'vant/lib/index.css';
Vue.use(Swipe);
Vue.use(SwipeItem);

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

Vue.prototype.$http = Axios
