
/*
 * 功能 : 混入-页面滚动和加载更多参数
 * 作者 : 罗永梅（381612175@qq.com）
 * 日期 : 2018-3-1
 * 版本 : version 1.0
 */

 // 通用JS
 import Common from 'common/common.js'
 import { SetLocalS, GetLocalS } from 'common/important.js';

export default {
	data() {
		return {
			// 是否加载更多
            loadMore: false,
            // 是否显示返回顶部按钮
            showTopBtn: false,
            // 显示新闻数量
            listNum: 10,
            // 用来监听是否在加载，如果正在加载不再多请求接口
			loadMoreNow: false,
		}
    },
    methods:{
        // 固定高度设置
        scrollHSet(){
            // 从缓存获取列表数量
			let getListNum = GetLocalS('listNum');
			if(getListNum){
				this.listNum = parseInt(getListNum);
			}				

			// 从缓存获取列表滚动高度
			let getScrollH = GetLocalS('scrollH');
			if(getScrollH){
                this.listScrollH = parseInt(getScrollH);
                if(this.listScrollH > $(window).height()/2) this.showTopBtn = true;
			}

			this.getListData(this.listNum, false);
        },
        // 页面滚动
        scrollPage(){				
            let	scrollTop = $(window).scrollTop(),
                windowH = $(window).height(),
                documentH = $(document).height();

            if(scrollTop > windowH/2){
                this.showTopBtn = true;
            }
            else{
                this.showTopBtn = false;
            }
            
            // 缓存有滚动高度，未到该高度不触发后面的操作
            if(this.listScrollH > 0 && scrollTop <= this.listScrollH) return false;

            if(scrollTop + windowH > documentH - 40){
                if(!this.loadMoreNow) {
                    this.loadMoreNow = true;
                    // 累加5条记录
                    this.listNum += 5;
                    // 列表数量存缓存
                    SetLocalS('listNum', this.listNum);		
                    // 获取更多内容
                    this.getListData(this.listNum, true);
                }
            }
        }
    }
}