// 柱状图模块2————人口数

  //1、实例化对象
  var pop_chart = echarts.init(document.querySelector(".bar2 .chart"));
  //2、指定配置项和数据
  var jsondata;
  //计时器
  var timer = null;//计时器
  //颜色
  var colorArr = [['#2f89cf','#9fe6b8'],['#2f89cf','#2E72BF'],['#2f89cf','#9fe6b8']]
  var pop_option = {

      grid: {
          left: '20%',
          right: 15,
          bottom: 40,
          top: 30
      },
      tooltip: {
          formatter: function(params) {
              return '地区：' + params.name + '</br> 人数：' + params.value;
          }
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
              rotate:45,
          }
      },
      yAxis: {
          type: 'value',
          data: [],
          splitLine: {
              show: false
          },
          axisLine: {
              show: true
          },
           //不显示y轴相关刻度
          axisTick: {
              show: false
          },
          //y轴标签为白色
          axisLabel: {
              color: '#fff',
          },

      },
      dataZoom:{
          show:false,
          startValue:1,
          endValue:10
      },
      series: [{
          type: 'bar',
          barWidth: 25,
          data: [],
          animationDelay: function(idx) { //延迟显示的动画效果，idx：条目的索引
              return idx * 50;
          },
          //不同数值显示不同颜色，颜色渐变
          itemStyle:{
              barBorderRadius: [20,20,0,0],//柱子圆角
              color:(arg)=>{
                 /* return 'yellow'  */
                 /*  if(arg.value>=8){
                      return 'red'
                  }else if(arg.value>=6){
                      return 'green'
                  }else{
                      return 'blue'
                  } */
                  var targetColor = null;
                  if(arg.value>=8){
                      targetColor =  colorArr[0]
                  }else if(arg.value>=6){
                      targetColor =  colorArr[1]
                  }else{
                      targetColor =  colorArr[2]
                  }
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: targetColor[0] }, //渐变起始颜色
                      { offset: 1, color: targetColor[1] } //渐变结束颜色
                  ], false)
              }

          }
      }]
  };
  // var pics = [];
  // var xAxisArray=[];//坐标轴数据
  // var setData = (function() {
  //     return function() {
  //         var d = JSON.parse(jsondata);
  //         for (var i = 1; i < d.RECORDS.length; i++) {
  //             pics.push({
  //                 value: d.RECORDS[i].peopletot ,
  //                 name: d.RECORDS[i].area,
  //             })
  //             //水平坐标轴
  //             xAxisArray.push(d.RECORDS[i].area)
  //         }
  //         //排序
  //         /* pics.sort(function(a,b){
  //             return b.value - a.value;
  //         })  */
  //         option.series[0].data = pics;
  //         //添加水平坐标轴
  //         option.xAxis.data = xAxisArray;
  //         mychart.setOption(option);
  //
  //
  //     }
  // })();

  function startTimer(){
      if(timer){
          clearInterval(timer)
      }
      timer = setInterval(function(){
          pop_option.dataZoom.startValue = pop_option.dataZoom.startValue+1;
          pop_option.dataZoom.endValue = pop_option.dataZoom.endValue+1;
          if(pop_option.dataZoom.endValue>=100){
              pop_option.dataZoom.startValue = 0;
             pop_option.dataZoom.endValue = 9
          }
          pop_chart.setOption(pop_option)
      },1000)
  }
  startTimer();

  pop_chart.on("mouseover",function(){
      clearInterval(timer)
  });
  pop_chart.on("mouseout",function(){
      //开启计时器
      startTimer()
  })


  // $.ajax({
  //     type: "GET",
  //     url: "./json/test.json",
  //     dataType: "json", //去异步获取跨域资源的实现方式
  //     success: function(d) {
  //         //localStorage.data = JSON.stringify(d); // 将从服务器加载过来的数据转换为JSON格式的对象后， 保存在本地data缓存里面
  //         //console.log(d)
  //         jsondata = JSON.stringify(d);
  //         setData(); //调用setData方法对myChart option进行配置,同时显示图表
  //     }
  // });
  pop_chart.setOption(pop_option);
  //4、图表跟随屏幕自动适应
  window.addEventListener("resize", function() {
      pop_chart.resize();
  })
