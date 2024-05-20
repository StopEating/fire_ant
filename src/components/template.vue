<template>
  <div
    style="
      width: 100%;
      height: 100%;
      margin: 0 !important;
      padding: 0 !important;
    "
  >
    <ul>
      <li>
        <div id="echart1" style="width: 100%; height: 100%"></div>
      </li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <baidu-map
      id="container"
      @ready="init"
      ak="PLYSnRNzvhB1SapXxzRSnGMEO3vbKxnk"
      style="height: 70%; width: 100%; margin: 0 auto"
    ></baidu-map>
  </div>
</template>
<script>
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";

export default {
  name: "show",
  data() {
    return {
      data: [],
      geoCoordMap: {},
    };
  },
  methods: {
    init() {
      var dom = document.getElementById("container");
      var myChart = echarts.init(dom);
      var app = {};

      var option;

      var data = [];
      for (var i = 0; i < this.data.length; i++) {
        let name = this.data[i].name;
        let value = this.data[i].value;
        data.push({ name, value });
      }
      var geoCoordMap = {};
      geoCoordMap = this.geoCoordMap;
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
      function renderItem(params, api) {
        var coords = [
          // [116.7, 39.53],
          // [103.73, 36.03],
          // [112.91, 27.87],
          // [120.65, 28.01],
          // [119.57, 39.95],
        ];
        var points = [];
        for (var i = 0; i < coords.length; i++) {
          points.push(api.coord(coords[i]));
        }
        var color = api.visual("color");
        return {
          type: "polygon",
          shape: {
            points: echarts.graphic.clipPointsByRect(points, {
              x: params.coordSys.x,
              y: params.coordSys.y,
              width: params.coordSys.width,
              height: params.coordSys.height,
            }),
          },
          style: api.style({
            fill: color,
            stroke: echarts.color.lift(color),
          }),
        };
      }
      option = {
        backgroundColor: "transparent",
        title: {
          text: "蚁情数据",
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "none",
        },
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#044161",
                },
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#004981",
                },
              },
              {
                featureType: "boundary",
                elementType: "geometry",
                stylers: {
                  color: "#064f85",
                },
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  color: "#004981",
                },
              },
              {
                featureType: "highway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#005b96",
                  lightness: 1,
                },
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#004981",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#00508b",
                },
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  color: "#056197",
                  visibility: "off",
                },
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "boundary",
                elementType: "geometry.fill",
                stylers: {
                  color: "#029fd4",
                },
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#1a5787",
                },
              },
              {
                featureType: "label",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
            ],
          },
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "bmap",
            data: convertData(data),
            encode: {
              value: 2,
            },
            symbolSize: function (val) {
              return val[2] / 10;
            },
            label: {
              formatter: "{b}",
              position: "right",
            },
            itemStyle: {
              color: "#ddb926",
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
          {
            type: "effectScatter",
            coordinateSystem: "bmap",
            // data: convertData(
            //   data
            //     .sort(function (a, b) {
            //       return b.value - a.value;
            //     })
            //     .slice(0, 6)
            // ),
            encode: {
              value: 2,
            },
            symbolSize: function (val) {
              return val[2] / 10;
            },
            showEffectOn: "emphasis",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            // label: {
            //   formatter: "{b}",
            //   position: "right",
            //   show: true,
            // },
            itemStyle: {
              color: "#f4e925",
              shadowBlur: 10,
              shadowColor: "#333",
            },
            zlevel: 1,
          },
          {
            type: "custom",
            coordinateSystem: "bmap",
            renderItem: renderItem,
            itemStyle: {
              opacity: 0.5,
            },
            animation: false,
            silent: true,
            data: [0],
            z: -10,
          },
        ],
      };

      if (option && typeof option === "object") {
        myChart.setOption(option);
      }
    },
  },
  mounted() {
    this.$axios
      .get(
        "http://106.55.103.200:8088/fire_ant_project/statistics/getAllAddressAndValue"
      )
      .then((res) => {
        console.log(res);
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
        this.init();
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
li {
  width: 25%;
  height: 30%;
  border: 1px solid black;
  list-style-type: none;
  display: flex;
}
</style>
<style lang='less' scoped>
.BMap_cpyCtrl {
  display: none;
}
/deep/ .anchorBL {
  display: none;
}
</style>