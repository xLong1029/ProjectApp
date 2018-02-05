<template>
	<div id="search" class="edge_frame">
		信息搜索
	</div>
</template>

<script>
	export default {
		name: "search",
		data(){
			return{

			}
		},
		created(){
			this.$store.commit('SET_NAV_TITLE', '信息搜索');
		}
	};
</script>

<style>

</style>
