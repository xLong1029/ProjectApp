
/*
 * 功能 : 混入-页面滚动和加载更多功能
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2018-3-1
 * 版本 : version 1.0
 */
import $ from "jquery";
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters([ 'needScrollPage' ]),
	},
	data() {
		return {
			// 是否加载更多
            loadMore: false,
            // 是否显示返回顶部按钮
            showTopBtn: false,
            // 显示新闻数量
            listNum: 10,
            // 滚动距离
            scrollTop: 0,
            // 用来监听是否在加载，如果正在加载不再多请求接口
			loadMoreNow: false,
		}
	},
	methods: {
        // 页面滚动
        scrollPage(){
            var self = this;

			// 监听页面滚动事件
			$(window).scroll(function(){
				if(self.needScrollPage){
					let	scrollTop = $(this).scrollTop(),
						windowH = $(this).height(),
						documentH = $(document).height();			

					if(scrollTop + windowH > documentH - 40){
									
						if(!self.loadMoreNow) {
							self.loadMoreNow = true;
							// 累加5条记录
							self.listNum += 5;
							// 获取更多内容
							self.getListData(self.listNum, true);
						}
					}
					if(scrollTop > windowH/2){
						self.showTopBtn = true;
					}
					else{
						self.showTopBtn = false;
					}
				}
			})
        }
	}
}