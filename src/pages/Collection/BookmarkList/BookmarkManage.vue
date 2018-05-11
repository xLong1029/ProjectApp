<template>
	<div id="bookmark">
		<!-- 导航栏 -->
		<Header>
			<button slot="left" class="button cancel_btn" @click="$router.go(-1)">取消</button>
			<span slot="center">文章管理</span>
			<input slot="right" type="button" class="button select_btn" @click="selectAll" value="全选"/>
		</Header>
        <!-- 页面内容 -->
		<div class="content">
            <!-- 加载数据 -->
            <Loading v-if="pageLoading"></Loading>
            <!-- 加载结束 -->
            <div v-else>
                <!-- 书签列表 -->
                <ul v-if="!noList" class="news_list">
                    <li v-for="(item, index) in newsList" v-if="index < listNum" :key="index" class="news_li_item">
                        <div class="news_li_cont">
                            <h2 class="news_li_title fl">{{ item.title }}</h2>
                            <!-- 选择 -->
                            <span class="fr">
                                <Checkbox ref="checkbox" :v-model="item.checked" :index="index" @change="getCheckBoxValue"></Checkbox>
                            </span>
                        </div>
                    </li>
                </ul>
                <div v-else class="no_collect_list">
                    <p>暂无收藏内容</p>
                </div>
                <!-- 加载更多 -->
                <div v-if="loadMore" class="load_more">
                    <Loading></Loading>
                </div>
            </div>
            <!-- 返回顶部 -->
		    <BackTop v-show="showTopBtn"></BackTop>
		</div>
        <!-- 操作栏 -->
		<div id="operateBar">
			<ul class="operate_bar">
				<li class="operate_item" @click="deleteGroup">
					<i class="operate_icon icon_delete_line"></i>
					<span class="operate_title">删除文章</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
    import BackTop from "components/Common/BackTop.vue";
	import Checkbox from "components/Form/Checkbox.vue";
	import Header from "components/Common/Header.vue";
	// 通用JS
	import Common from 'common/common.js'
	import { GetCookie, GetUrlQuery } from 'common/important.js';
	// 混合
	import ScrollPage from 'mixins/scrollPage.js'
	// Api方法
	import Api from "api/news.js";

	export default {
		name: "bookmark",
		components: { Loading, BackTop, Checkbox, Header },
		mixins: [ ScrollPage ],
		data(){
			return{
				// 是否加载
				pageLoading: false,
				// 无内容
				noList: true,
				// 资讯列表
				newsList: [],
				// 资讯数量
				listNum: 50,
                // 选值列表
				selectList:[]
			}
		},
		created(){
            this.init();
            this.getListData(this.listNum);
		},
		mounted(){
			// 监听滚动事件
			window.addEventListener('scroll', this.scrollPage);
		},
		methods:{
			// 初始化
			init(){
				let title = GetUrlQuery('name');
				if(title) this.$store.commit('SET_NAV_TITLE', title);
                else this.$store.commit('SET_NAV_TITLE', '书签列表');
			},
			// 获取列表内容， num: 请求数量，more：是否加载更多
			getListData(num, more){
				// 加载页面
				if(more) this.loadMore = true;
				else this.pageLoading = true;

				Api.DeclareList({
					pageNum: 1,
					pageSize: num
				})
				.then(res => {
					if(res.code == 200){
                        this.newsList = res.data.result;
                        // 初始化选择值
                        for(let i = 0; i < this.newsList.length; i++){
                            this.newsList[i].checked = false;
                        }
						this.noList = false;						
                        // 停止页面加载
                        this.pageLoading = false;

                        // 获取到缓存滚动高度
                        if(this.listScrollH > 0){
                            var _this = this;
                            this.$nextTick(() => {
                                scrollTo(0, _this.listScrollH);	
                            })													
                        }
					}
					else this.showWarnModel(res.msg, 'warning');
				})
				.catch(err => console.log(err))
			},
			// 页面滚动
			scrollPage(){				
				let	scrollTop = $(window).scrollTop();
				
				// 缓存有滚动高度，未到该高度不触发后面的操作
				if(this.listScrollH > 0 && scrollTop <= this.listScrollH) return false;

				let windowH = $(window).height(),
					documentH = $(document).height();

				if(scrollTop > windowH/2){
					this.showTopBtn = true;
				}
				else{
					this.showTopBtn = false;
				}
			},
			// 跳转到新增/编辑页
			toStore(){
				Common.GotoPage('CollectStore', { type: 'edit' }, this);
            },
            // 从子组件获取Checkbox值
            getCheckBoxValue(e){
                this.newsList[e[1]].checked = e[0];
            },
            // 全选
			selectAll(e){
				let value = true;
				if(e.target.value == '全选'){
					e.target.value = '全不选';
				}
				else{
					e.target.value = '全选';
					value = false;
				}

				for(let i = 0 ; i < this.newsList.length; i++){
					this.newsList[i].checked = value;
					this.$refs.checkbox[i].setChecked(value);
				}
			},
			// 删除分组
			deleteGroup(){
				for(let i = 0; i < this.newsList.length; i++){
					if(this.newsList[i].checked){
						this.selectList.push(this.newsList[i].id);
					}
				}
				console.log('选中的ids:', this.selectList);
				
			}
		},
		destroyed(){
			// 移除滚动事件
			window.removeEventListener("scroll",this.scrollPage);
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../../assets/less/setting";
	@import "../../../assets/less/news_list";
	@import "../../../assets/less/navbar";
	@import "../../../assets/less/operate_bar";

	/* no_collect_list */

	.no_collect_list{
		background: #fff;
		padding: 100*@rem 0;

		p{
			text-align: center;
		}
	}

	/* bookmark_list */
	
	.book_list_item{
		background: #fff;
		padding: 10*@rem;
		border-bottom: @border_light;
		cursor: pointer;

		.list_icon{			
			color: @ic_gray_color;

			.mr(5);
		}

		.icon_next{
			color: #ddd;
			float: right;

			.mt(5);
			.ft(12);
		}
	}

	/* 加载更多 */
	.load_more{
		position: relative;
		border-bottom: @border_deep;
		.ht(80);

		.loading{
			position: absolute;
		}
    }
    
    .operate_item {
		width: 100%;
	}

	/* layout */
	@media screen and (min-width: 960px) {
		.operate_bar {
			width: @wrapper_max_w;
		}
	}
</style>
