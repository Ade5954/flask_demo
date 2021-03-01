
var map_chart = echarts.init(document.getElementById("main"));
 //初始化echarts实例
//var map_chart_data =  [{'name': '上海', 'value': 318}, {'name': '云南', 'value': 162}];
var optionMap = {
		title: {
			text: '',
			subtext: '',
			x: 'left'
		},
		tooltip: {
			trigger: 'item'
		},
		//左侧小导航图标
		visualMap: {
			show: true,
			x: 'left',
			y: 'bottom',
			textStyle: {
				fontSize: 8,
				color:'#fff',
			},
			splitList: [{
					start: 3000000,
					end: 24400000
				},
				{
					start: 24400001,
					end: 45800000
				},
				{
					start: 45800001,
					end: 67200000
				},
				{
					start: 67200001,
					end: 88600000,
				},
				{
					start: 88600001,
				}
			],
			color: ['#fc0000','#fc5f00','#fc8200','#fcac00', 'yellow']
		},

			//配置属性
			series: [{
				name: '人数',
				type: 'map',
				mapType: 'china',
				roam: false,
				itemStyle: {
					normal: {
						borderWidth: .5,
						borderColor: '#009fe8',
						areaColor: '#ffefd5'
					},
					emphasis: {
						borderWidth: .5,
						borderColor: '#4b0082',
						areaColor: '#fff'
					}
				},
				label: {
					normal: {
						show: true, //省份名称
						fontSize: 8
					},
					emphasis: {
						show: true,
						fontSize: 8
					}
				},
				data: map_chart //数据
			}]
		};

		//使用制定的配置项和数据显示图表
		map_chart.setOption(optionMap);
