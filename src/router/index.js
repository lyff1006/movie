import Vue from 'vue'
import Router from 'vue-router'
import Nav from '@/components/Nav'
import Index from '../pages/index/index'
import My from '../pages/my/my'
import Detail from '../pages/detail/detail'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    /*{
      path: '/',
      name: 'Nav',
      component: Nav
    },*/
    {
      path: '/',
      redirect: {
        name: 'Index'
      }
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      meta:{keepAlive:true}
    },
    {
      path: '/My',
      name: 'My',
      component: My,
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/Index',
      redirect: '/'
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
