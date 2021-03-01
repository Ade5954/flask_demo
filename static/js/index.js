// 立即执行函数，防止变量污染 (function() {})();

// 柱状图模块1—————户口数(改好)
(function () {
  // 1.实例化对象
  var myChart = echarts.init(document.querySelector(".bar .chart"));
  // 2.指定配置项和数据
  var option = {
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
    var pics0=[]
    var names=[]
    var namess=[]
    var setData = (function() {   
      return function() {
        var d = JSON.parse(jsondata);
        for (var i = 1; i < d.RECORDS.length; i++) {
          pics0.push({
              value: d.RECORDS[i].housetot ,
              name:d.RECORDS[i].area
            })
          names.push(d.RECORDS[i].area)
          
        }
        /* 排序*/
         pics0.sort(function(a,b){
              return b.value - a.value;
          })
          currPics =  pics0.slice(0,5)// 数据太多，取前15条
          for (var i = 0; i < currPics.length; i++) {
            namess.push(currPics[i].name)
          }
          // console.log(currPics)
            
         
          
        //将数据放入series和yAxis
        option.series[0].data = currPics;
        option.xAxis.data = namess;
        // console.log(option.xAxis.data)
        myChart.setOption(option);
      }
    })();
    
     
     $.ajax({
      type: "GET",
      url: "./json/test.json",
      dataType: "json", //去异步获取跨域资源的实现方式
      success: function(d) {
          //localStorage.data = JSON.stringify(d); // 将从服务器加载过来的数据转换为JSON格式的对象后， 保存在本地data缓存里面
          // console.log(d)
          jsondata = JSON.stringify(d);
          setData(); //调用setData方法对myChart option进行配置,同时显示图表 
      }
    });
  
  // 3.把配置项给实例对象
  myChart.setOption(option);

  // 4.让图表随屏幕自适应
  window.addEventListener('resize', function () {
    myChart.resize();
  })
})();

// 柱状图模块2————人口数
(function() {
  //1、实例化对象
  var mychart = echarts.init(document.querySelector(".bar2 .chart"));
  //2、指定配置项和数据
  var jsondata;
  //计时器
  var timer = null;//计时器
  //颜色
  var colorArr = [['#2f89cf','#9fe6b8'],['#2f89cf','#2E72BF'],['#2f89cf','#9fe6b8']]
  var option = {
      
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
  var pics = [];
  var xAxisArray=[];//坐标轴数据
  var setData = (function() {      
      return function() {
          var d = JSON.parse(jsondata);
          for (var i = 1; i < d.RECORDS.length; i++) {
              pics.push({
                  value: d.RECORDS[i].peopletot ,
                  name: d.RECORDS[i].area,
              })
              //水平坐标轴
              xAxisArray.push(d.RECORDS[i].area)
          }  
          //排序
          /* pics.sort(function(a,b){
              return b.value - a.value;
          })  */
          option.series[0].data = pics;
          //添加水平坐标轴
          option.xAxis.data = xAxisArray;
          mychart.setOption(option); 
         
      
      }
  })();

  function startTimer(){
      if(timer){
          clearInterval(timer)
      }
      timer = setInterval(function(){
          option.dataZoom.startValue = option.dataZoom.startValue+1;
          option.dataZoom.endValue = option.dataZoom.endValue+1;
          if(option.dataZoom.endValue>=pics.length){
              option.dataZoom.startValue = 0;
              option.dataZoom.endValue = 9
          }
          mychart.setOption(option) 
      },1000)
  }
  startTimer();

  mychart.on("mouseover",function(){
      clearInterval(timer)
  });
  mychart.on("mouseout",function(){
      //开启计时器
      startTimer()
  })
 

  $.ajax({
      type: "GET",
      url: "./json/test.json",
      dataType: "json", //去异步获取跨域资源的实现方式
      success: function(d) {
          //localStorage.data = JSON.stringify(d); // 将从服务器加载过来的数据转换为JSON格式的对象后， 保存在本地data缓存里面
          //console.log(d)
          jsondata = JSON.stringify(d);
          setData(); //调用setData方法对myChart option进行配置,同时显示图表 
      }
  });

  //4、图表跟随屏幕自动适应
  window.addEventListener("resize", function() {
      mychart.resize();
  })
})();


// 折线图模块1—---少数民族
(function () {

  var myChart = echarts.init(document.querySelector(".line .chart"));
  var jsondata
  var option = {
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
  var pics0=[]
  var pics1=[]
  var pics2=[]
  var names=[]
  var setData = (function() {   
    return function() {
      var d = JSON.parse(jsondata);
      for (var i = 1; i < d.RECORDS.length; i++) {

        pics0.push({
            value: d.RECORDS[i].menggu ,
          })
        pics1.push({
          value: d.RECORDS[i].hui , 
        })
        pics2.push({
          value: d.RECORDS[i].zang , 
        })
        names.push(d.RECORDS[i].years)
      }
      // console.log(pics)
      //将数据放入series和yAxis
      option.series[0].data = pics0;
      option.series[1].data = pics1; 
      option.series[2].data = pics2; 
       option.xAxis.data = names;
      // console.log(option.series[0].data)

      myChart.setOption(option);
    }
  })();
  $.ajax({
    type: "GET",
    url: "./json/national_population.json",
    dataType: "json", //去异步获取跨域资源的实现方式
    success: function(d) {
        //localStorage.data = JSON.stringify(d); // 将从服务器加载过来的数据转换为JSON格式的对象后， 保存在本地data缓存里面
        // console.log(d)
        jsondata = JSON.stringify(d);
        setData(); //调用setData方法对myChart option进行配置,同时显示图表 
    }
  });

  myChart.setOption(option);

  // 4.让图表随屏幕自适应
  window.addEventListener('resize', function () {
    myChart.resize();
  }) 
})();


//本科人数（南丁格尔玫瑰图）
(function () {
  var myChart = echarts.init(document.querySelector('.pie2 .chart'));
  //var myChart = echarts.init(document.querySelector('.map .chart'));
  
  var option = {
    color: ['#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    grid: {
      top: "10%",
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    
    series: [{
      name: '大学本科',
      type: 'pie',
      radius: ["10%", "60%"],
      center: ['50%', '40%'],
      // 半径模式  area面积模式
      roseType: 'radius',
      // 图形的文字标签
      label: {
        fontsize: 6
      },
      // 引导线调整
      labelLine: {
        // 连接扇形图线长(斜线)
        length: 6,
        // 连接文字线长(横线)
        length2: 8
      },
      data: [
      ]
    }]
  };

  var jsondata = null;
  var pics0=[]
 //  var names=[]
  var setData = (function() {   
      return function() {
       var d = JSON.parse(jsondata);
       for (var i = 1; i < d.RECORDS.length; i++) {
         pics0.push({
             value: d.RECORDS[i].collage,
             name:d.RECORDS[i].Noschool
           })
       }
             console.log(pics0)
          //   pics0.sort(function(a,b){
          //     return b.value - a.value;
          // })
          // currPics =  pics0.slice(0,10)// 数据太多，取前15条

          option.series[0].data =  pics0
          myChart.setOption(option);
 
      }
  })();
 
  $.ajax({
   type: "GET",
   url: "./json/education.json",
   dataType: "json", //去异步获取跨域资源的实现方式
   success: function(d) {
       //localStorage.data = JSON.stringify(d); // 将从服务器加载过来的数据转换为JSON格式的对象后， 保存在本地data缓存里面
       // console.log(d)
       jsondata = JSON.stringify(d);
       setData(); //调用setData方法对myChart option进行配置,同时显示图表 
   }
 });
  
  myChart.setOption(option);
  window.addEventListener('resize', function () {
    myChart.resize();
  })
})();

//地图
(function() {
  var myChart = echarts.init(document.getElementById("main"));
  // 开启加载loading的动画
  myChart.showLoading();
  // jquery读取json文件
  $.get('./json/china.json', function (geoJson) {
      // 隐藏loading的动画
      myChart.hideLoading();
      echarts.registerMap('china', geoJson);
      option = {
          title: {
              left: 'center',
              textStyle: {
                  fontSize: 24
              },  
          },
          // 提示框组件
          tooltip: {
              trigger: 'item',
              // 浮层显示的延迟
              showDelay: 0,
              // 提示框浮层的移动动画过渡时间
              transitionDuration: 0.2,
              // 按要求的格式显示提示框
              /* formatter: function (params) {
                  var value = (params.value + '').split('.');
                  value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                  return params.seriesName + '<br/>' + params.name + ': ' + value;
              } */
              formatter: function(params) {                        
                  var toolTiphtml = ''
                  if (isNaN(params.value)){
                      toolTiphtml = params.name + ' 暂无数据';
                  }
                  else{
                      toolTiphtml ='城市：' + params.name + ' 人数: ' + params.value +'万' ;
                  }
                  //console.log(toolTiphtml)                        
                  return toolTiphtml;                   
          }

          },
          // 可视映射
          visualMap: {
              left: 'right',
              min: 0,
              max: 100000000,
              // 颜色区间
              inRange: {
                  color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
              },
              // 文本，默认为数值文本
              text: ['High', 'Low'],
              // 显示拖拽用的手柄
              calculable: true
          },
          // 工具盒
         
          series: [
              {
                  name: 'USA PopEstimates',
                  type: 'map',
                  // 开启鼠标缩放和平移漫游
                  roam: true,
                  map: 'china',
                  // 显示标签
                  emphasis: {
                      label: {
                          show: true
                      }
                  },
                  // 文本位置修正
                  textFixed: {
                      Alaska: [20, -20]
                  },
                  data: []
              }
          ]
      };
      var pics = [];
      var setData = (function() {      
      return function() {
          var d = JSON.parse(jsondata);
          for (var i = 0; i < d.RECORDS.length; i++) {
              pics.push({
                  name: d.RECORDS[i].name,
                  value: d.RECORDS[i].value,
              })
          }  
          //排序
          /* pics.sort(function(a,b){
              return b.value - a.value;
          })  */
          option.series[0].data = pics;
          // console.log(pics)
          //添加水平坐标轴
          // option.xAxis.data = xAxisArray;
          myChart.setOption(option); 
         
      
      }
  })();

  $.ajax({
      type: "GET",
      url: "./json/toal.json",
      dataType: "json", //去异步获取跨域资源的实现方式
      success: function(d) {
          //localStorage.data = JSON.stringify(d); // 将从服务器加载过来的数据转换为JSON格式的对象后， 保存在本地data缓存里面
          //console.log(d)
          jsondata = JSON.stringify(d);
          setData(); //调用setData方法对myChart option进行配置,同时显示图表 
      }
  });
      myChart.setOption(option);
  });
})()

