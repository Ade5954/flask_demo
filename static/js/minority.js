// 折线图模块1—---少数民族


  var min_chart = echarts.init(document.querySelector(".line .chart"));
  var jsondata
  var min_option = {
    // 修改三条线的颜色
    // ['#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
    color: [ '#0096ff', '#ff9f7f', '#9fe6b8'],
    tooltip: {
      trigger: 'axis'
    },
    // 图例组件
    legend: {
      // 当serise 有name值时， legend 不需要写data
      // 修改图例组件文字颜色
      textStyle: {
        color: '#4c9bfd'
      },
      right: '10%',
    },
    grid: {
      top: "20%",
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      show: true, // 显示边框
      borderColor: '#012f4a' // 边框颜色
    },
    xAxis: {
      type: 'category',
      boundaryGap: false, // 去除轴间距
      data: [],
      // 去除刻度线
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#4c9bfb" // x轴文本颜色
      },
      axisLine: {
        show: false // 去除轴线
      }
    },
    yAxis: {
      type: 'value',
      // 去除刻度线
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#4c9bfb" // x轴文本颜色
      },
      axisLine: {
        show: false // 去除轴线
      },
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    },
    series: [{
        type: 'line',
        smooth: true, // 圆滑的线
        name: '回族',
        data: []
      },
       {
        type: 'line',
        smooth: true, // 圆滑的线
        name: '蒙古族',
        data: []
      } ,{
        type: 'line',
        smooth: true, // 圆滑的线
        name: '藏族',
        data: []
      }
    ]
  };
  // 年份对应数据
  // var pics0=[]
  // var pics1=[]
  // var pics2=[]
  // var names=[]
  // var setData = (function() {
  //   return function() {
  //     var d = JSON.parse(jsondata);
  //     for (var i = 1; i < d.RECORDS.length; i++) {
  //
  //       pics0.push({
  //           value: d.RECORDS[i].menggu ,
  //         })
  //       pics1.push({
  //         value: d.RECORDS[i].hui ,
  //       })
  //       pics2.push({
  //         value: d.RECORDS[i].zang ,
  //       })
  //       names.push(d.RECORDS[i].years)
  //     }
  //     // console.log(pics)
  //     //将数据放入series和yAxis
  //     option.series[0].data = pics0;
  //     option.series[1].data = pics1;
  //     option.series[2].data = pics2;
  //      option.xAxis.data = names;
  //     // console.log(option.series[0].data)
  //
  //     myChart.setOption(option);
  //   }
  // })();
  // $.ajax({
  //   type: "GET",
  //   url: "./json/national_population.json",
  //   dataType: "json", //去异步获取跨域资源的实现方式
  //   success: function(d) {
  //       //localStorage.data = JSON.stringify(d); // 将从服务器加载过来的数据转换为JSON格式的对象后， 保存在本地data缓存里面
  //       // console.log(d)
  //       jsondata = JSON.stringify(d);
  //       setData(); //调用setData方法对myChart option进行配置,同时显示图表
  //   }
  // });

  min_chart.setOption(min_option);

  // 4.让图表随屏幕自适应
  window.addEventListener('resize', function () {
    min_chart.resize();
  })
