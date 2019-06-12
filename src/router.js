import Vue from 'vue'
import Router from 'vue-router'
// 侧边栏内容组件
// import dashboard from './components/aside-left/dash-board'
// import assetRegistration from './components/aside-left/asset-registration'
// import retirement from '@/components/aside-left/retirement'
// import assetlist from '@/components/aside-left/asset-list'
// import assetCount from '@/components/aside-left/asset-count'
// import borrowReturn from '@/components/aside-left/borrow-return'
// import scrapManagement from '@/components/aside-left/scrap-management'
// import msgchange from '@/components/aside-left/msgchange'
// import repairManagement from '@/components/aside-left/repair-management'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/indexPage',
      name: 'indexPage',
      component: () => import('@/views/IndexPage'),
      meta:{
        title:"主页"
      },
      redirect: {name: 'dashboard'},
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('./views/aside-left/dash-board'),
          meta: {
            title: '仪表盘',
            icon: 'el-icon-menu',
            ident:''
          }
        },
        {
          path: 'assetRegistration',
          name: 'assetRegistration',
          component: () => import('@/views/aside-left/asset-registration'),
          meta: {
            title: '资产登记',
            icon: 'el-icon-menu',
            ident:''
          }
        },
        {
          path: 'retirement',
          name: 'retirement',
          component: () => import('./views/aside-left/retirement'),
          meta: {
            title: '领用退库',
            icon: 'el-icon-menu',
            ident:''
          }
        },
        {
          path: 'borrowReturn',
          name: 'borrowReturn',
          component: () => import('@/views/aside-left/borrow-return'),
          meta: {
            title: '借用归还',
            icon: 'el-icon-menu',
            ident:''
          }
        },
        {
          path: 'msgchange',
          name: 'msgchange',
          component: () => import('@/views/aside-left/msgchange'),
          meta: {
            title: '信息修改',
            icon: 'el-icon-menu',
            ident:''
          }
        },
        {
          path: 'scrapManagement',
          name: 'scrapManagement',
          component: () => import('@/views/aside-left/scrap-management'),
          meta: {
            title: '报废管理',
            icon: 'el-icon-menu',
            ident:''
          }
        },
        {
          path: 'repairManagement',
          name: 'repairManagement',
          component: () => import('@/views/aside-left/repair-management'),
          meta: {
            title: '维修管理',
            icon: 'el-icon-menu',
            
              ident:''
          }
        },
        {
          path: 'assetCount',
          name: 'assetCount',
          component: () => import('@/views/aside-left/asset-count'),
          meta: {
            title: '资产统计',
            icon: 'el-icon-menu',
            ident:''
          },
          children: [{
            path: 'assetlist',
            name: 'assetlist',
            component: () => import('@/views/aside-left/asset-list'),
            meta: {
              title: '资产列表',
              icon: 'el-icon-menu',
              ident:''
            }
          }],
        },
        {
          path:'changePassword',
          name:'changePassword',
          component:() => import('@/components/header-box/change-password'),
          isHidden:true,
          meta:{
            title:'修改密码',
            icon:'el-icon-menu',
            ident:'changeIdent'
          }
        }
      ]
    }]
})
