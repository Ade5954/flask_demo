
  var edu_chart = echarts.init(document.querySelector('.pie2 .chart'));
  //var myChart = echarts.init(document.querySelector('.map .chart'));

  var edu_option = {
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

 //  var jsondata = null;
 //  var pics0=[]
 // //  var names=[]
 //  var setData = (function() {
 //      return function() {
 //       var d = JSON.parse(jsondata);
 //       for (var i = 1; i < d.RECORDS.length; i++) {
 //         pics0.push({
 //             value: d.RECORDS[i].collage,
 //             name:d.RECORDS[i].Noschool
 //           })
 //       }
 //             console.log(pics0)
 //          //   pics0.sort(function(a,b){
 //          //     return b.value - a.value;
 //          // })
 //          // currPics =  pics0.slice(0,10)// 数据太多，取前15条
 //
 //          option.series[0].data =  pics0
 //          myChart.setOption(option);
 //
 //      }
 //  })();

 //  $.ajax({
 //   type: "GET",
 //   url: "./json/education.json",
 //   dataType: "json", //去异步获取跨域资源的实现方式
 //   success: function(d) {
 //       //localStorage.data = JSON.stringify(d); // 将从服务器加载过来的数据转换为JSON格式的对象后， 保存在本地data缓存里面
 //       // console.log(d)
 //       jsondata = JSON.stringify(d);
 //       setData(); //调用setData方法对myChart option进行配置,同时显示图表
 //   }
 // });

  edu_chart.setOption(edu_option);
  window.addEventListener('resize', function () {
    edu_chart.resize();
  })
