<template>
	<div id="contact">
		<section id="dituContent" class="map">抱歉，您的浏览器不支持显示该地图信息</section>
		<section class="contact_info">
			<div class="cont_frame contact_part">
				<h1>公司地址</h1>
				<p style="margin-bottom:0">广西壮族自治区南宁市青秀区月湾路1号南国弈园508室</p>
			</div>
			<div class="cont_frame contact_part">
				<h1>联系方式</h1>
				<p style="cont_frame margin-bottom:0">
					联系人：肖健<br/>
					电话：0771-5829196<br/>
					邮箱：xiaojian@zhujia.com
				</p>
			</div>
			<div class="cont_frame contact_part">
				<h1>申报入口</h1>
				<p>请留下您的联系信息，我们会尽快与您联系。</p>
				<div id="form-message">
					<form>
						<div class="select_cont">
							<i class="icon-arrow-down"></i>
							<input type="text" class="select_btn" v-model="form.serType" readonly="readonly" placeholder="选择服务类型（必选）" @click="popModel"/>
						</div>
						<input type="text" v-model="form.companyName" placeholder="企业名称（必填）"/>
						<input type="text" v-model="form.linkMan" placeholder="联系人姓名（必填）"/>
						<input type="text" v-model="form.linkPhone" placeholder="联系人电话（必填）"/>
						<textarea v-model="form.companyInfo" placeholder="企业简介（选填）"></textarea>
						<input type="button" class="button" value="提交" @click="onSubmit"/>
					</form>
				</div>
			</div>
			<!-- 选择窗口 -->
			<div class="pop_model" v-show="showModel" ref="popModel">
				<ul class="select_list">
					<li v-for="(item, index) in serTypeList" :key="index" @click="selectService(index)">{{ item.name }}</li>
				</ul>
			</div>
			<!-- 遮罩层 -->
			<div :class="['mask', showModel ? 'mask_show' : '']"></div>
		</section>
	</div>
</template>

<script>
	import $ from "jquery";
	// 百度地图
	import {initMap} from '@/assets/js/map.js'

	export default {
		name: "contactUs",
		data(){
			return{
				map:{
					// 需要生成地图的容器ID
					id: 'dituContent',
					// 地图坐标
					point:{
						X: '108.402460',
						Y: '22.821733'
					},
					// 缩放级别
					zoom: 17,
					// 设置地图事件
					setEvent: true,
					// 向地图中添加marker
					addMarker: true,
					// 向地图添加控件
					addMapControl: false,
					// 标注点数组（w,h为图标大小）,可标记多个
					markerArr: [
						{
						title: '华建信息',
						content: '华建信息科技股份公司',
						point: '108.402080|22.821875',
						isOpen: 0,
						// icon图标
						icon:{ w: 33, h: 46, l: 0, t: 0, x: 6, lb: 5, url: require('@/assets/images/icon-location.png') },
						// 设置标签样式
						label:{
							left: '30px',
							top: '-40px',
							position: 'absolute',
							color: '#333',
							cursor: 'pointer',
							border: 'none',
							padding: '8px'
							},
						}
					],
				},
				// 服务类型列表
				serTypeList:[
					{
						name: '项目申报',
						value: '1'
					},
					{
						name: '资质申报',
						value: '2'
					},
					{
						name: '计算机软件著作权申请',
						value: '3'
					}
				],
				// 表单信息
				form:{
					// 项目申报类型
					serType: '',
					// 企业名称
					companyName: '',
					// 联系人
					linkMan: '',
					// 联系电话
					linkPhone: '',
					// 企业简介
					companyInfo: ''
				},
				// 是否显示遮罩
				showModel: false,
			}
		},
		created(){
			this.$store.commit('SET_NAV_TITLE', '联系我们');
		},
		mounted() {
			initMap(this.map);
		},
		methods:{
			// 提交表单
			onSubmit(){
				alert('yeah');
			},
			// 显示弹窗
			popModel(){
				this.showModel = true;
				this.$nextTick(function () {
					let model = $(this.$refs.popModel);
					model.css('margin-top', - model.height()/2 + 'px');
				})
			},
			// 选择服务类型
			selectService(index){
				this.form.serType = this.serTypeList[index].name;
				this.showModel = false;
			}
		}
	};
</script>

<style lang="less">
	// 引入通用设置文件
	@import "../../assets/less/setting";
  
	/* map */

	// 取消“百度地图”字样显示
	.BMap_cpyCtrl.anchorBL, .BMap_cpyCtrl, .anchorBL{
		display: none;
		visibility: hidden;
	}

	.iw_poi_title {
		color: #CC5522;
		font-size: 14px;
		font-weight: bold;
		overflow: hidden;
		padding-right: 13px;
		white-space: nowrap
	}

	.iw_poi_content {
		font:12px arial,sans-serif;
		overflow: visible;
		padding-top: 4px;
		white-space: -moz-pre-wrap;
		word-wrap: break-word
	}

	.map{
		width: 100%;
		height: 200*@rem;
		text-align:center;
		background: #eee;
		color: @base_color;
		line-height: 200*@rem;
	}

	/* contact */

	.contact_info{
		margin-top: 10*@rem;
	}
	.contact_part{
		&:last-child{
			border-bottom:none;
		}

		h1{
			font-size: 0.14rem;
			margin-bottom: 10*@rem;
		}
		p{
			color:#888;
		}
	}

	input[type="button"]{
		width:100%;
	}

	textarea{
		min-height: 100*@rem;
	}

	.select_cont{
		position: relative;

		.icon-arrow-down{
			position: absolute;
			top: 13*@rem;
			right: 10*@rem;
			font-size: 10*@rem;
			color: #979797;
		}

		.select_btn{
			outline: none;
			width: 100%;
			height: 70*@half_rem;
			line-height: 70*@half_rem;
			font-family: "microsoft yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
			background: #fff;
			cursor: pointer;
			border: @border_deep;
			margin-bottom: 15*@rem;

			.border_radius_4;
		}
	}

	.select_list{
		li{
			padding: 12*@rem;
			border-bottom: @border_light;
			text-align: center;
			cursor: pointer;

			&:hover{
				color: @base_color;
				background: @base_hover_color;
			}
		}
	}
</style>
