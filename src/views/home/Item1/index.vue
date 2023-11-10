<template>
	<el-container id="background">
        <!-- 图表左 -->
		<div ref="chart" style="width:50%;height:500px" class="chart" id='echart'></div>
		<!-- 图表右 -->
		<div ref="chart1" style="width:50%;height:500px" class="chart"></div>
	</el-container>
		
	
</template>

<script>
	export default {
		name: 'Item1',

		data() {return{ }},
		mounted() {
			this.getEchartData()
			this.getEchartData1()
		},

		methods: {
			getEchartData() {
				const chart = this.$refs.chart
				if (chart) {
					// 删除之前的实例重新创建
					let a = document.getElementById("echart");
					a.removeAttribute('_echarts_instance_');
					// const myChart = echarts.init(a);
					
					const myChart = this.$echarts.init(chart)
					const option = {
						title: {
						        text: 'Firewall events - by type',
						        left: '1%'
					    },
						tooltip: {
							trigger: 'item',
							formatter: '{a} <br/>{b} : {c} ({d}%)'
						},
						legend: {
							bottom: 10,
							left: 'center',
							data: ['Database access', 'Application access', 'Application denial', 'Others']
						},
						series: [{
							type: 'pie',
							radius: ['40%', '70%'],
							center: ['50%', '50%'],
							selectedMode: 'single',
							data: [{
									label: {
										formatter: [].join('\n'),
										backgroundColor: '#eee',
										borderColor: '#777',
										borderWidth: 1,
										borderRadius: 4,
									}
								},
								{
									value: 10,
									name: 'Database access'
								},
								{
									value: 15,
									name: 'Application access'
								},
								{
									value: 20,
									name: 'Application denial'
								},
								{
									value: 25,
									name: 'Others'
								}
							],
						 emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}]
					}
						myChart.setOption(option)
						window.addEventListener("resize", function() {
							myChart.resize()
						})
					}	
				this.$on('hook:destroyed', () => {
					window.removeEventListener("resize", function() {
						myChart.resize();
					});
				})
			},
			getEchartData1() {
				const chart1 = this.$refs.chart1
				if (chart1) {
					const myChart = this.$echarts.init(chart1)
					const option = {
						title: {
						        text: 'Node health - overview',
						        left: '1%'
						      },
						legend: {
							bottom: -5,
							left: 'center',
							data: ['Node 1', 'Node 2']
						},
						radar: {
							// shape: 'circle',
							indicator: [{
									name: 'CPU utilization',
									max: 6500
								},
								{
									name: 'Alert rate',
									max: 16000
								},
								{
									name: 'Network bandwidth utilization',
									max: 30000
								},
								{
									name: 'Memory usage',
									max: 38000
								},
								{
									name: 'Storage capacity',
									max: 52000
								}
							]
						},
						series: [{
							name: 'Budget vs spending',
							type: 'radar',
							data: [{
									value: [4200, 3000, 20000, 35000, 50000, 18000],
									name: 'Node 1'
								},
								{
									value: [5000, 14000, 28000, 26000, 42000, 21000],
									name: 'Node 2'
								}
							]
						}]
					}
					myChart.setOption(option)
					window.addEventListener("resize", function() {
						myChart.resize()
					})
				}
				this.$on('hook:destroyed', () => {
					window.removeEventListener("resize", function() {
						myChart.resize();
					});
				})
			}

		}

	}
</script>

<style>
    #background{
    box-shadow: 1px 2px 11px 2px #ffffff; /*边框 */
    background-size:cover;  /*框自动居中 */
    position:absolute;
    width:1050px;
    height:650px;
    top:70%;
    left:50%;
    transform:translate(-50%,-50%);
    border-radius: 10px;
    /* text-decoration:underline */
}
	.chart {
		float: left;
		margin-left: 100px; 
		border: 1px solid;
	}
</style>
