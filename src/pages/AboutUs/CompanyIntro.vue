<template>
	<div id="companyInfo">
		<!-- 加载数据 -->
		<Loading v-if="loading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<div class="cont_frame">
				<p style="text-indent:2em; margin-bottom:15px">
					广西华建信息科技股份公司成立于2016年7月，是一家充满活力的互联网企业，致力于利用互联网、IT技术打造建筑工程行业信息服务新模式，推动行业的创新与发展。
				</p>
				<p style="text-indent:2em; margin-bottom:15px">
					华建公司由华蓝集团相关人员投资组建，具有深厚的行业背景和资源。公司现有员工22人，其中专业技术人员17人，中高级以上职称7人。
				</p>
				<p style="text-indent:2em; margin-bottom:15px">
					华建公司的主要业务包括：经营性互联网服务；技术开发、技术咨询、技术服务、技术转让；计算机软硬件的开发与销售等。“筑+网”建材数据库平台是公司目前开展的第一个主营项目。
				</p>
				<p style="text-indent:2em; margin-bottom:15px">
					“筑+网”围绕建筑设备与材料选材为核心功能，以“互联网+”的方式提供低成本、高品质的技术和服务产品，为建筑工程行业的设计师、厂商、施工方和业主方（政府部门）提供建材信息大数据服务。
				</p>
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

	export default {
		name: "companyInfo",
		components: { Loading, Copyright },
		data(){
			return{
				// 是否加载
				loading: false,
			}
		},
		created(){
			this.$store.commit('SET_NAV_TITLE', '公司简介');
			this.$store.commit('SET_NEED_SCORLL_PAGE', false);
		}
	};
</script>

<style>

</style>
