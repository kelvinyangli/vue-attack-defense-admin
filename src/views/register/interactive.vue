<template>
	
    <div class="container" style="display: flex; justify-content: space-between;">
		<!-- <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaa</p> -->
        <div class="details">
            <div class="left">
            <div class="typebox">
                <span style="float: left;">Alert type</span>
                <br>
                <el-select v-model="value1" placeholder="" @change="$forceUpdate()">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <br><br>

            <div class="alertbox">
                <span style="float: left;">Second alert</span>
                <br>
                <el-select v-model="value2" placeholder="" @change="$forceUpdate()">
                    <el-option
                        v-for="item in option2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <br><br>
            
            <div class="chatbox" >
                <span style="float: left;">Chat box</span>
                <br>
                <el-radio v-model="radio" label="1" >Enable</el-radio>
                <el-radio v-model="radio" label="2">Disable</el-radio>
            </div>
            <br><br>
            
            <div class="boxpos">
                <span style="float: left;">Chat box position</span>
                <br>
                <el-select v-model="value3" placeholder="" @change="$forceUpdate()">
                    <el-option
                        v-for="item in option3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>

        <div class="right">
        </div>
        

        </div>

        <div class="next">
            <el-button type="primary" @click="finishstep()">Complete<i class="el-icon-arrow-right"></i></el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                options:[
                    {value:'option1', label:'Sound'},
                    {value:'option2', label:'Pop up message'}
                ],
                option2:[
                    {value:'option1', label:'None'},
                    {value:'option2', label:'Every 1 minute'},
                    {value:'option3', label:'Every 5 minute'}
                ],
                option3:[
                    {value:'option1',label:'Bottom left corner'},
                    {value:'option2',label:'Bottom right corner'},
                    {value:'option3',label:'Top left corner'},
                    {value:'option4',label:'Top right corner'},
                ],
                radio:'1',
                finishstep() {
                    //this.$emit('handleClick', "second")
                    this.$router.push({path:'/login'});
          }
        }
    } 
}
</script>

<style>
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