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
		  data: items.items
	  }
  },
	getBannerCount: () => {
		const totalCount = bannerList.items.length
		return {
			data: totalCount
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
				success:true
		 }
	 },
	 editBanner: (obj) => {
		 var options=JSON.parse(obj.body);
		 var date=new Date();
		 var items=bannerList.items;
		 var now=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		 if(options.id>0){
			 //编辑
      for (var i=0,len=items.length;i<len;i++) {
				if(items[i].id == options.id){
					break;
				}
			}
			bannerList.items.splice(i,1,options);
		 }else{
			 //新增
			 options.id=items.length+1;
			 options.addtime=now;
			 bannerList.items.push(options);
		 }
		 //不管是新增还是编辑，成功为true失败为false
		 return {
				 success:true
		 }
	 },
  getBannerDetail: (obj) => {
    var id = obj.url.split('?')[1].split('=')[1];
		var content = {};
		bannerList.items.forEach(item => {
			if(item.id == id){
				content=item;
			}
		})
		//没找到content为null
    return {
			content
		}
  }
}