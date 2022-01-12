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
    path: '/attachment',
    component: Layout,
    redirect: '/attachment/list',
    name: 'attachment',
    meta: {
      title: 'attachment',
      icon: '#iconshiliangzhinengduixiang'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/attachment/Index.vue'),
        name: 'attachment',
        meta: {
          title: 'attachment',
          icon: '#iconchart1',
          noCache: true
        }
      }
    ]
  }
]

export default chartsRouter
