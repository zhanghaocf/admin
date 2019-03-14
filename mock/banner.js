import Mock from 'mockjs'

export default {
  getBannerList: () => {
    const items = Mock.mock({
      'items|10': [{
         id: '@increment',
         url: 'https://zhgroot.cn',
		 img: 'https://rongmo.zhgroot.cn/tp5rongmo/public/static/pa/banner.jpg',
         addtime: '@datetime'
      }]
    })
	return {
		code: 20000,
		data: items
	}
  }
}
