<template>
	<div id="search">
		<section class="cont_frame">
			<p>
				项目申报信息
			</p>
		</section>
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
