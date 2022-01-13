import { RootObject } from '@/model/rootObject'
import https from '@/utils/https'
import { RequestParams, ContentType, Method } from 'axios-mapper'

export const getBasic = () => {
  return https().request<RootObject<any>>('basic', Method.GET, undefined, ContentType.form)
}

export const addBasic = (config: any) => {
  return https().request<RootObject<any>>('basic/add/', Method.POST, config, ContentType.json)
}

export const editBasic = (config: any[]) => {
  return https().request<RootObject<any>>('basic/edit/', Method.POST, config, ContentType.json)
}

export const delBasic = (params: RequestParams) => {
  return https().request<RootObject<any>>('basic/del/' + params.id, Method.GET, undefined, ContentType.form)
}
