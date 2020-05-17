<!--  -->
<template>
	<div class="login">
		<div class="form-wrapper">
			<el-form ref="form" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="登录名：" prop="name">
					<el-input v-model="form.name" placeholder="请输入登录名"></el-input>
				</el-form-item>
				<el-form-item label="登录密码：" prop="password">
					<el-input show-password placeholder="请输入登录密码" v-model="form.password"></el-input>
				</el-form-item>
				<div class="button-wrapper">
					<el-button type="primary" style="width: 300px;margin-left: 100px" @click="login">登录</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: "",
				password: ""
			},
			rules: {
				name: [{ required: true, message: "请输入登录名", trigger: "blur" }],
				password: [
					{ required: true, message: "请输入登录密码", trigger: "blur" }
				]
			}
		};
	},

	methods: {
		login() {
			this.$refs.form.validate(valid => {
				if (valid) {
					sessionStorage.setItem("userName", this.form.name);
					this.$router.push("/home");
				}
			});
		}
	}
};
</script>
<style lang='scss' scoped>
.login {
	display: flex;
	justify-content: center;
	background: #2d3a4b;
	height: 100%;
	.form-wrapper {
		width: 400px;
		margin-top: 200px;
		padding: 20px;
		border-radius: 10px;
	}
	.button-wrapper {
		width: 100%;
		text-align: center;
	}
	.el-form-item {
		color: #454545;
	}
}
</style>
<style lang="scss">
.login{
  .el-form-item__label {
    color: #fff;
    background: #2d3a4b;
  }
  .el-form-item {
    background: rgba(0, 0, 0, 0.1);
  }
  .el-input__inner {
    background: rgba(0, 0, 0, 0.1);
    color: #fff;
  }

}
</style>
