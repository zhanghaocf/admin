import request from '@/utils/request'

export function getBannerList(params) {
  return request({
    url: '/banner/getBannerList',
    method: 'get',
    params
  })
}
