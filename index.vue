<template>
	<div class="container" >
		<!-- 图标 -->
		<el-container id="icon">
			<img src="../img/p2.png" alt="企业图标" width="100" height="100">
			<img src="../img/p1.svg" alt="企业图标" width="100" height="100">
			<img src="../img/p3.png" alt="企业图标" width="100" height="100">
	    </el-container>
		
		<!-- 可点 -->
		<el-container id="item">
			<div class='min1'>
				<!-- 点击跳转 -->
				<el-button type="text" icon="el-icon-house" @click='pushItem1' ><br><br>Item1</el-button>
			</div>
			<div class='min2'>
				<el-button type="text" icon="el-icon-document-copy" @click='pushItem2'><br><br>Item2</el-button>
			</div>
			<div class='min2'>
				<el-button type="text" icon="el-icon-notebook-1" @click='pushItem3'><br><br>Item3</el-button>
			</div>
			<div class='min2'>
				<el-button type="text" icon="el-icon-user"><br><br>Item4</el-button>
			</div>	
		</el-container>
		<br><br><br><br><br><br><br><br><br><br><br><br>
		<div>
			<!-- 指定组件的呈现位置 -->
			<router-view>
			</router-view>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'Home',
	  methods:{
		pushItem1(){
			this.$router.push("Item1");	
		},
		pushItem2(){
			this.$router.push("Item2");	
		},
		pushItem3(){
			this.$router.push("Item3");	
		}
	  }
	  
	}
	
</script>

<style>
    #icon{
    box-shadow: 1px 2px 11px 2px #ffffff; /*边框 */
    background-size:cover;  /*框自动居中 */
    position:absolute;
    width:1050px;
    height:650px;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    border-radius5: 10px;
    /* text-decoration:underline */
}
#item{
    box-shadow: 1px 2px 11px 2px #ffffff; /*边框 */
    background-size:cover;  /*框自动居中 */
    position:absolute;
    width:1050px;
    height:650px;
    top:50%;
    left:40%;
    transform:translate(-50%,-50%);
    border-radius: 10px;
    /* text-decoration:underline */
}
	.container{
		margin-left: 200px;
	}
	.icon {
		margin-left: -170px;
		height: 150px;
		width: 800px;
	}

	.item {
		margin-top: -110px;
		margin-left: 300px;
	}
	.min1{
		margin-left: 700px;
		float:left;
	}
	.min2{
		margin-left: 100px;
		float:left;
	}
</style>
