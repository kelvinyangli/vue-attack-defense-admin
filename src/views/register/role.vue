<template>
    <div class="container" style="display: flex; justify-content: space-between;">
        <div class="left">

            <div class="teambox">
                <span style="float: left;">Select team</span>
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
            <div class="rolebox">
                <span style="float: left;">Select role</span>
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
        </div>
        <div class="right">
            Team lead only
            <br><br><br>
            <div class="leaderbox">
                <div class="namebox">
                    <span class="demonstration" style="float: left;">Team name</span>
                    <el-input placeholder="" v-model="teamname" clearable></el-input>
                </div>
                <br><br>
                
                <div class="memeberbox">
                    <span style="float: left;">Select Team member</span>
                    <br>
                    <el-select v-model="value3" multiple placeholder="" @change="$forceUpdate()" style="width:100%">
                        <el-option
                            v-for="item in option3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                options:[
                    {value:'option1', label:'Blue team'},
                    {value:'option2', label:'White team'}
                ],
                option2:[
                    {value:'option1', label:'Team lead'},
                    {value:'option2', label:'Team member'}
                ],
                option3:[
                    {value:'option1',label:'Blue candidate 1'},
                    {value:'option2',label:'Blue candidate 2'},
                    {value:'option3',label:'Blue candidate 3'},
                    {value:'option4',label:'Blue candidate 4'},
                    {value:'option5',label:'White candidate 1'},
                    {value:'option6',label:'White candidate 2'},
                ],
        }
    } 
}
</script>

<style>
.container{
    margin: 10px 30px;
}
</style>