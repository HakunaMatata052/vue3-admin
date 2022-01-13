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
    path: '/system',
    component: Layout,
    redirect: '/system/list',
    name: 'system',
    meta: {
      title: 'attachment',
      icon: '#iconshiliangzhinengduixiang'
    },
    children: [
      {
        path: 'system',
        component: () => import('@/views/system/Index.vue'),
        name: 'system',
        meta: {
          title: 'system',
          icon: '#iconchart1',
          noCache: true
        }
      }
    ]
  }
]

export default chartsRouter
