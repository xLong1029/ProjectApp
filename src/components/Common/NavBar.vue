<template>
	<header id="navBar" class="navbar">
		<!-- 判断：如果是二级页面，则添加fr样式，反之添加fl样式 -->
		<a :class="['btn slide_right', secondPages.indexOf($route.name) !== -1 ? 'fr' : 'fl']" @click="pushRight">
			<i class="icon_list"></i>
		</a>			
		<!-- 是否为二级页面，显示返回图标 -->
		<a v-if="secondPages.indexOf($route.name) !== -1" class="btn slide_right fl" @click="goBack">
			<i class="icon_back"></i>
		</a>
		<!-- 非二级页面，显示消息图标 -->
		<a v-else class="btn fr" @click="toSearch">
			<i class="icon_search"></i>
		</a>
		<!-- 非二级页面，显示搜索图标 -->
		<!-- <a v-else class="btn fr" @click="toSearch">
			<i class="icon_search"></i>
		</a> -->
		<!-- 二级页面标题 -->
		<div class="title fl">
			<span v-if="secondPages.indexOf($route.name) !== -1">{{ navTitle }}</span>
			<router-link v-else class="icon_logo" :to="{ name: 'ProjectNews' }"></router-link>
		</div>
	</header>
</template>

<script>
	// Vuex
	import { mapGetters } from 'vuex'
	// 通用js
	import Common from 'common/common.js'

	export default {
		name: "navBar",
		/* 
        * 获取父级传值
        * 二级页面路由列表 secondPages
        */
    	props: {
			secondPages:{
				type: Array,
				default: []
			},
		},
		computed: {
            ...mapGetters([ 'showTabBar', 'navTitle', 'goBackRoute' ]),
        },
		data() {
			return {
				// 是否为二级页面
				isSecondPage: false,
			};
		},
		methods:{
			// 向右推出
			pushRight(){
				this.$store.commit('SET_SHOW_SIDE_BAR', true);
			},
			// 跳转“搜索”页面
			toSearch(){
				Common.GotoPage('Search', {}, this);
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
</style>
