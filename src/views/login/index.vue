<template>
	<div class="login-container">
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
			label-position="left">

			<div class="title-container">
				<h3 class="title">Login Form</h3>
			</div>

			<el-form-item prop="username">
				<span class="svg-container">
					<svg-icon icon-class="user" />
				</span>
				<el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text"
					tabindex="1" auto-complete="on" />
			</el-form-item>

			<el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon-class="password" />
				</span>
				<el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
					placeholder="Password" name="password" tabindex="2" auto-complete="on"
					@keyup.enter.native="handleLogin" />
				<span class="show-pwd" @click="showPwd">
					<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
				</span>
			</el-form-item>

			<br />
			<div class="tips">
				<!-- `checked` 为 true 或 false -->
				<el-checkbox v-model="checked">Remember me</el-checkbox>
			</div>
			<br />
			<el-form :inline="true">
				<el-form-item>
					<el-button :loading="loading" type="primary" style="width:100%;margin-bottom:0px;margin-right: 123px;"
						@click.native.prevent="handleRegister">
						Register</el-button>
				</el-form-item>
				<el-form-item>
					<el-button :loading="loading" type="primary" style="width:100%;margin-bottom:0px;margin-right: 123px;"
						@click.native.prevent="handleLogin">
						Login</el-button>
				</el-form-item>
			</el-form>

			<!-- <el-button :loading="loading" type="primary" style="width:50%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
      <el-button :loading="loading" type="primary" style="width:50%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
 -->

		</el-form>
	</div>
</template>

<script>
import {
	validUsername
} from '@/utils/validate'

export default {
	name: 'Login',
	data() {
		//logining:false
		const validateUsername = (rule, value, callback) => {
			if (value.length > 8) {
				callback(new Error(
					'The nickname is a 1 to 8-character name that will be displayed in the interface.'))
			} else {
				callback()
			}
		}
		const validatePassword = (rule, value, callback) => {
			if (value.length < 12) {
				callback(new Error(
					'At least 12 characters long but 14 or more is better. A combination of uppercase letters, lowercase letters, numbers, and symbols'
				))
			} else {
				callback()
			}
		}
		return {
			checked: true,
			loginForm: {
				username: 'admin',
				password: '11111111111111'
			},
			loginRules: {
				username: [{
					required: true,
					trigger: 'blur',
					validator: validateUsername
				}],
				password: [{
					required: true,
					trigger: 'blur',
					validator: validatePassword
				}]
			},
			loading: false,
			passwordType: 'password',
			redirect: undefined
		}
	},
	watch: {
		$route: {
			handler: function (route) {
				this.redirect = route.query && route.query.redirect
			},
			immediate: true
		}
	},
	methods: {
		showPwd() {
			if (this.passwordType === 'password') {
				this.passwordType = ''
			} else {
				this.passwordType = 'password'
			}
			this.$nextTick(() => {
				this.$refs.password.focus()
			})
		},
		//登录按钮
		handleLogin() {
			if (this.loginForm.username == '') {
				this.$message.error('用户名不能为空');
			} else if (this.loginForm.password == '') {
				this.$message.error('密码不能为空');
			} else {
				this.$axios.get('/login', {
					params: {
						name: this.loginForm.username,
						password: this.loginForm.password
					}
				}).then(res => {
					if (res.data.status == 200) {
						this.$router.push({
							path: '/home/Item1',
							query: {
								name: this.loginForm.username
							}
						})
					} else {
						// console.log(res.data.status);
						this.$alert('用户名或密码错误', '登录失败', {
							confirmButtonText: '确定',
							callback: action => {
								this.loginForm.username = '',
									this.loginForm.password = ''
							}
						});
					}
				}).catch(err => {
					console.log("登录失败" + err);
				})
			}
		},
		handleRegister() {
			this.$router.push("/register")
		},
	}
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
	.login-container .el-input input {
		color: $cursor;
	}
}

/* reset element-ui css */
.login-container {
	.el-input {
		display: inline-block;
		height: 47px;
		width: 85%;

		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			height: 47px;
			caret-color: $cursor;

			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: $cursor !important;
			}
		}
	}

	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
	min-height: 100%;
	width: 100%;
	background-color: $bg;
	overflow: hidden;

	.login-form {
		position: relative;
		width: 520px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
	}

	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;

		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}

	.svg-container {
		padding: 6px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}

	.title-container {
		position: relative;

		.title {
			font-size: 26px;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
}
</style>
