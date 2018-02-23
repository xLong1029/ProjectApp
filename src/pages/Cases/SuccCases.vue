<template>
	<div id="succCases">
		<!-- 加载数据 -->
		<Loading v-if="loading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<ul class="case_list">
				<li v-for="(item, index) in caseList" :key="index" class="case_li_item fl">
					<a>
						<p class="case_name">
							<i class="case_icon icon-case"></i>
							<span class="case_title">项目名称: </span>{{ item.projectName }}
						</p>
						<p class="case_company">
							<i class="case_icon icon-company"></i>
							<span class="case_title">立项单位: </span>{{ item.companyName }}
						</p>
						<span class="case_type tag">{{ item.type }}</span>					
					</a>	
				</li>
			</ul>
			<!-- 版权信息 -->
			<Copyright></Copyright>
		</div>
	</div>
</template>

<script>
	// 组件
	import Loading from "components/Common/Loading.vue";
	import Copyright from "components/Common/Copyright.vue";

	export default {
		name: "succCases",
		components: { Loading, Copyright },
		data(){
			return{
				// 是否加载
				loading: false,
				// 案例列表
				caseList: [
					{
						logo: require('assets/images/pic-logo-hualan.jpg'),
						companyName: '据说是华蓝集团, 我试试公司名称长度',
						type: '科技专项',
						projectName: '这里是六六六，六到不行的项目名称，我就试试可以有多长',
						url: null
					},
					{
						logo: require('assets/images/pic-logo-hualan.jpg'),
						companyName: '据说是华蓝集团, 我试试公司名称长度',
						type: '文化专项',
						projectName: '这里是六六六，六到不行的项目名称，我就试试可以有多长',
						url: null
					},
					{
						logo: require('assets/images/pic-logo-hualan.jpg'),
						companyName: '据说是华蓝集团, 我试试公司名称长度',
						type: '服务专项',
						projectName: '这里是六六六，六到不行的项目名称，我就试试可以有多长',
						url: null
					},
					{
						logo: require('assets/images/pic-logo-hualan.jpg'),
						companyName: '据说是华蓝集团, 我试试公司名称长度',
						type: '科技专项',
						projectName: '这里是六六六，六到不行的项目名称，我就试试可以有多长',
						url: null
					},
					{
						logo: require('assets/images/pic-logo-hualan.jpg'),
						companyName: '据说是华蓝集团, 我试试公司名称长度',
						type: '文化专项',
						projectName: '这里是六六六，六到不行的项目名称，我就试试可以有多长',
						url: null
					},
					{
						logo: require('assets/images/pic-logo-hualan.jpg'),
						companyName: '据说是华蓝集团, 我试试公司名称长度',
						type: '服务专项',
						projectName: '这里是六六六，六到不行的项目名称，我就试试可以有多长',
						url: null
					}
				]
			}
		}
	};
</script>

<style lang="less" scoped>
	// 引入通用设置文件
	@import "../../assets/less/setting";

	.case_list{
		background:  #fff;

		&:after, &:before {
			.clr;
		}
	}

	.case_li_item{
		width: 100%;
		padding: 10*@rem @edge_w;
		border-bottom: @border_light;

		.pb(10);

		&:hover{
			background: #f8f8f8;
		}

		.case_logo{
			display: block;
			text-align: center;
			border: @border_light;
			
			.wd(80);
			.ht(50);
			.ellipsis;
		}
		
		.case_name{
			.mb(8);
		}

		.case_icon, .case_title{
			color: @base_color;
			.mr(5);
		}
	}
</style>
