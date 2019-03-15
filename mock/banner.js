import Mock from 'mockjs'
const bannerList = Mock.mock({
	'items|5': [{
		 id: '@increment',
		 url: 'https://zhgroot.cn',
     img: 'https://rongmo.zhgroot.cn/tp5rongmo/public/static/pa/banner.jpg',
		 addtime: '@datetime'
	}]
})

export default {
  getBannerList: (obj) => {
    var index = obj.url.split('?')[1].split('=')[1]
    var pagecount = 10
    var totalindex = (index-1)*pagecount
    const items = {}
		items.items = bannerList.items.slice(totalindex,totalindex+10)
	return {
		code: 20000,
		data: items
	}
  },
	getBannerCount: () => {
		const totalCount = bannerList.items.length
		return {
			code: 20000,
			data: {totalCount}
		}
	},
	 deleteBanner: (obj) => {
		 var id=JSON.parse(obj.body).id
		 var list=bannerList.items
		 for(var i=0,len=list.length;i<len;i++){
			 if(list[i].id===id){ 
				 bannerList.items.splice(i,1);
				 break;
			 }
		 }
		 return {
			 code: 20000,
			 data:{
				 success:true
			 }
		 }
	 },
	 editBanner: (obj) => {
		 var options=JSON.parse(obj.body);
		 var date=new Date();
		 var now=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		 if(options.id>0){
			 //编辑
		 }else{
			 //新增
			 options.id=bannerList.items.length+1;
			 options.addtime=now;
			 bannerList.items.push(options);
		 }
		 return {
			 code: 20000,
			 data:{
				 success:true,
				 ...options
			 }
		 }
	 }
}