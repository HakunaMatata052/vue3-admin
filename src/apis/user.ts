/*
 * @Description: 用户相关接口
 * @Author: ZY
 * @Date: 2020-12-28 14:40:50
 * @LastEditors: scy😊
 * @LastEditTime: 2021-01-20 10:17:09
 */
import { RootObject } from '@/model/rootObject'
import { UserInfoModel, UsersList } from '@/model/userModel'
import https from '@/utils/https'
import { LoginModel } from '@/views/user-manager/login/model/loginModel'
import { RequestParams, ContentType, Method } from 'axios-mapper'

export const loginRequest = (userInfo: RequestParams) => {
  return https(false).request<RootObject<LoginModel>>('login', Method.POST, userInfo, ContentType.json)
}

export const userInfoRequest = () => {
  return https().request<RootObject<UserInfoModel>>('userInfo', Method.GET, undefined, ContentType.form)
}

export const getUsersList = (user: any) => {
  return https().request<RootObject<UsersList<any>>>('user/list', Method.GET, user, ContentType.form)
}

export const getUser = (user: any) => {
  return https().request<RootObject<UserInfoModel>>('user/' + user.id, Method.GET, undefined, ContentType.form)
}

export const putUsers = (user: any) => {
  return https().request<RootObject<UserInfoModel>>('user', Method.POST, user, ContentType.json)
}

export const delUsers = (user: any) => {
  return https().request<RootObject<UserInfoModel>>('user/del/' + user.id, Method.GET, undefined, ContentType.form)
}
