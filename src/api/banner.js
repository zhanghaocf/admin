import request from '@/utils/request'

// pageIndex
export function getBannerList(params) {
  return request({
    url: '/banner/getBannerList',
    method: 'get',
    params
  })
}

export function getBannerCount(params) {
  return request({
    url: '/banner/getBannerCount',
    method: 'get',
    params
  })
}

export function deleteBanner(id) {
  return request({
    url: '/banner/deleteBanner',
    method: 'post',
    data: {
      id
    }
  })
}

export function editBanner(obj) {
  return request({
    url: '/banner/editBanner',
    method: 'post',
    data: {
      ...obj
    }
  })
}
