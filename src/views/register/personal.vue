<template>
    <div class="container">
        <div class="details" style="display: flex; justify-content: space-between;">
            <el-form ref="form" :model="form" label-position="left">
                <!--用户名-->
                <el-form-item label="Username">
                    <el-input placeholder="" v-model="form.name" clearable></el-input>
                </el-form-item>

                <!--密码-->
                <el-form-item label="Password">
                    <el-tooltip
                        content="At least 12 characters long but 14 or more is better. A combination of uppercase letters, lowercase letters, numbers, and symbols."
                        placement="right-start" class="text1">
                        <i class="el-icon-question" />
                    </el-tooltip>
                    <el-input placeholder="" v-model="form.password" show-password></el-input>
                </el-form-item>

                <!--昵称-->
                <el-form-item label="Nickname">
                    <el-tooltip content="The nickname is a 1 to 8-character name that will be displayed in the interface."
                        placement="right-start" class="text2">
                        <i class="el-icon-question" />
                    </el-tooltip>
                    <el-input placeholder="" v-model="nickname" clearable></el-input>
                </el-form-item>

                <!--年龄-->
                <el-form-item label="Age">
                    <el-select v-model="value1" placeholder="" @change="$forceUpdate()" style="width:100%">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-form class="right">
                <!--Os type-->
                <el-form-item label="OS Type">
                    
                    <br>
                    <el-select v-model="value2" placeholder="" @change="$forceUpdate()">
                        <el-option v-for="item in option2" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>


                <!--Confidence-->
                <el-form-item label="Rate your confidence in your cybersecurity knowledge on a scale">
                    
                    <el-rate v-model="value3" :colors="colors" :max=10>
                    </el-rate>
                </el-form-item>
            </el-form>

            <div class="next">
                <el-button type="primary" @click="nextstep()">Next Step<i class="el-icon-arrow-right"></i></el-button>
            </div>

        </div>
        <router-view></router-view>

    </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
var qs = require('qs');
export default {
    data() {
        return {
            user: '',
            password: '',
            nickname: '',
            options: [
                { value: 'option 1', label: 'Under 21' },
                { value: 'option 2', label: '21 - 30 years' },
                { value: 'option 3', label: '31 - 40 years' },
                { value: 'option 4', label: '41 - 50 years' },
                { value: 'option 5', label: '51 - 60 years' },
                { value: 'option 6', label: 'Above 60' },
            ],
            option2: [
                { value: 'option 7', label: 'Windows' },
                { value: 'option 8', label: 'Mac OS' },
                { value: 'option 9', label: 'Linux' },
                { value: 'option 10', label: 'Other' },
            ],
            value3: null,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
            form: {
                name: 'lyy',
                password: '111',
            },
            //isnull: false

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
        nextstep() {
            //let form = this.form
            if (this.form.name == '') {
                this.$message.error('用户名不能为空');
            } else if (this.form.password == '') {
                this.$message.error('密码不能为空');
            } else {
                this.$axios({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: '/register',
                    method: "post",
                    data: Qs.stringify(this.form)
                }).then(res => {
                    //this.$router.push("/register/role")
                    if (res.data.status == 200) {
                        this.$alert('是否返回登录页面', '注册成功', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/login')
                            }
                        })
                        console.log(res)
                    } else if (res.data.status == 202) {
                        this.$alert('用户名已存在', '注册失败', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.form.name = '',
                                this.form.password = ''
                            }
                        })
                    } else {
                        console.log(res.message);
                    }
                }).catch(err => {
                    console.log("注册失败" + err);
                })

            }
        },

        reload() {
            //this.rerifycodeImg = `http://localhost:10010/v2/user-service/verifycode/${this.loginForm.username}?t=${new Date().getTime()}`
            this.rerifycodeImg = `${process.env.VUE_APP_BASE_API}/user-service/verifycode/${this.form.name}?t=${new Date().getTime()}`
        },
    },




}
</script >

<style scoped>
.container {
    margin: 10px 30px;
}

.right {
    margin: 0 150px;
}
.next{
    position: absolute;
    /* 设置图片相对于浏览器的位置
    距离右边180px,底部20px,宽度50px
*/
        right :200px;
        bottom:100px;
        width:50px;
}
.text1 {
    display: inline-block;

}

.text2 {
    display: inline-block;
}
</style>