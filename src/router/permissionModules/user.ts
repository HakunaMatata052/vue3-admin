/*
 * @Description:
 * @Author: ZY
 * @Date: 2021-01-08 19:21:46
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-21 21:26:26
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const chartsRouter: Array<RouteRecordRaw> = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'user',
    meta: {
      title: 'user',
      icon: '#iconshiliangzhinengduixiang'
    },
    children: [
      {
        path: 'list',
        component: () =>
          import(
            /* webpackChunkName: "BarChart" */ '@/views/user/index.vue'
          ),
        name: 'userlist',
        meta: {
          title: 'user',
          icon: '#iconchart1',
          noCache: true
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(/* webpackChunkName: "example-edit" */ '@/views/user/Edit.vue'),
        name: 'editUser',
        meta: {
          title: 'editUser',
          noCache: true,
          hidden: true
        }
      }
    ]
  }
]

export default chartsRouter
