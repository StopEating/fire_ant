<template>
  <div style="width: 100%; height: 100%" id="container">
    <el-page-header @back="goBack"> </el-page-header>

    <div style="margin-left: 30%;font-size: 30px;">
      <p>
        题目类型：<span>{{ type }}</span>
      </p>
      <p v-html="question"></p>
      <span v-for="(item, index) in chioce" :key="index" v-html="item"></span>

      <p>
        正确答案:<span>{{ answer }}</span>
      </p>
      <p>解析：</p>
      <p style="text-indent: 2em">{{ analysis }}</p>
    </div>

    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
      style="width: 100%; height: 60%"
      id="tabs"
    >
      <el-tab-pane
        label="饼状图"
        name="first"
        id="pie"
        style="width: 100%; height: 100%"
      >
      </el-tab-pane>
      <el-tab-pane
        label="柱状图"
        name="second"
        id="columnar"
        style="width: 800px; height: 400px; margin: 0 auto"
      >
      </el-tab-pane>
      <el-tab-pane
        label="折线图"
        name="third"
        id="brokenline"
        style="width: 800px; height: 400px; margin: 0 auto"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      activeName: "first",
      question: "",
      chioce: [],
      answer: "",
      analysis: "",
      datas: [],
      optiondata: [],
      answerdata: [],
      type: "",
    };
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
    goBack() {
      history.back();
    },
  },
  mounted() {
    let questionId = this.$route.query.id;
    this.type = this.$route.query.type;
    this.$axios
      .get(
        "http://106.55.103.200:8088/fire_ant_project/statistics/getQuestionDataByQuestionId?questionId=" +
          questionId
      )
      .then((res) => {
        console.log(res);
        this.question = res.data.message.questionInfo.question;
        for (let i in res.data.message.questionInfo.optionMap) {
          let text = res.data.message.questionInfo.optionMap[i];
          let o = i + "." + text;
          this.chioce.push(o);
        }
        this.answer = res.data.message.questionInfo.answer;
        this.analysis = res.data.message.questionInfo.questionAnalysis;
        for (var i = 0; i < res.data.message.optionInfo.length; i++) {
          var name = String.fromCharCode(i + 65);
          var value =
            parseFloat(res.data.message.optionInfo[i].rate * 100).toFixed(2) *
            1;
          this.datas.push({ value, name });
          this.optiondata.push(name);
          this.answerdata.push(value);
        }
        console.log(this.datas.length);
        console.log(this.optiondata);
        console.log(this.answerdata);

        var chartDom = document.getElementById("pie");
        var myChart = echarts.init(chartDom);
        var option;
        // var optiondata = [];
        // var answerdata = [];
        // var data = [];
        // console.log(this.datas.length);
        // for (let i = 0; i < this.datas.length; i++) {
        //   optiondata[i] = this.datas[i].name;
        //   data[i] = this.datas[i];
        //   answerdata[i] = this.datas[i].value;
        // }

        option = {
          tooltip: {
            formatter: "{b} :  {c}%",
          },
          legend: {
            left: "center",
            top: "90%",
            data: this.optiondata,
          },

          series: [
            {
              type: "pie",
              radius: "80%",
              center: ["45%", "40%"],
              roseType: "radius",
              itemStyle: {
                borderRadius: 5,
              },
              label: {
                show: true,
                formatter: "{b}:{c}%",
                position: "outer", //让文字显示在饼状图里面
                textStyle: {
                  fontSize: 16,
                },
              },

              emphasis: {
                label: {
                  show: true,
                },
              },
              data: this.datas,
            },
          ],
        };

        option && myChart.setOption(option);

        var chartDom1 = document.getElementById("columnar");
        var myChart1 = echarts.init(chartDom1);
        var option1;

        option1 = {
          xAxis: {
            type: "category",
            data: this.optiondata,
          },
          yAxis: {
            type: "value",
            axisLabel: {
              show: true,
              interval: "auto",
              formatter: "{value}%", //纵坐标百分比
            },
          },
          series: [
            {
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: "{c}%",
                  },
                },
              },
              data: this.answerdata,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)",
              },
              color: "#5fadfb",
            },
          ],
        };

        option1 && myChart1.setOption(option1);

        var chartDom2 = document.getElementById("brokenline");
        var myChart2 = echarts.init(chartDom2);
        var option2;

        option2 = {
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.optiondata,
          },
          yAxis: {
            type: "value",
            axisLabel: {
              show: true,
              interval: "auto",
              formatter: "{value}%", //纵坐标百分比
            },
          },
          series: [
            {
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: "{c}%",
                  },
                },
              },
              data: this.answerdata,
              type: "line",
              areaStyle: {
                color: "#5fadfb",
              },
            },
          ],
        };

        option2 && myChart2.setOption(option2);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
</style>
<style lang="less" scoped>
/deep/ .el-tabs__content {
  width: 100%;
  height: 100%;
}

#brokenline {
  width: 300px;
  height: 200px;
}
</style>
