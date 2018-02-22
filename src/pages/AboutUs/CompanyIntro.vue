<template>
	<div id="companyInfo">
		<!-- 加载数据 -->
		<Loading v-if="loading"></Loading>
		<!-- 加载结束 -->
		<div v-else>
			<div class="cont_frame">
				<p>
					这里是公司简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介......
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
		}
	};
</script>

<style>

</style>
