import { RootObject } from '@/model/rootObject'
import { AttachmentList } from '@/model/attachmentList'
import { AttachmentModel } from '@/model/attachmentModel'
import https from '@/utils/https'
import { RequestParams, ContentType, Method } from 'axios-mapper'

export const getAttachmentList = (params: RequestParams) => {
  return https().request<RootObject<AttachmentList<AttachmentModel>>>('attachment/list', Method.GET, params, ContentType.form)
}

export const delAttachment = (params: RequestParams) => {
  return https().request<RootObject<AttachmentList<AttachmentModel>>>('attachment/remove/' + params.id, Method.GET, undefined, ContentType.form)
}
