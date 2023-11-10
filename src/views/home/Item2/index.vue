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
					const myChart = this.$echarts.init(chart)
					const option = {
						title: {
							text: 
							  'All events - last 12 hours',
								left: '1%'
							},
						  xAxis: {
						    type: 'category',
						    data: ['12', '11', '10', '9', '8', '7', '6','5','4','3','2','1']
						  },
						  yAxis: {
						    type: 'value'
						  },
						  series: [
						    {
						      data: [100, 120, 95, 85, 110, 120, 50,100, 120, 95, 85, 110,],
						      type: 'line',
							  name:'Data'
						    }
						  ],
						  legend: {
						      data: ['Data'],
							  bottom: -1,
						  }
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
						        text: 'All events - by type',
						        left: '1%'
						},
						tooltip: {
							trigger: 'item',
							formatter: '{a} <br/>{b} : {c} ({d}%)'
						},
						legend: {
							bottom: 10,
							left: 'center',
							data: ['User Logon', 'Malware infections', 'System and application error', 'System configuration change','DoS attacks','Unauthorized access attempts']
						},
						series: [{
							type: 'pie',
							radius: ['0', '70%'],
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
									name: 'User Logon'
								},
								{
									value: 15,
									name: 'Malware infections'
								},
								{
									value: 20,
									name: 'System and application error'
								},
								{
									value: 25,
									name: 'System configuration change'
								},
								{
									value: 25,
									name: 'DoS attacks'
								},
								{
									value: 25,
									name: 'Unauthorized access attempts'
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
