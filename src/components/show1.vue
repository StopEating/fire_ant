<template>
  <div class="main">
    <div style="width: 100%; height: 40%">
      <!-- 用户量 -->
      <div
        id="appuser"
        style="height: 100%; width: 30%; display: inline-block"
      ></div>
      <!-- 蚁情上传功能用户量 -->
      <div
        id="usenumber"
        style="height: 100%; width: 30%; display: inline-block"
      ></div>
      <!-- 考试、练习用户量 -->
      <div
        id="exercise"
        style="height: 100%; width: 30%; display: inline-block"
      ></div>
    </div>
    <div style="width: 100%; height: 60%; margin: 0; padding: 0">
      <div
        id="readnumber"
        style="height: 100%; width: 45%; display: inline-block"
      ></div>
      <div
        id="map"
        style="height: 100%; width: 53%; display: inline-block"
      ></div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  mounted() {
    appuser();
    usenumber();
    read();
    exercise();
    chinamap();
    // 小程序用户量
    function appuser() {
      var chartDom = document.getElementById("appuser");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        legend: {
          top: "5%",
          left: "left",
          textStyle: {
            // fontSize: 18, //字体大小
            color: "#ffffff", //字体颜色
          },
        },
        color: ["#006dd6", "#052639"],
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["45%", "60%"],

            label: { show: false },
            data: [
              { value: 102, name: "小程序用户量" },
              { value: 10, name: "小程序使用量" },
            ],
          },
        ],
      };

      option && myChart.setOption(option);
    }
    // 蚁情数据上传功能用户量
    function usenumber() {
      var chartDom = document.getElementById("usenumber");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {
          top: "5%",
          left: "center",
          textStyle: {
            // fontSize: 18, //字体大小
            color: "#ffffff", //字体颜色
          },
        },
        color: ["#027825", "#052639"],
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["45%", "60%"],
            label: { show: false },
            data: [
              { value: 102, name: "蚁情数据上传功能用户量" },
              { value: 30, name: "蚁情数据总量" },
            ],
          },
        ],
      };
      option && myChart.setOption(option);
    }
    function exercise() {
      var chartDom = document.getElementById("exercise");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {
          top: "5%",
          left: "center",
          textStyle: {
            color: "#ffffff", //字体颜色
          },
        },
        color: ["#238681", "#052639"],
        series: [
          {
            type: "pie",
            radius: ["45%", "60%"],
            label: { show: false },
            data: [
              { value: 102, name: "考试功能用户量" },
              { value: 30, name: "练习功能用户量" },
            ],
          },
        ],
      };
      option && myChart.setOption(option);
    }
    // 阅读量
    function read() {
      var chartDom = document.getElementById("readnumber");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "阅读量统计",
          subtext: "阅读量",
          textStyle: {
            color: "#ffffff", //字体颜色
          },
          subtextStyle: {
            color: "#ffffff", //字体颜色
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["总数量", "阅读量"],
          textStyle: {
            color: "#ffffff", //字体颜色
          },
        },

        calculable: true,
        xAxis: [
          {
            axisLine: {
              show: true, //y轴线消失
            },
            type: "category",
            data: ['培训新闻文章', '科普新闻文章', '科普文章', '科普视频'],
            axisLabel: {
              show: true,
              textStyle: {
                color: "#ffffff",
              },
            },
          },
        ],
        yAxis: [
          {
            splitLine: {
              show: false,
            },
            axisLine: {
              show: true, //y轴线消失
            },
            type: "value",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#ffffff",
              },
            },
          },
        ],
        series: [
          {
            name: "总数量",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2],
            color: ["orange"],
          },
          {
            name: "阅读量",
            type: "bar",
            data: [2.6, 5.9, 9.0, 26.4],
            color: ["#027825"],
          },
        ],
      };

      option && myChart.setOption(option);
    }
    function chinamap() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("map"));
      var option;
      var data = [];
      
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };
      option = {
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            if (typeof params.value[2] == "undefined") {
              return params.name + " : " + params.value;
            } else {
              return params.name + " : " + params.value[2];
            }
          },
        },
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: false,
            },
          },
          roam: true, //禁止其放大缩小
          itemStyle: {
            normal: {
              areaColor: "#4c60ff",
              borderColor: "#002097",
            },
            emphasis: {
              areaColor: "#293fff",
            },
          },
        },
        series: [
          {
            name: "消费金额",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: function (val) {
              return val[2] / 15;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: "#ffeb7b",
              },
            },
          },
        ],
      };

      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }
  },
};
</script>
<style scoped>
</style>
<style lang="scss" scoped>
.main {
  background-image: url("../assets/images/nybj.png");
  background-size: cover;
  font-weight: bold;
  font-family: 苹方;
  overflow: auto;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  text-align: center;
}
.main::-webkit-scrollbar {
  display: none;
}
li {
  float: left;
  list-style-type: none;
}
</style>
<style lang='less' scoped>
</style>
