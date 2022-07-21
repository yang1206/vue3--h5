<script lang="ts">
export default {
	name: 'TabBar'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

interface tabProps {
	data?: [
		{
			title: string
			to: string
			name: string
			icon: string
		}
	]
}

const props = defineProps<tabProps>()
//  console.log(props.data,'props.data');


const emit = defineEmits(['chang'])

const active = ref('home')

const onChange = (value) => {
	// console.log(value,'value');

	emit('chang', value)
}

</script>

<template>
	<div>
		<van-tabbar class="tabbar" fixed active-color="#FEC433" safe-area-inset-bottom safe-area-inset-top inactive-color="#000" route
			v-model="active" @change="onChange">
			<van-tabbar-item v-for="(item, index) in props.data" :to="item.to" :name="item.name" :key="index"
				:icon="item.icon">{{ item.title }}</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<style lang="scss" scoped>
</style>