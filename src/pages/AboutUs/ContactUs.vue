<template>
	<div id="contact">
		<!-- 加载数据 -->
		<Loading v-if="pageLoading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<!-- 百度地图 -->
			<section id="dituContent" class="map">抱歉，您的浏览器不支持显示该地图信息</section>
			<!-- 联系信息 -->
			<div class="contact_info">
				<section class="cont_frame c_info_part">
					<h1>公司地址</h1>
					<p style="margin-bottom:0">广西壮族自治区南宁市青秀区月湾路1号南国弈园508室</p>
				</section>
				<section class="cont_frame c_info_part">
					<h1>联系方式</h1>
					<p style="margin-bottom:0">
						联系人：{{ contactInfo.linkMan }}<br/>
						电话：<a :href="'tel:' + contactInfo.phone" style="color:#333;">{{ contactInfo.phone }}</a><br/>
						邮箱：{{ contactInfo.email }}
					</p>
				</section>
				<section class="cont_frame c_info_part">
					<h1>申报入口</h1>
					<p>请留下您的联系信息，我们会尽快与您联系。</p>
					<div id="form-message">
						<form>
							<div class="select_cont">
								<i class="icon-arrow-down"></i>
								<input type="text" class="select_btn" v-model="form.Type" readonly="readonly" placeholder="选择服务类型（必选）" @click="popModal"/>
							</div>
							<input type="text" v-model="form.Company" placeholder="企业名称（必填）"/>
							<input type="text" v-model="form.LinkMan" placeholder="联系人姓名（必填）"/>
							<input type="tel" v-model="form.Phone" placeholder="联系人电话（必填）"/>
							<textarea v-model="form.Synopsis" placeholder="企业简介（选填）"></textarea>
							<input type="button" class="button" value="提交" @click="validForm"/>
						</form>
					</div>
				</section>
				<!-- 选择窗口 -->
				<SelectModal :show="showModel" :list-data="TypeList" @getSelectdata="setSelectData" @setShowModal="setModalState"></SelectModal>			
			</div>
			<!-- 版权信息 -->
			<Copyright></Copyright>
		</div>
	</div>
</template>

<script>
	// 百度地图
	import { initMap } from '@/assets/js/map.js'
	// 组件
	import Loading from "components/Common/Loading.vue";
	import Copyright from "components/Common/Copyright.vue";
	import SelectModal from "components/Modal/SelectModal.vue";
	// Api方法
	import Api from "api/api.js";
	// 通用JS
	import Common from "common/common.js";
	// 混合
	import Modal from "mixins/modal.js"

	export default {
		name: "contactUs",
		components: { SelectModal, Copyright, Loading },
		mixins: [ Modal ],
		data(){
			return{
				// 是否加载
				pageLoading: false,
				// 地图配置
				map:{
					// 需要生成地图的容器ID
					id: 'dituContent',
					// 地图坐标
					point:{
						X: '108.402460',
						Y: '22.821999'
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
				TypeList:[
					{
						name: '项目申报',
						value: '项目申报'
					},
					{
						name: '资质申报',
						value: '资质申报'
					},
					{
						name: '计算机软件著作权申请',
						value: '计算机软件著作权申请'
					}
				],
				// 表单信息
				form:{
					// 项目申报类型
					Type: '',
					// 企业名称
					Company: '',
					// 联系人
					LinkMan: '',
					// 联系电话
					Phone: '',
					// 企业简介
					Synopsis: ''
				},
				contactInfo:{
					email: '暂无内容',
					linkMan: '暂无内容',
					phone: '暂无内容'
				},
				// 是否显示遮罩
				showModel: false,
			}
		},
		created(){
			this.init();
		},
		methods:{
			// 初始化
			init(){
				this.$store.commit('SET_NAV_TITLE', '联系我们');
				this.getContactInfo();
			},
			// 获取联系方式
			getContactInfo(){
				// 开始加载
				this.pageLoading = true;

				Api.LinkInfo()
				.then(res => {
					if(res.code == 200){
						this.contactInfo = res.data;
						// 停止加载
						this.pageLoading = false;
						// 更新结束后再初始化百度地图
						this.$nextTick(() => {
							initMap(this.map);
						})
					}
					else{
						this.$store.commit('SET_WARN_MODAL', { show: true, text: res.msg });
					}
				})
				.catch(err => console.log(err))
			},
			// 验证表单
			validForm(){
				if(this.form.Type == ''){
					this.showWarnModel('请选择服务类型', 'warning');
					return false;
				}
				else if(this.form.Company == ''){
					this.showWarnModel('请输入企业名称', 'warning');
					return false;
				}
				else if(this.form.LinkMan == ''){
					this.showWarnModel('请输入联系人姓名', 'warning');
					return false;
				}
				else if(this.form.Phone == ''){
					this.showWarnModel('请输入联系人手机号码', 'warning');
					return false;
				}
				else if(!Common.regMobile.test(this.form.Phone)){
					this.showWarnModel('手机号码格式不正确', 'warning');
					return false;
				}
				else{
					this.onSubmit();
				}
			},
			// 提交表单
			onSubmit(){
				Api.PostContact(this.form)
				.then(res => {
					if(res.code == 200){
						this.$store.commit('SET_WARN_MODAL', { show: true, text: res.data });
						// 清空表单
						this.form = {
							Type: '',
							Company: '',
							LinkMan: '',
							Phone: '',
							Synopsis: ''
						}
					}
					else this.showWarnModel(res.msg, 'warning');
				})
				.catch(err => console.log(err))
			},
			// 显示弹窗
			popModal(){
				this.showModel = true;
			},
			// 设置弹窗显示状态
			setModalState(data){
				this.showModel = data;
			},
			// 设置选择的值
			setSelectData(data){
				this.form.Type = data;
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";
  
	/* map */

	.iw_poi_title {
		color: #CC5522;
		font-weight: bold;
		overflow: hidden;
		white-space: nowrap;

		.ft(14);
		.pr(12);
	}

	.iw_poi_content {
		font:12px arial,sans-serif;
		overflow: visible;
		white-space: -moz-pre-wrap;
		word-wrap: break-word;

		.pt(4);
	}

	.map{
		width: 100%;
		text-align:center;
		background: #eee;
		color: @base_color;
		line-height: 150*@rem;

		.ht(150);
	}

	/* contact */

	.contact_info{
		margin-top: 10*@rem;
	}

	.c_info_part{
		&:last-child{
			border-bottom:none;
		}

		h1{
			font-size: 0.14rem;
			margin-bottom: 10*@rem;
		}
		p{
			color:#666;

			&.hint{
				color: @warn_color;
			}
		}
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
			// 取消输入框自带光标
			-webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
            -webkit-user-select: none;
            -moz-user-focus: none;
            -moz-user-select: none;
            -webkit-appearance:none;
            outline: none;
			border: none;
			
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
</style>
