<template>
  <div
    class="container-flex"
    tabindex="0"
    hidefocus="true"
    style="height: 100%; overflow: hidden"
  >
    <div class="box-left">
      <div class="left-top">
        <div class="current-num">
          <div>小程序用户量</div>
          <p>{{ user }}</p>
        </div>
      </div>
      <div class="left-bottom select" style="height: 30%">
        <div class="title-box">
          <h6>基本数据</h6>
        </div>
        <div class="chart-box">
          <table class="table3">
            <tbody id="tList">
              <tr>
                <td>小程序使用量</td>
                <td>{{ usenumber }}</td>
              </tr>
              <tr>
                <td>蚁情上报功能用户量</td>
                <td>{{ userAntData }}</td>
              </tr>
              <tr>
                <td>蚁情数据总量</td>
                <td>{{ antData }}</td>
              </tr>
              <tr>
                <td>考试功能用户量</td>
                <td>{{ examNumber }}</td>
              </tr>
              <tr>
                <td>练习功能用户量</td>
                <td>{{ exerciseNumber }}</td>
              </tr>
              <!-- </tr> -->
            </tbody>
          </table>
        </div>
      </div>

      <div class="left-center">
        <div class="title-box">
          <h6>蚁情高发省份</h6>
        </div>
        <div class="chart-box pie-chart">
          <div
            id="pie_fanzui"
            style="width: 100%; height: 100%; overflow: auto; margin-top: 30px"
          ></div>
        </div>
      </div>
    </div>
    <div class="box-center">
      <div class="center-top">
        <h1 style="font-size: 20px">
          <img
            src="../assets/textpng.png"
            style="width: 50px; margin-right: 10px"
          />数据驱动的红火蚁科普系统
          <span
            @click="enter()"
            style="
              backgroundcolor: transparent;
              cursor: pointer;
              font-size: 10px;
            "
            >进入系统</span
          >
        </h1>
      </div>
      <div class="center-center">
        <div class="weather-box">
          <div class="data">
            <p class="time" id="time">00:00:00</p>
            <p id="date"></p>
          </div>
          <div class="weather">
            <img
              id="weatherImg"
              src="../assets/images/weather/weather_img01.png"
              alt=""
            />
            <div id="weather">
              <p class="active">多云</p>
              <p>16-22℃</p>
              <p>广东省</p>
            </div>
          </div>
        </div>
        <img src="../assets/images/line_bg.png" alt="" />
        <div class="select-box" style="height: 0.3rem">
          <div data-type="2">
            <div
              class="select"
              tabindex="0"
              hidefocus="true"
              style="width: 100%; margin-top: -5px"
            >
              <p style="color: #efb10b; font-weight: bold">
                NO.1{{ first }}：{{ firstuserData }}人
              </p>
              <p style="color: #2f89cf; font-weight: bold">
                NO.2{{ second }}： {{ seconduserData }}人
              </p>
              <p style="color: #6064d9; font-weight: bold">
                NO.3{{ third }}：{{ thirduserData }}人
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="center-bottom">
        <div class="chart-box">
          <div id="china_map" style="width: 100%; height: 95%"></div>
        </div>
      </div>
    </div>
    <div class="box-right" style="overflow: auto">
      <div class="right-top">
        <div class="title-box">
          <h6 id="barTitle">文章/视频阅读量统计</h6>
        </div>
        <!-- <p class="unit">单位：次</p> -->
        <div class="chart-box">
          <div id="pie_age" style="width: 100%; height: 100%"></div>
        </div>
      </div>
      <div class="right-center">
        <div class="title-box">
          <h6>近三十天阅读量统计</h6>
        </div>
        <div class="chart-box pie-chart">
          <div id="qufenbu_data" style="width: 100%; height: 100%"></div>
        </div>
      </div>

      <div class="right-bottom">
        <div class="title-box" style="display: flex">
          <p id="switchBtn">
            <span class="active" data-dataType="income">热点文章</span>
            <span style="font-size: 6px">点击量</span>
          </p>
        </div>
        <div
          id="line_time"
          style="
            width: 90%;
            height: 100%;
            margin-left: 10px;
            margin-top: 10px;
            color: #1494ea;
            font-size: 14px;
          "
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import "../assets/js/rem";
import "../assets/js/jquery.js";
import "../assets/js/laydate.js";
import "../assets/js/china.js";
import "../assets/js/infographic.js";
import "../assets/js/macarons.js";
import "../assets/js/shine.js";
import "../assets/js/base.js";

export default {
  data() {
    return {
      user: "",
      usenumber: "",
      antData: "",
      userAntData: "",
      examNumber: "",
      exerciseNumber: "",
      first: "",
      second: "",
      third: "",
      firstuserData: "",
      seconduserData: "",
      thirduserData: "",
    };
  },
  methods: {
    enter() {
      this.$router.push("/menu");
    },
  },
  mounted() {
    if (sessionStorage.getItem("create") == 1) {
      sessionStorage.removeItem("create");
      this.$router.go(0);
    }
    this.$axios
      .post("http://106.55.103.200:8088/fire_ant_project/admin/verifyAdminToken", {
        token: sessionStorage.getItem("token"),
      })
      .then((res) => {
        if (res.data.message.verify == true) {
          this.$axios
            .get(
              "http://106.55.103.200:8088/fire_ant_project/statistics/dataStatistics"
            )
            .then((res) => {
              console.log(res);
              this.user = res.data.message.appletUser.userNumber;
              this.usenumber = res.data.message.appletUser.useNumber;
              this.antData = res.data.message.environment.antData;
              this.userAntData = res.data.message.environment.userAntData;
              this.examNumber = res.data.message.examExercise.examNumber;
              this.exerciseNumber =
                res.data.message.examExercise.exerciseNumber;
              this.first = res.data.message.userDataProvince[0].province;
              this.second = res.data.message.userDataProvince[1].province;
              this.third = res.data.message.userDataProvince[2].province;
              this.firstuserData =
                res.data.message.userDataProvince[0].userData;
              this.seconduserData =
                res.data.message.userDataProvince[1].userData;
              this.thirduserData =
                res.data.message.userDataProvince[2].userData;
            })
            .catch((error) => {
              console.log(error);
            });
          $("document").ready(function () {
            $("body").css("visibility", "visible");
            var localData = [
              $("#teacher").val(),
              $("#start").val() + "/" + $("#end").val(),
              $("#leader").val(),
            ];
            localStorage.setItem("data", localData);
          });
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

<style scoped lang="less">
@import "../assets/css/style.css";
</style>
