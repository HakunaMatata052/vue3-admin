/*
 * @Description: 用户管理相关路由管理
 * @Author: ZY
 * @Date: 2020-12-10 16:12:54
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-21 18:04:55
 */
import { RouteRecordRaw } from 'vue-router'
const UserManagerRouter: Array<RouteRecordRaw> = [
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "userManager" */'@/views/charts/BarChartDemo.vue'),
    meta: {
      roles: ['admin']
    }
  }
]
export default UserManagerRouter
