
  // 1.实例化对象
  var top5_chart = echarts.init(document.querySelector(".bar .chart"));
  // 2.指定配置项和数据
  var top5_option = {
    color: ['#2f89cf'],
    // 提示框组件
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    // 修改图表位置大小
    grid: {
      left: '0%',
      top: '20%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: {
      show: true,
      data:[],
      axisLine: {
          show: true
      },
       //不显示相关刻度
       axisTick: {
          show: false
      },
      axisLabel: {
          color: '#fff',
          rotate:0,
      }
  },
    // y轴相关配置
    yAxis: [{
      type: 'value',
      // 修改刻度标签，相关样式
      axisLabel: {
        color: "rgba(255,255,255,0.6)",
        fontSize: 12
      },
      // y轴样式修改
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.6)",
          width: 2
        }
      },
      // y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.1)"
        }
      }
    }],
    // 系列列表配置
    series: [{
      name: '户口数',
      type: 'bar',
      barWidth: '35%',
      // ajax传动态数据
      data: [],
      itemStyle: {
        // 修改柱子圆角
        barBorderRadius: 5
      }
    }]
  };
    // 年份对应数据
    // var pics0=[]
    // var names=[]
    // var namess=[]
    // var setData = (function() {
    //   return function() {
    //     var d = JSON.parse(jsondata);
    //     for (var i = 1; i < d.RECORDS.length; i++) {
    //       pics0.push({
    //           value: d.RECORDS[i].housetot ,
    //           name:d.RECORDS[i].area
    //         })
    //       names.push(d.RECORDS[i].area)
    //
    //     }
    //     /* 排序*/
    //      pics0.sort(function(a,b){
    //           return b.value - a.value;
    //       })
    //       currPics =  pics0.slice(0,5)// 数据太多，取前15条
    //       for (var i = 0; i < currPics.length; i++) {
    //         namess.push(currPics[i].name)
    //       }
    //       // console.log(currPics)
    //
    //
    //
    //     //将数据放入series和yAxis
    //     option.series[0].data = currPics;
    //     option.xAxis.data = namess;
    //     // console.log(option.xAxis.data)
    //     myChart.setOption(option);
    //   }
    // })();


    //  $.ajax({
    //   type: "GET",
    //   url: "./json/test.json",
    //   dataType: "json", //去异步获取跨域资源的实现方式
    //   success: function(d) {
    //       //localStorage.data = JSON.stringify(d); // 将从服务器加载过来的数据转换为JSON格式的对象后， 保存在本地data缓存里面
    //       // console.log(d)
    //       jsondata = JSON.stringify(d);
    //       setData(); //调用setData方法对myChart option进行配置,同时显示图表
    //   }
    // });

  // 3.把配置项给实例对象
  top5_chart.setOption(top5_option);

  // 4.让图表随屏幕自适应
  window.addEventListener('resize', function () {
    top5_chart.resize();
  })
