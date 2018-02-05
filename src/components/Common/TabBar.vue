<template>
	<nav id="tabBar">
		<ul class="tabbar">
			<!-- 通过 tab定义的route值 和 路由定义名称 是否一致来判断当前页，是则添加class=on激活当前页样式 -->
			<li v-for="(item, index) in menu" :key="index" :class="['tabbar_menu', item.routeName === $route.name ? 'on' : '']" :style="{ width:menuItemW }">				
				<!-- 含二级菜单的一级菜单 -->
				<div v-if="item.submenu.length > 0" class="menu_item">
					<div @click="showSubmenu(index)">
						<i :class="['menu_icon',item.class]"></i>
						<span class="menu_title">{{ item.title }}</span>
					</div>
					<!-- 二级菜单 -->
					<div class="tabbar_submenu">
						<span class="trangle_down"></span>
						<ul>
							<li class="submenu" v-for="(subitem, i) in item.submenu" :key="i">
								<router-link :to="{ name: subitem.routeName }" class="submenu_item">{{ subitem.title }}</router-link>
							</li>
						</ul>						
					</div>
				</div>
				<!-- 一级菜单 -->
				<router-link v-else :to="{ name: item.routeName }" class="menu_item">
					<i :class="['menu_icon', item.class]"></i>
					<span class="menu_title">{{ item.title }}</span>
				</router-link>
			</li>
		</ul>
  </nav>
</template>

<script>
	import $ from "jquery";

	export default {
		name: "tabBar",
		data() {
			return {
				// 菜单
				menu: [
					{
						routeName: "Index",
						class: "icon-home",
						title: "首页",
						submenu: []
					},
					{
						routeName: "ProjectNews",
						class: "icon-project-list",
						title: "申报资讯",
						submenu: []
					},
					{
						routeName: "NewsCenter",
						class: "icon-news",
						title: "新闻资讯",
						submenu: []
					},
					{
						routeName: "AboutUs",
						class: "icon-group",
						title: "关于我们",
						submenu: [
							{
								routeName: "CompanyIntro",
								title: "公司简介",
							},
							{
								routeName: "ContactUs",
								title: "联系我们",
							}
						]
					}
				],
				// 菜单项宽度
				menuItemW: "20%"
			};
		},
		created() {
			this.menuItemW = 100 / this.menu.length + "%";
		},
		methods: {
			// 显示二级菜单
			showSubmenu(index) {
				$(".menu_item").eq(index).find(".tabbar_submenu").toggle();
			}
		}
	};
</script>

<style lang="less" scoped>
	//引入通用设置文件
	@import "../../assets/less/setting";

	/* tabbar */

	.tabbar {
		height: @tabbar_h;
		background: @base_color;
		bottom: 0;
		border-top: 1px solid @base_color;
		font-size: 12*@rem;
		width: 100%;
		position: fixed;
		z-index: 66;

		a, i, span {
			display: block;
		}

		.tabbar_menu {
			float: left;
			height: 86*@half_rem;
		}

		.tabbar_menu.on {
			background: #fff;
		}

		.tabbar_menu.on .menu_item {
			color: @base_color;
		}

		.menu_item {
			float: left;
			width: 100%;
			height: 100%;
			color: #fff;
			cursor: pointer;
			position: relative;
		}

		.menu_icon {
			margin: 0 auto;
			margin-top: 2*@rem;
			text-align: center;
			font-size: 18*@rem;
		}

		.menu_title {
			text-align: center;
			margin-top: 2*@rem;
		}

		.tabbar_submenu {
			display: none;
			position: absolute;
			top: -@tabbar_h - 50*@rem;
			background: @base_color;
			width: 100%;
		}

		.submenu_item {
			color: #fff;
			text-align: center;
			height: 40*@rem;
			line-height: 40*@rem;
			background: lighten(@base_color, 5%);

			&:hover {
				background: lighten(@base_color, 12%);
			}
		}

		.trangle_down {
			position: absolute;
			left: 50%;
			bottom: -12*@rem;
			margin-left: -6*@rem;
			width: 0;
			height: 0;
			border-width: 6*@rem;
			border-style: solid;
			border-color: lighten(@base_color, 5%) transparent transparent transparent;
		}
	}

	/* layout */
	@media screen and (min-width: 960px) {
		.tabbar {
			width: @wrapper_max_w;
		}
	}
</style>
