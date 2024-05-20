<template>
  <div id="body">
    <div>
      <div class="canvas" style="opacity: 0.2">
        <iframemap width="1920" height="572" />
      </div>
      <div class="loading">
        <div class="loadbox">
          <img src="../assets/picture/loading.gif" /> 页面加载中...
        </div>
      </div>
      <div class="head">
        <h1>蚁情数据统计分析</h1>

        <div class="weather">
          <span id="showTime"></span>
        </div>
      </div>

      <div class="mainbox"  style="font-size: 30px!important;">
        <ul class="clearfix">
          <li>
            <div class="boxall" style="height: 3.2rem">
              <div class="alltitle">近七天上报数据</div>
              <div class="allnav" id="echart1"></div>
              <div class="boxfoot"></div>
            </div>
            <div class="boxall" style="height: 3.2rem">
              <div class="alltitle">参与考试用户量</div>
              <div class="allnav" id="echart2" style="overflow: auto"></div>
              <div class="boxfoot"></div>
            </div>
            <div class="boxall" style="height: 3.2rem">
              <div class="alltitle">参与练习用户量</div>
              <div class="allnav" id="fb1" style="overflow: auto"></div>
              <div class="boxfoot"></div>
            </div>
          </li>
          <li>
            <div class="bar">
              <div class="barbox">
                <ul class="clearfix">
                  <li class="pulll_left counter">{{ reportNumber }}</li>
                  <li class="pulll_left counter">
                    {{ reportNumberForThisYear }}
                  </li>
                </ul>
              </div>
              <div class="barbox2">
                <ul class="clearfix">
                  <li class="pulll_left">总上报次数</li>
                  <li class="pulll_left">{{ year }}年上报次数</li>
                </ul>
              </div>
            </div>
            <div class="map">
              <div class="map1"><img src="../assets/picture/lbx.png" /></div>
              <div class="map2"><img src="../assets/picture/jt.png" /></div>
              <div class="map3"><img src="../assets/picture/map.png" /></div>
              <div class="map4" id="map_1"></div>
            </div>
          </li>
          <li>
            <div class="boxall" style="height: 3.4rem">
              <div class="alltitle">近两个月数据对比</div>
              <div class="allnav" id="echart4"></div>
              <div class="boxfoot"></div>
            </div>
            <div class="boxall" style="height: 6.4rem">
              <div class="alltitle">各省份上报数据</div>
              <div class="allnav" id="echart5" style="overflow: auto"></div>
              <div class="boxfoot"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/js/china.js";

import iframemap from "./iframemap.vue";
import * as echarts from "echarts";

import "../assets/js/jquery.js";

export default {
  data() {
    return {
      year: "",
      reportNumber: "",
      reportNumberForThisYear: "",
      echart1data: [],
      seventdata: [],
      recentdata: [],
      lastdata: [],
      province: [],
      provincedata: [],
      examprovince: [],
      examprovincedata: [],
      excersiceprovince: [],
      excersiceprovincedata: [],
      data: [],
      geoCoordMap: {},
    };
  },
  components: {
    iframemap,
  },
  methods: {
    echarts_1() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("echart1"));
      var option;
      option = {
        //  backgroundColor: '#00265f',
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "0%",
          top: "10px",
          right: "0%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.seventdata,
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid",
              },
            },

            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              // rotate:50,
              show: true,
              splitNumber: 15,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: "12",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              //formatter: '{value} %'
              show: true,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: "12",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: this.echart1data,
            barWidth: "35%", //柱子宽度
            // barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: "#2f89cf",
                opacity: 1,
                barBorderRadius: 5,
              },
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    echarts_2() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("echart2"));
      var option;
      // 基于准备好的dom，初始化echarts实例
      var option;
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#dddc6b",
            },
          },
        },
        grid: {
          left: "10",
          top: "30",
          right: "10%",
          bottom: "10",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              fontSize: 10,
              color: "rgba(255,255,255,.6)",
            },

            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.2)",
              },
            },
            data: this.examprovince,
          },
          {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: "bottom",
            offset: 20,
          },
        ],

        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
              },
            },

            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "考试用户量",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
          
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(1, 132, 213, 0.4)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(1, 132, 213, 0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            },
            itemStyle: {
              normal: {
                color: "#0184d5",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
              },
            },
            data: this.examprovincedata,
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    echarts_5() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("echart5"));
      var option;
      const autoHeight = this.province.length * 30 + 50; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
      myChart.resize({ height: autoHeight });

      option = {
        //  backgroundColor: '#00265f',
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },

        grid: {
          left: "5%",
          top: "10px",
          right: "10%",
          bottom: "2%",
          containLabel: true,
        },
        yAxis: [
          {
            type: "category",
            data: this.province.reverse(),
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid",
              },
            },

            axisTick: {
              show: false,
            },
            axisLabel: {
              // rotate:50,
              show: true,
              splitNumber: 15,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: "12",
              },
            },
          },
        ],
        xAxis: [
          {
            type: "value",
            axisLabel: {
              interval: 0,
              //formatter: '{value} %'
              show: true,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: "12",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: this.provincedata.reverse(),
            barWidth: "35%", //柱子宽度
            // barGap: 1, //柱子之间间距
            itemStyle: {
              normal: {
                color: "#2f89cf",
                opacity: 1,
                barBorderRadius: 5,
              },
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },

    echarts_4() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("echart4"));
      var option;
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#dddc6b",
            },
          },
        },
        legend: {
          top: "0%",
          data: ["近三十天", "过去三十天"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12",
          },
        },
        grid: {
          left: "10",
          top: "30",
          right: "10",
          bottom: "10",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
              },
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.2)",
              },
            },

            data: [
              "01","02","03","04","05","06","07","08","09","11","12","13", "14","15","16","17","18","19","20","21","22","23","24","25", "26","27","28","29","30",
            ],
          },
          {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: "bottom",
            offset: 20,
          },
        ],

        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
              },
            },

            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "近三十天",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: "#0184d5",
                width: 2,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(1, 132, 213, 0.4)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(1, 132, 213, 0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            },
            itemStyle: {
              normal: {
                color: "#0184d5",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
              },
            },
            data: this.recentdata,
          },
          {
            name: "过去三十天",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: "#00d887",
                width: 2,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0, 216, 135, 0.4)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0, 216, 135, 0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            },
            itemStyle: {
              normal: {
                color: "#00d887",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
              },
            },
            data: this.lastdata,
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },

    echarts_31() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("fb1"));
      var option;
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#dddc6b",
            },
          },
        },
        grid: {
          left: "10",
          top: "30",
          right: "10%",
          bottom: "10",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              fontSize: 10,
              color: "rgba(255,255,255,.6)",
            },

            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.2)",
              },
            },
            data: this.excersiceprovince,
          },
          {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: "bottom",
            offset: 20,
          },
        ],

        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
              },
            },

            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "练习用户量",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,

            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(1, 132, 213, 0.4)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(1, 132, 213, 0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            },
            itemStyle: {
              normal: {
                color: "#0184d5",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
              },
            },
            data: this.excersiceprovincedata,
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },

    map() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("map_1"));
      var option;
      let data = this.data;
      let geoCoordMap = this.geoCoordMap;
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
          // trigger: "item",
          formatter: function (params) {
            if (typeof params.value[2] == "undefined") {
              return params.name;
            } else {
              return params.name;
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
          roam: false, //禁止其放大缩小
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
    },
  },
  created() {
    this.$axios
      .get(
        "http://106.55.103.200:8088/fire_ant_project/statistics/getAllAddressAndValue"
      )
      .then((res) => {
        for (var i = 0; i < res.data.message.addressValue.length; i++) {
          let name = res.data.message.addressValue[i].address;
          let value = res.data.message.addressValue[i].value;
          this.data.push({ name: name, value: value });
        }
        for (var i = 0; i < res.data.message.position.length; i++) {
          let latitude = res.data.message.position[i].positionNumber.latitude;
          let longitude = res.data.message.position[i].positionNumber.longitude;
          let address = res.data.message.position[i].address;
          this.$set(this.geoCoordMap, address, [latitude, longitude]);
        }
        this.map();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    var whei = $(window).width();
    $("html").css({ fontSize: whei / 20 });
    $(window).resize(function () {
      var whei = $(window).width();
      $("html").css({ fontSize: whei / 20 });
    });
    this.$axios
      .post("http://106.55.103.200:8088/fire_ant_project/admin/verifyAdminToken", {
        token: sessionStorage.getItem("token"),
      })
      .then((res) => {
        if (res.data.message.verify == true) {
          this.$axios
            .get(
              "http://106.55.103.200:8088/fire_ant_project/statistics/getAntDataAnalysis"
            )
            .then((res) => {
              console.log(res);
              this.year = res.data.message.antDataMain.thisYear;
              this.reportNumber = res.data.message.antDataMain.reportNumber;
              this.reportNumberForThisYear =
                res.data.message.antDataMain.reportNumberForThisYear;
              for (var i = 0; i < res.data.message.sevenAntData.length; i++) {
                this.echart1data.push(
                  res.data.message.sevenAntData[i].thisDayData
                );
                this.seventdata.push(res.data.message.sevenAntData[i].day);
              }
              for (var i = 1; i < res.data.message.thisThirtyData.length; i++) {
                this.recentdata.push(
                  res.data.message.thisThirtyData[i].thisDayData
                );
              }
              for (
                var i = 1;
                i < res.data.message.theLastThirtyData.length;
                i++
              ) {
                this.lastdata.push(
                  res.data.message.theLastThirtyData[i].thisDayData
                );
              }
              for (
                var i = 0;
                i < res.data.message.antProvinceRank.length;
                i++
              ) {
                this.province.push(
                  res.data.message.antProvinceRank[i].province
                );
                this.provincedata.push(
                  res.data.message.antProvinceRank[i].antData
                );
              }
              for (var i = 0; i < 7; i++) {
                this.examprovincedata.push(
                  res.data.message.examProvinceRank[i].examData
                );
                this.examprovince.push(
                  res.data.message.examProvinceRank[i].province
                );
                this.excersiceprovincedata.push(
                  res.data.message.exerciseProvinceRank[i].exerciseData
                );
                this.excersiceprovince.push(
                  res.data.message.exerciseProvinceRank[i].province
                );
              }

              this.echarts_1();
              this.echarts_2();
              this.echarts_4();
              this.echarts_31();
              this.echarts_5();
            })

            .catch((error) => {
              console.log(error);
            })
            .catch((error) => {
              console.log(error);
            });
          $(".loading").fadeOut();
          var t = null;
          t = setTimeout(time, 1000); //開始运行
          function time() {
            clearTimeout(t); //清除定时器
            var dt = new Date();
            var y = dt.getFullYear();
            var mt = dt.getMonth() + 1;
            var day = dt.getDate();
            var h = dt.getHours(); //获取时
            var m = dt.getMinutes(); //获取分
            var s = dt.getSeconds(); //获取秒
            document.getElementById("showTime").innerHTML =
              y + "年" + mt + "月" + day + "-" + h + "时" + m + "分" + s + "秒";
            t = setTimeout(time, 1000); //设定定时器，循环运行
          }
        } else {
          this.$message.error("登录失败");
          this.$router.push("/index");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
</style>
<style src="@/assets/css/comon0.css" scoped>
</style>
