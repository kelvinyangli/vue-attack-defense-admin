<template>
	<div>
		<!-- 搜索框-->
		<el-container id="search">
			<el-autocomplete
			  v-model="state"
			  :fetch-suggestions="querySearchAsync"
			  placeholder="请输入内容"
			  @select="handleSelect"
			></el-autocomplete>
		</el-container>
		<br />
		<!-- 列表 -->
		<el-container id="table">
			<el-table
			      :data="tableData"
			      style="width: 68%">
			      <el-table-column
			        prop="name"
			        label="Name"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="event"
			        label="Event Detail"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="source"
			        label="Source IP"
					width="180">
			      </el-table-column>
				  <el-table-column
				    prop="time"
				    label="Time"
					width="180">
				  </el-table-column>
			    </el-table>	
		</el-container>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        restaurants: [],
	        state: '',
	        timeout:null,
			tableData: [{
			            name: 'User Logon',
			            event: '***',
			            source: '192.168.0.1',
						time:'2023-02-23'
			          }, {
			            name: 'Registry Delete',
			            event: '***',
			            source: '***',
			            time:'***'
			          }, {
			            name: 'Service Warning',
			            event: '***',
			            source: '***',
			            time:'***'
			          }]
	      };
	    },
	    methods: {
	      loadAll() {
	        return [
	          { "value": "User Logon"},
	          { "value": "Registry Delete"},
	          { "value": "Service Warning" },
	        ];
	      },
	      querySearchAsync(queryString, cb) {
	        var restaurants = this.restaurants;
	        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
	
	        clearTimeout(this.timeout);
	        this.timeout = setTimeout(() => {
	          cb(results);
	        }, 3000 * Math.random());
	      },
	      createStateFilter(queryString) {
	        return (state) => {
	          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
	        };
	      },
	      handleSelect(item) {
	        console.log(item);
	      }
	    },
	    mounted() {
	      this.restaurants = this.loadAll();
	    }
	  };
</script>

<style>
#search{
    box-shadow: 1px 2px 11px 2px #ffffff; /*边框 */
    background-size:cover;  /*框自动居中 */
    position:absolute;
    width:1050px;
    height:650px;
    top:80%;
    left:50%;
    transform:translate(-50%,-50%);
    border-radius: 10px;
    /* text-decoration:underline */
}
#table{
    box-shadow: 1px 2px 11px 2px #ffffff; /*边框 */
    background-size:cover;  /*框自动居中 */
    position:absolute;
    width:1050px;
    height:650px;
    top:80%;
    left:80%;
    transform:translate(-50%,-50%);
    border-radius: 10px;
    /* text-decoration:underline */
}
	
	
</style>
