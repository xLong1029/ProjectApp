<template>
	<nav id="tabBar">
		<ul class="tabbar">
			<!-- 通过 tab定义的route值 和 路由定义名称 是否一致来判断当前页，是则添加class=on激活当前页样式 -->
			<li v-for="(item, index) in menu" :key="index" :class="['tabbar_menu', item.routeName === $route.name ? 'on' : '']" :style="{ width:menuItemW }">				
				<!-- 含二级菜单的一级菜单 -->
				<div v-if="item.submenu.length > 0" class="menu_item" @click="showSubmenu(index)">
					<div>
						<i :class="['menu_icon',item.class]"></i>
						<span class="menu_title">{{ item.title }}</span>
					</div>
					<!-- 二级菜单 -->
					<div class="tabbar_submenu">
						<span class="trangle_down"><em></em></span>
						<ul>
							<li class="submenu" v-for="(subitem, i) in item.submenu" :key="i">
								<router-link :to="{ name: subitem.routeName }" class="submenu_item">{{ subitem.title }}</router-link>
							</li>
						</ul>						
					</div>
				</div>
				<!-- 一级菜单 -->
				<div v-else class="menu_item" @click="showPage(index, item.routeName)">
					<i :class="['menu_icon', item.class]"></i>
					<span class="menu_title">{{ item.title }}</span>
				</div>
			</li>
		</ul>
  </nav>
</template>

<script>
	// 通用js
	import Common from 'common/common.js'

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
						class: "icon-news",
						title: "申报资讯",
						submenu: []
					},
					{
						routeName: "SuccCases",
						class: "icon-case",
						title: "成功案例",
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

				// 判断是否需要激活样式
				let tabbarM = $(".tabbar_menu").eq(index);
				if(tabbarM.hasClass('on')){
					tabbarM.removeClass('on');
					for(let i = 0; i < this.menu.length; i++){
						if(this.$route.name == this.menu[i].routeName){
							$(".tabbar_menu").eq(i).addClass('on');
						}
					}
				}
				else{
					tabbarM.addClass('on').siblings().removeClass('on');
				}
			},
			// 显示页面
			showPage(index, routeName){	
				if(routeName){
					Common.GotoPage(routeName, {}, this);
					// 移除菜单样式
					$(".tabbar_menu").eq(index).addClass('on').siblings().removeClass('on');
				}
				// 隐藏所有二级菜单
				$(".tabbar_submenu").hide();
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
		background: #fff;
		bottom: 0;
		border-top: @border_deep;
		font-size: 12*@rem;
		width: 100%;
		position: fixed;
		z-index: 50;

		a, i, span {
			display: block;
		}

		.tabbar_menu {
			float: left;
			height: 86*@half_rem;
		}

		.tabbar_menu.on .menu_item {
			color: @base_color;
		}

		.menu_item {
			float: left;
			width: 100%;
			height: 100%;
			color: #888;
			cursor: pointer;
			position: relative;
		}

		.menu_icon {
			margin: 0 auto;
			text-align: center;
			.mt(4);
			.ft(18);
		}

		.menu_title {
			text-align: center;
			margin-top: 1*@rem;
		}

		.tabbar_submenu {
			display: none;
			position: absolute;
			top: -@tabbar_h - 50*@rem;
			background: #fff;
			width: 100%;
			border: @border_deep;
			.border_radius_4
		}

		.submenu{
			border-bottom: @border_deep;

			&:last-child{
				border-bottom: none;
			}
		}

		.submenu_item {
			color: @ft_base_color;
			text-align: center;
			height: 40*@rem;
			line-height: 40*@rem;			

			&:hover {
				color: @base_color;
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
			border-color:  #ccc transparent transparent;/*灰 透明 透明 */

			em{
				position: absolute;
				margin-left: -6*@rem;
				width: 0;
				height: 0;
				border-width: 6*@rem;
				border-style: solid;
				border-color: #fff transparent transparent;/*黄 透明 透明 */
				top: -7*@rem;
			}
		}
	}

	/* layout */
	@media screen and (min-width: 960px) {
		.tabbar {
			width: @wrapper_max_w;
		}
	}

	// 解决iPhoneX底部当初标签栏的问题
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.tabbar {
			height: @tabbar_h + 30*@rem;
			.menu_icon {
				.mt(10);
			}
		}

	}
</style>
