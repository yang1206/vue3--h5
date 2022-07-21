<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

//底部tab栏相关
const useTabBar = () => {
	const state = reactive({
		tabBar: [
			{
				title: '首页',
				to: {
					name: 'Home'
				},
				icon: 'home-o'
			},
			{
				title: '我的',
				to: {
					name: 'User'
				},
				icon: 'user-o'
			}
		]
	})
	return toRefs(state)
}
const { tabBar } = useTabBar()

const handleChange = (value) => {
	// console.log(value,'valueeeeeee');
}
const includeList = ref(["GameList", "Home","About"])
</script>

<template>
	<div class="app-container">
		<div class="layout-content">

			<div class="layout-content">
				<router-view v-slot="{ Component }">
					<!-- 如果使用过度动画，所有路由组件必须只有一个根标签 -->
					<transition name="slide-fade" type="transition">
						<keep-alive :include="includeList">
							<component :is="Component" :key="$route.meta.name"/>
						</keep-alive>
					</transition>
				</router-view>
			</div>
		</div>
		<div class="layout-footer">
			<TabBar v-show="route.name == 'Home' || route.name == 'User'" :data="tabBar" @chang="handleChange"></TabBar>
		</div>
	</div>
</template>

<style lang="scss" scoped>
</style>