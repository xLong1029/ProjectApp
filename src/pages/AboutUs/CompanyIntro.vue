<template>
	<div id="companyInfo">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<img :src="companyPic" alt="华建公司坐落于南国弈园"/>
			<div class="cont_frame" v-html="companyCont">
				{{ companyCont }}
			</div>
			<!-- 版权信息 -->
			<Copyright></Copyright>
		</div>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	import Copyright from "components/Common/Copyright.vue";
	// Api方法
	import Api from "api/api.js";

	export default {
		name: "companyInfo",
		components: { Loading, Copyright },
		data(){
			return{
				// 是否加载
				pageLoading: false,
				companyPic: require('@/assets/images/pic-company.jpg'),
				companyCont: '暂无内容',
			}
		},
		created(){
			this.init();
		},
		methods:{
			// 初始化
			init(){
				// 从别的滚动页面返回会导致有滚动问题，所以要滚动到顶部;
				scrollTo(0, 0);
				this.$store.commit('SET_NAV_TITLE', '公司简介');
				this.getCompnayIntro();
			},
			// 获取公司简介
			getCompnayIntro(){
				// 开始加载
				this.pageLoading = true;

				Api.AboutUs()
				.then(res => {
					if(res.code == 200){
                        this.companyCont = res.data;                        
						// 停止加载
                        this.pageLoading = false;
					}
					else {
                        // 停止加载
                        this.pageLoading = false;
                        this.companyCont= res.msg;
                    }
				})
				.catch(err => console.log(err));
			}
		}
	};
</script>

<style>

</style>
