<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { Dialog } from 'vant'
import { useUserStore } from '@/store';
import useToUrl from '@/hook/useToUrl';
const { toCustomer } = useToUrl()
const router = useRouter()

const edit = () => {
	router.push('/edit')
}
const avatar = ref(localStorage.getItem('avatar') || '')
const nickname = ref(localStorage.getItem('nickname') || '')
const mobile = ref(localStorage.getItem('mobile') || '')
const useUser = useUserStore()
const logout = () => {
	Dialog.confirm({
		title: '退出登录',
		message:
			'确认要退出登录吗？',
	})
		.then(() => {
			useUser.logout()
		})
		.catch(() => {
			// on cancel
		});

}

const toAbout = () => {
	router.push('/about')
}
</script>

<template>
	<div class="user" >
		<div class="top">
			<div class="avatar">
				<div class="img">
					<van-image round width="2rem" height="2rem" :src="avatar" />
				</div>
				<div class="username">
					<p>{{ mobile }}</p>
					<p>用户名：{{ nickname }}</p>
				</div>
			</div>
			<!-- <div class="edit" @click="edit">
				<img src="@/assets/img/edit.png" alt="">
			</div> -->
		</div>
		<div class="bottom">
			<div class="item" @click="toAbout">
				<div class="left">
					<van-icon name="info-o" size="15" /> <span>关于我们</span>
				</div>
				<van-icon name="arrow" size="15" />
			</div>
			<div class="item" @click="toCustomer">
				<div class="left">
					<van-icon name="service-o" size="15" /> <span>联系客服</span>
				</div>
				<van-icon name="arrow" size="15" />
			</div>
		</div>
		<div class="logout">
			<van-button round @click="logout" color="#FFC018" block><span style="color:black">退出登录</span></van-button>
		</div>
	</div>


</template>



<style lang="scss" scoped>
.user {
	display: flex;
	flex-direction: column;
	justify-content: center;
	background-image: linear-gradient(to bottom, #FECB4B, #FFFFFF);

	.top {
		margin-top: 2rem;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.avatar {
			display: flex;
			align-items: center;

			.img {
				margin: 0.5rem;
				overflow: hidden;
			}

			.username {
				display: flex;
				flex-direction: column;
				font-size: 0.4rem;
				justify-content: space-around;

				p {
					margin-top: 0.2rem;
				}
			}
		}

		.edit {
			img {
				width: 2rem;
			}
		}
	}

	.bottom {
		padding-top: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.item {
			display: flex;
			justify-content: space-between;
			margin: 0.3rem;

			span {
				font-size: 0.4rem;
			}
		}
	}

	.logout {
		padding-top: 1rem;
		width: 40vw;
		margin: 0 auto;
	}
}
</style>