import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'

Vue.use(Router)
Vue.use(VueRouter);
/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
  	path: '/register',
  	name: 'register',
  	component: () => import('@/views/register/index'),
	  hidden: true,
  	redirect:'/register/personal',
  	children: [
  	  {path: 'personal',component: () => import('@/views/register/personal')},
  	  {path: 'role', component: () => import('@/views/register/role')},
  	  {path: 'interactive', component: () => import('@/views/register/interactive')},
  	]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/wazuh',
    children: [{
      path: 'wazuh',
      component: ()=>import('@/views/wazuh/index'),
      name: 'wazuh',
      meta: { title: 'Wazuh', icon: 'wazuh' }
    }]
  },
  {
    path: '/cydarm',
    component: Layout,
    children: [{
      path: 'cydarm',
      component: ()=>import('@/views/cydarm/index'),
      name: 'cydarm',
      meta: { title: 'Cydarm', icon: 'bar' }
    }]
  },
  {
    path: '/camera',
    component: Layout,
    children: [{
      path: 'camera',
      component: ()=>import('@/views/cameraPage/index'),
      name: 'camara',
      meta: { title: 'Camera', icon: 'camera' }
    }]
  },
  // {
	// 		path: '/',
	// 		component: Layout,
	// 		redirect: '/home/Item1',//自动跳转item1
	// 		name:'home',
	// 		meta: {title: 'System', icon: 'p1' },
	// 		children: [
	// 			{
	// 		  path: 'home',
	// 		  name: 'Home',
	// 		  component: () => import('@/views/home/index'),
	// 		  meta: { title: 'Home', icon: 'p1' },
	// 			children:[
	// 				{
	// 					path:'Item1',
	// 					name:'Item1',
	// 					component: () => import('@/views/home/Item1/index'),
	// 					meta: { title: 'Firewall events', icon: 'p1' }
	// 				},
	// 				{
	// 					path:'Item2',
	// 					name:'Item2',
	// 					component: () => import('@/views/home/Item2/index'),
	// 					meta: { title: 'All events', icon: 'p1' }
	// 				},
	// 				{
	// 					path:'Item3',
	// 					name:'Item3',
	// 					component: () => import('@/views/home/Item3/index'),
	// 					meta: { title: 'Search', icon: 'p1' }
	// 				}
	// 			]
  //       },
  //       // {
  //       //   path: 'camera',
  //       //   name: 'Camera',
  //       //   component: () => import('@/views/camera/index'),
  //       //   meta: { title: 'Camera', icon: 'p1' },
  //       // },
  //       // {
  //       //   path:'recognition',
  //       //   name:'Recognition',
  //       //   component: () => import('@/views/recognition/index'),
  //       //   meta: { title: 'Recognition', icon: 'p1' },
  //       // },
  //       // {
  //       //   path: 'cameraPage',
  //       //   name: 'CameraPage',
  //       //   component: () => import('@/views/cameraPage/index'),
  //       //   meta: { title: 'Camera', icon: 'p1' },
  //       // },
		
	// 	]
  // },


  // {
  //   path: '/chat',
  //   component: Layout,
  //   children: [{
  //     path: 'chat',
  //     component: ()=>import('@/views/chat/index'),
  //     name: 'chat',
  //     meta: { title: 'Chat', icon: 'p1' }
  //   }]
  // },
  


  // {
  // path: '/example',
  //    component: Layout,
  //    redirect: '/example/information',
  //    name: 'Example',
  //    meta: { title: 'Item2', icon: 'p1' },
  //    children: [
  //      {
  //        path: 'information',
  //        name: 'Information',
  //        component: () => import('@/views/information/index'),
  //        meta: { title: 'User Information', icon: 'p1' }
  //      },
  //      {
  //        path: 'management',
  //        name: 'Management',
  //        component: () => import('@/views/management/index'),
  //        meta: { title: 'User Management', icon: 'p1' }
  //      }
  //    ]
  //  },
   
  // 404 页面必须放置在最后一个页面
  { path: '*', redirect: '/404', hidden: true }
  

]
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // }, 

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

// export const asyncRoutes = [
//    {
//      path: '/example',
//      component: Layout,
//      redirect: '/example/information',
//      name: 'Example',
//      meta: { roles: ['admin'] },
//      children: [
//        {
//          path: 'information',
//          name: 'Information',
//          component: () => import('@/views/information/index'),
//          meta: { title: 'User Information', icon: 'p1' }
//        },
//        {
//          path: 'management',
//          name: 'Management',
//          component: () => import('@/views/management/index'),
//          meta: { title: 'User Management', icon: 'p1' }
//        }
//      ]
//    },
//   // 404 页面必须放置在最后一个页面
//   { path: '*', redirect: '/404', hidden: true }
// ]


const createRouter = () => new Router({
   //mode: 'history', // require service support
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

//解决相同路径跳转报错问题
//使用push的方法
const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return RouterPush.call(this, to).catch(err => err)
}

//使用replace的方法
const RouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return RouterReplace.call(this, to).catch(err => err)
}

export default router
