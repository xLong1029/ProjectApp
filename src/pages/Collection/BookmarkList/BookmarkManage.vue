<template>
	<div id="bookmark">
		<!-- 导航栏 -->
		<Header>
			<button slot="left" class="button cancel_btn" @click="$router.go(-1)">取消</button>
			<span slot="center">文章管理</span>
			<button slot="right" class="button select_btn" @click="selectAll">全选</button>
		</Header>
        <!-- 页面内容 -->
		<div class="content">
            <!-- 加载数据 -->
            <Loading v-if="pageLoading"></Loading>
            <!-- 加载结束 -->
            <div v-else>
                <!-- 书签列表 -->
                <ul v-if="!noList" class="news_list">
                    <li v-for="(item, index) in newsList" v-if="index < listNum" :key="index" class="news_li_item" @click="changeCheckBox(index)">
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
            </div>
		</div>
        <!-- 操作栏 -->
		<div id="operateBar">
			<ul class="operate_bar">
				<li class="operate_item" @click="deleteArticle">
					<i class="operate_icon icon_delete_line"></i>
					<span class="operate_title">删除文章</span>
				</li>
			</ul>
		</div>
		<!-- 删除提示窗口 -->
		<PopModel :show="showDelComfir" @close="hideModel">
			<div slot="content"> 确认删除这些文章吗？ </div>
			<div slot="footer">				
				<button class="button fr" style="width: 48%;" @click="deleteComfir">确定</button>
				<button class="button cancel_btn fl" style="width: 48%;" @click="deleteCancel">取消</button>
			</div>
		</PopModel>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
    import BackTop from "components/Common/BackTop.vue";
	import Checkbox from "components/Form/Checkbox.vue";
	import Header from "components/Common/Header.vue";
	import PopModel from "components/Modal/PopModal.vue";
	// 通用JS
	import Common from 'common/common.js'
	import { GetLocalS, GetUrlQuery } from 'common/important.js';
	import Modal from "mixins/modal.js";
	// Api方法
	import Api from "api/collection.js";

	export default {
		name: "bookmark",
		components: { Loading, BackTop, Checkbox, Header, PopModel },
		mixins: [ Modal ],
		data(){
			return{
				// 是否加载
				pageLoading: false,
				// 是否显示弹窗
				showDelComfir: false,
				// 显示列表数量
				listNum: 0,
				// 无内容
				noList: true,
				// 资讯列表
				newsList: [],
                // 选值列表
				selectList:[],
				// 分组信息
				group:{
					id: 0,
					name: ''
				}
			}
		},
		created(){
            this.init();
            this.getListData();
		},
		methods:{
			// 初始化
			init(){
				let title = GetUrlQuery('name');
				this.group.id = GetUrlQuery('id');
				this.group.name = GetUrlQuery('name');
				if(title) this.$store.commit('SET_NAV_TITLE', title);
                else this.$store.commit('SET_NAV_TITLE', '书签列表');
			},
			// 获取书签数据
			getListData(){
				// 加载页面
				this.pageLoading = true;

				Api.GetArticles(this.group.id)
				.then(res => {
					this.pageLoading = false;
					if(res.code == 200){						
						// 调整数据内容
						this.newsList = res.data.map((item, index)=>{
							return {
								id: item.id,
								title: item.title,
								keyWords: [],
								time: item.strCollectTime,
								checked: false
							}
						})

						console.log(this.newsList);

						if(this.newsList.length > 0) this.noList = false;

						var _this = this;
						this.$nextTick(() => {
							this.listNum = this.newsList.length;
						})
					}
					else this.showWarnModel(res.msg, 'warning');
				})
				.catch(err => console.log(err))
			},
			// 跳转到新增/编辑页
			toStore(){
				Common.GotoPage('CollectStore', { type: 'edit' }, this);
            },
            // 从子组件获取Checkbox值
            getCheckBoxValue(e){
                this.newsList[e[1]].checked = e[0];
			},
			// 勾选多选框
			changeCheckBox(index){
				if(this.newsList[index].checked){
					this.newsList[index].checked = false;
					this.$refs.checkbox[index].setChecked(false);
				}
				else{
					this.newsList[index].checked = true;
					this.$refs.checkbox[index].setChecked(true);
				}
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
			// 删除文章
			deleteArticle(){
				for(let i = 0; i < this.newsList.length; i++){
					if(this.newsList[i].checked){
						this.selectList.push(this.newsList[i].id);
					}
				}
				if(this.selectList.length <= 0){
					this.showWarnModel('请选择要删除的文章', 'warning');
					return false;
				}
				else this.showDelComfir = true;
			},
			// 取消删除
			deleteCancel(){
				this.showDelComfir = false;
			},
			// 确认删除文章
			deleteComfir(){
				Api.DeleteArticle(this.selectList)
				.then(res => {
					this.pageLoading = false;
					if(res.code == 200){
						this.$router.go(-1);
					}
					else this.showWarnModel(res.msg, 'warning');
				})
				.catch(err => console.log(err))
			},
			// 关闭弹窗
			hideModel(value){
				this.showDelComfir = value;
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../../assets/less/setting";
	@import "../../../assets/less/navbar";
	@import "../../../assets/less/news_list";
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

	/* news_list */
    .news_li_title{
        font-weight: normal;
		width: 76%;
		white-space: normal;

        .ft(14);
	}

	/* layout */
	@media screen and (min-width: 960px) {
		.operate_bar {
			width: @wrapper_max_w;
		}
	}
</style>
