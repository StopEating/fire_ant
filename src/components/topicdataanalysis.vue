<template>
  <div
    style="
      width: 100%;
      height: 100%;
      margin: 0 !important;
      padding: 0 !important;
    "
  >
    <div id="main" style="width: 90%; height: 100%"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      sources: [["正确率", "题号", "id", "type"]],
    };
  },

  mounted() {
    this.$axios
      .get(
        "http://106.55.103.200:8088/fire_ant_project/statistics/getAllQuestionDataInfo"
      )
      .then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.message.length; i++) {
          let number = JSON.stringify(res.data.message[i].questionNumber);
          this.sources.push([
            res.data.message[i].correct * 100,
            number,
            res.data.message[i].questionId,
            res.data.message[i].questionType,
          ]);
        }
        var chartDom = document.getElementById("main");
        var myChart = echarts.init(chartDom);
        var option;
        this.myChart = echarts.init(chartDom);
        const autoHeight = this.sources.length * 50 + 50; // counst.length为柱状图的条数，即数据长度。35为我给每个柱状图的高度，50为柱状图x轴内容的高度(大概的)。
        this.myChart.resize({ height: autoHeight });
        let source = this.sources.reverse();
        // let source = this.sources;
        option = {
          dataset: {
            source,
          },
          grid: { containLabel: true },
          xAxis: { name: "正确率" },
          yAxis: { type: "category" },
          visualMap: {
            orient: "horizontal",
            // left: "center",
            top: 0,
            left: "left",
            min: 0,
            max: 100,
            text: ["100%", "0%"],
            // Map the score column to color
            dimension: 0,
            inRange: {
              color: ["#ed2f25", "#f15b54", "#1088f7"],
            },
          },
          series: [
            {
              type: "bar",
              barWidth: 30,
              barGap: 20,
              encode: {
                // Map the "amount" column to X axis.
                x: "正确率",
                // Map the "product" column to Y axis
                y: "题号",
              },
              label: {
                normal: {
                  formatter: (params) =>
                    params.value[params.encode.x[0]].toFixed(2) + "%",
                  position: "right",
                  show: true,
                },
              },
            },
          ],
        };
        myChart.on("click", (params) => {
          console.log(params.data);
          let type = "";
          if (params.data[3] == "single") {
            type = "单选";
          } else if (params.data[3] == "multiple") {
            type = "多选";
          } else if (params.data[3] == "judge") {
            type = "判断";
          }
          this.$router.push({
            path: "/menu/statisticaldetails",
            query: { id: params.data[2], type: type },
          });
        });
        option && myChart.setOption(option);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
/* main {
  color: #54f1c7;
} */
</style>