<template>
	<!-- 二级页面 -->
	<Header v-if="isSecondPage">
		<a slot="left" class="btn slide_right" @click="goBack"><i class="icon_back"></i></a>
		<span slot="center">{{ title }}</span>
		<a slot="right" class="btn slide_right" @click="pushRight"><i class="icon_list"></i></a>
	</Header>
	<!-- 非二级页面 -->
	<Header v-else>
		<a slot="left" class="btn slide_right" @click="pushRight"><i class="icon_list"></i></a>
		<!-- 是否标题 -->
		<span v-if="showTitle" slot="center">{{ title }}</span>
		<router-link v-else slot="center" class="icon_logo" :to="{ name: 'ProjectNews' }"></router-link>
		<!-- 是否显示搜索图标 -->
		<a v-if="showSearch" slot="right" @click="gotoPage('Search')">
			<i class="icon_search"></i>
		</a>
		<!-- 是否显示消息图标 -->
		<a v-if="showMsg" slot="right" @click="gotoPage('Message')">
			<span class="msg">
				<i class="icon_email"></i>
				<i v-show="unReadCount" class="new_msg"></i>
			</span>
		</a>
	</Header>
</template>

<script>
	// 组件
	import Header from "components/Common/Header.vue";
	// Vuex
	import { mapGetters } from 'vuex';
	// 通用js
	import Common from 'common/common.js';

	export default {
		name: "navBar",
		components: { Header },
		/* 
		* 获取父级传值
		* 是否为二级页面 isSecondPage
		* 标题 title		
		* 是否显示页面标题 showTitle
		* 是否显示搜索图标 showSearch
		* 是否显示消息图标 showMsg
        */
    	props: {
			isSecondPage:{
				type: Boolean,
				default: false,
			},
			title:{
				type: String,
				default: ''
			},
			showTitle:{
				type: Boolean,
				default: true,
			},
			showSearch:{
				type: Boolean,
				default: false,
			},
			showMsg:{
				type: Boolean,
				default: false,
			}
		},
		computed: {
            ...mapGetters([ 'showTabBar', 'navTitle', 'goBackRoute', 'unReadCount' ]),
        },
		data() {
			return {};
		},
		methods:{
			// 向右推出
			pushRight(){
				this.$store.commit('SET_SHOW_SIDE_BAR', true);
			},
			// 跳转页面
			gotoPage(name){
				Common.GotoPage(name, {}, this);
			},
			// 返回上一页
			goBack(){
				if(this.goBackRoute.name) Common.GotoPage(this.goBackRoute.name, this.goBackRoute.query, this);
				else this.$router.go(-1);
			}
		}
	};
</script>

<style lang="less" scoped>
	//引入通用设置文件
	@import "../../assets/less/setting";
	@import "../../assets/less/navbar";

	.msg{
		position: relative;
	}
	
	i.new_msg{
		position: absolute;
		background: @warn_color;
		display: inline-block;

		right: -2*@rem;
		
		.wd(6);
		.ht(6);
		.border_radius_4;
	}
</style>
