<template>
	<div id="companyInfo" class="edge_frame">
		公司简介
	</div>
</template>

<script>
	export default {
		name: "companyInfo",
		data(){
			return{

			}
		},
		created(){
			this.$store.commit('SET_NAV_TITLE', '公司简介');
		}
	};
</script>

<style>

</style>
