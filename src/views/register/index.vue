<template>
    <div class="container">
        <div class="signin">
            <span>Already have an account？</span>
            
            <el-button type="primary" @click="nextstep()">Sign in<i class="el-icon-arrow-right"></i></el-button>
        </div>
        <br>
        <div class="register-in">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="Personal details" name="first"></el-tab-pane>
                <el-tab-pane label="Role details" name="second"></el-tab-pane>
                <el-tab-pane label="Interactive configuration" name="third"></el-tab-pane>
            </el-tabs>
        </div>
        <div v-if="activeName==first">
            

        </div>
        <div>
			<!--子页面挂载-->
            <router-view>
			</router-view> 
		</div>
           
    </div>
</template>


<script>
// import { RouterView } from 'vue-router';
// import { register } from '@/api/user'

import Personal from "@/views/register/personal"
  export default {
    data() {
        return {
            activeName: "first",
        };
        
    },
    components: { 
            'personal': Personal 
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
            if (tab.name == "first" ) {
                this.$router.push("personal");
            }
            else if (tab.name == "second") {
                this.$router.push("role");
            }
            else {
                this.$router.push("interactive")
            };
            sessionStorage.setItem('current_name', tab.name)
        },
        nextstep() {
        this.$router.push({path:'/login'});
    }
        
    },
	reload() {
	    //this.rerifycodeImg = `http://localhost:10010/v2/user-service/verifycode/${this.loginForm.username}?t=${new Date().getTime()}`
	    this.rerifycodeImg = `${process.env.VUE_APP_BASE_API}/user-service/verifycode/${this.loginForm.username}?t=${new Date().getTime()}`
	},
	

  //   created() {
  //       console.log("获取缓存前activeName=", this.activeName)

  //       if (sessionStorage.getItem('current_name') == null){
  //           this.activeName = 'first'
  //       }else{
  //           this.activeName = sessionStorage.getItem('current_name')
  //       }
  //   console.log("获取缓存后activeName=", this.activeName)
  // },
    // components: { RouterView}
};
</script>


<style scoped>
.signin{
    position:absolute;
    top: 10px;
    right :180px;
    display: inline;
}

.container{
    margin: 10px 30px;
}
.next{
    position: fixed;
    /* 设置图片相对于浏览器的位置
    距离右边180px,底部20px,宽度50px
*/
        right :180px;
        bottom:60px;
        width:50px;
}
</style>