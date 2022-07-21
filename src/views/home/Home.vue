<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import BScroll from '@better-scroll/core'
import { useRouter, useRoute } from 'vue-router'
import { getIndexList } from './composables/useGameList'
//pinia状态管理
import { useAppStore } from '@/store/index'
//api接口
import { getTag } from '@/api/home'
import { device } from '@/utils/device'
const isIos = device()
//定义异步组件
const GameList = defineAsyncComponent(() => import("./component/GameList.vue"));
const appStore = useAppStore()

const router = useRouter()
// const route = useRoute()

const tagList = ref([])
const tagList2 = ref([])

const show = ref(false)
const isDesktop = (navigator as any).standalone
//使tab选中状态保持
// const active = computed(() => {
// 	return appStore.getActive
// })
const currentIndex = computed(() => {
	return appStore.getCurrentIndex
})


//取顶部tab点击数据
const onClickTab = (tab) => {
	appStore.changeTab(tab.name)
	let ids = tagList.value.filter((item) => {
		return item.name == tab.title
	})
	getIndexList(ids[0].id, 0)
	// window.scroll(0,0)
}
//二级tab点击数据
const tabClick = (id: number, index) => {
	appStore.changeCurrentIndex(index)
	getIndexList(0, id)
	// window.scroll(0,0)
}

const ToSearch = () => {
	router.push('/search')
}

//获取标签
const getTagList = () => {
	getTag().then((res) => {
		//取数组前四位作为最顶部tab
		tagList.value = res.data.splice(0, 4)
		tagList2.value = res.data.splice(-(res.data.splice.length - 2))
		// console.log(tagList2.value);
	})
}
getTagList()


const leftScroll = ref<HTMLElement | null>(null)
onMounted(() => {
	const bs = new BScroll(leftScroll.value, {
		scrollX: true,
		probeType: 1,
		click: true
	})
	// console.log(isDesktop);

	if (isIos == 2) {
		if (isDesktop) {

		} else {
			show.value = true
		}
	}

})
</script>
<script  lang="ts">
export default {
	name: "Home"
}
</script>
<template>
	<div >
		<!-- 首页头部图片 -->
		<van-sticky :offset-top="0">
			<!-- <div class="top" v-if="isDesktop"></div> -->
			<div class="toptab safe-area-inset-top">
				<div class="van-tabs">
					<van-tabs class="vantab" v-model:active="appStore.active"
						title-active-color="#FBB000" color="#FBB000" @click-tab="onClickTab">
						<van-tab style="font-size:16px;" :title="item.name" v-for="item in tagList" :key="item.id"></van-tab>
					</van-tabs>
				</div>
				<van-icon @click="ToSearch" size="0.5rem" name="search" />
			</div>
			<div class="tabs scroll-wrapper" ref="leftScroll">
				<div class="scroll-content">
					<span class="tab scroll-item" :class="{ active: index === currentIndex }" v-for="(item, index) in tagList2"
						@click="tabClick(item.id, index)">{{
						item.name
						}}</span>
				</div>
			</div>
		</van-sticky>

		<!-- 游戏列表 -->
		<Suspense>
			<GameList></GameList>
			<template #fallback>
				<van-skeleton avatar avatar-size="60" :row="5" :loading="true" v-for="i in 3">
				</van-skeleton>
			</template>
		</Suspense>


		<van-action-sheet v-model:show="show" :close-on-click-overlay="false" :closeable="false">
			<div class="action">
				<img src="@/assets/img/pop.png" alt="">
			</div>
		</van-action-sheet>

		<!-- <button class="btn">下载到桌面</button> -->
	</div>



</template>



<style lang="scss" scoped>













.top {
	width: 100%;
	height: 46px;
	// background-image: linear-gradient(to bottom, #b0b5b5, #fff);
	background-color: #e4e5e5
	// img {
	// 	width: 100%;
	// 	height: 100%;
	// 	object-fit: cover;
	// }

}

.toptab {
	display: flex;
	align-items: center;
	background-color: #fff;
	// background-image: linear-gradient(to bottom, #e4e5e5, #fff);

	// justify-content: center;
	.van-tabs {
		width: 90%;
		// background-image: linear-gradient(to bottom, #e4e5e5, #fff);
	}
}

.scroll-wrapper {
	position: relative;
	width: 100%;
	// margin: 80px auto;
	white-space: nowrap;
	overflow: hidden;
	background-color: #fff;

	.scroll-content {
		display: inline-block;
		line-height: 0.8rem;
		width: 135%;
	}


	.scroll-item {
		margin-left: 0.1rem;
		line-height: 1.5rem;
		font-size: 14px;
		display: inline-block;
		text-align: center;
		padding: 0 10px;


	}

	.active {
		color: #FBB000;
	}

	.tab:active {
		color: #FBB000;
	}
}

h1 {
	display: block;
	font-size: 40px;
	text-align: center;
	padding: 20px 0;
}

ul {
	li {
		display: block;
		font-size: 20px;
		padding: 20px 0;
		text-align: center;
	}
}

.action {


	img {
		padding: 0.6rem 0.3rem;
		width: 90%;
	}

}

.btn {
	position: fixed;
	bottom: 2rem;
	left: 50%;
	transform: translate(-50%);
	padding: 0.3rem;
	background-image: linear-gradient(to right, #ffee00, #ffb200);
	border-radius: 0.5rem;
	border: none;
	color: #fff;
	box-shadow: 2px 2px 5px #cac143;
	font-size: .333rem;
}
// ::v-deep .van-tabs{
// 	background-image: linear-gradient(to bottom, #e4e5e5, #fff);
// }
// ::v-deep .van-tab{
// 	background-image: linear-gradient(to bottom, #e4e5e5, #fff);
// }
</style>