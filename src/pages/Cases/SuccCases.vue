<template>
	<div id="succCases">    
		<ul class="case_list cont_frame">
			<li v-for="(item, index) in caseList" :key="index" class="case_li_item fl">
				<a :href="item.url">
					<img class="case_logo" :src="item.logo" alt=""/>
					<span class="case_title">{{ item.companyName }}</span>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "succCases",
		data(){
			return{
				caseList: [
					{
						logo: require('assets/images/default.png'),
						companyName: '华蓝集团',
						url: null
					},
					{
						logo: require('assets/images/default.png'),
						companyName: '华蓝集团',
						url: null
					},
					{
						logo: require('assets/images/default.png'),
						companyName: '华蓝集团',
						url: null
					},
					{
						logo: require('assets/images/default.png'),
						companyName: '华蓝集团',
						url: null
					},
					{
						logo: require('assets/images/default.png'),
						companyName: '华蓝集团',
						url: null
					},
					{
						logo: require('assets/images/default.png'),
						companyName: '华蓝集团',
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
		&:after, &:before {
			.clr;
		}
	}

	.case_li_item{
		width: 49%;

		.mb(20);

		&:nth-child(2n+1){
			margin-right: 2%;
		}

		.case_title{
			display: block;
			text-align: center;
			width: 100%;

			.ellipsis;
		}
		
	}
</style>
