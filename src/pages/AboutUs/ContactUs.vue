<template>
	<div id="contact" class="edge_frame">
		联系我们
	</div>
</template>

<script>
export default {
	name: "contactUs",
		data(){
			return{

			}
		},
		created(){
			this.$store.commit('SET_NAV_TITLE', '联系我们');
		}
	};
</script>

<style>
</style>
