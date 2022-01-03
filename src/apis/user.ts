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
  return https(false).request<RootObject<LoginModel>>('manage/login', Method.POST, userInfo, ContentType.json)
}

export const userInfoRequest = () => {
  return https().request<RootObject<UserInfoModel>>('api/userinfo', Method.GET, undefined, ContentType.form)
}

export const getUsersList = (user: any) => {
  return https().request<RootObject<UsersList>>('manage/user/list', Method.GET, user, ContentType.form)
}

export const getUsers = (user: any) => {
  return https().request<RootObject<UserInfoModel>>('manage/user', Method.GET, user, ContentType.form)
}

export const putUsers = (user: any) => {
  return https().request<RootObject<UserInfoModel>>('manage/user', Method.POST, user, ContentType.json)
}
