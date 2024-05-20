<template>
  <div id="check">
    <el-button type="success" @click="turn()">新建科普考试</el-button>
    <el-card class="box-card" v-for="(item, index) in tableData" :key="index">
      <div slot="header" class="clearfix">
        <span>{{ item.examType }}</span>
        <el-button
          class="el-icon-delete"
          style="float: right; margin: 5px"
          size="mini"
          @click="del(tableData[index].examId, index)"
          >删除</el-button
        >
        <el-button
          style="float: right; margin: 5px"
          size="mini"
          @click="
            publish(
              tableData[index].examId,
              index,
              tableData[index].checkpublish
            )
          "
        >
          {{ tableData[index].publics
          }}<i class="el-icon-upload el-icon--right"></i>
        </el-button>
        <el-button
          style="float: right; margin: 5px"
          size="mini"
          class="el-icon-s-order"
          @click="getdetail(tableData[index].examId, tableData[index].examType)"
        >
          查看考试排名
        </el-button>
      </div>
      <el-popover placement="right" width="600" trigger="click">
        <div>试题总数:{{ item.sumNumber }}</div>
        <div>总分:{{ item.totalScore }}</div>
        <div>单选题数及分值:{{ item.singleNumber }}\{{ item.singleScore }}</div>
        <div>
          多选题数及分值:{{ item.multipleNumber }}\{{ item.multipleScore }}
        </div>
        <div>判断题数及分值:{{ item.judgeNumber }}\{{ item.judgeScore }}</div>
        <div>允许考试次数:{{ item.examChance }}</div>
        <div>考试时长/分钟:{{ item.examTime }}</div>
        <div>发布时间:{{ item.publishTime }}</div>
        <div>考试结束时间：{{ item.endTime }}</div>
        <div>距离考试结束:{{ timer[index] }}</div>
        <div>
          考试公告:{{ item.examRule }}
          <el-popover
            placement="right"
            width="700"
            trigger="click"
            ref="popover"
          >
            <el-form ref="item" :model="item" label-width="80px">
              <el-form-item label="考试公告:">
                <el-input type="textarea" v-model="item.examRule"></el-input>
                <el-button
                  style="margin-top: 20px"
                  type="primary"
                  size="mini"
                  @click="
                    updatas(tableData[index].examId, item.examRule, index)
                  "
                  >确定修改</el-button
                >
                <el-button
                  style="margin-top: 20px; margin-left: 20px"
                  type="primary"
                  size="mini"
                  @click="closes(index)"
                  >取消修改</el-button
                >
              </el-form-item>
            </el-form>
            <el-button size="mini" style="margin-left: 10px" slot="reference"
              >修改考试公告</el-button
            >
          </el-popover>
        </div>
        <el-button slot="reference" size="mini">查看考试详情</el-button>
      </el-popover>

      <el-button
        style="float: right; margin: 5px"
        size="mini"
        class="el-icon-edit"
        @click="updataall(tableData[index].examId)"
      >
        修改此考试活动
      </el-button>
      <el-button
        style="float: right; margin: 5px"
        size="mini"
        class="el-icon-video-pause"
        @click="get(tableData[index].examId)"
      >
        结束此考试活动
      </el-button>
      <el-button style="float: right; margin: 5px" size="mini">
        距离考试结束: {{ timer[index] }}</el-button
      >
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      public: "",
      timer: [],
      activeNames: ["1"],
      tableData: [],
    };
  },
  methods: {
    turn() {
      this.$router.push("/menu/setstyle");
    },
    del(examId, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post(
              "http://106.55.103.200:8088/fire_ant_project/examStyle/deleteThisExamStyleByExamId",
              {
                examId: examId,
              }
            )
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.tableData.splice(index, 1);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    publish(examId, index, checkpublish) {
      if (checkpublish === false) {
        this.$confirm("此操作将发布该考试, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios
              .get(
                "http://106.55.103.200:8088/fire_ant_project/examStyle/publishThisExam?examId=" +
                  examId
              )
              .then((res) => {
                console.log(res);
                this.$axios
                  .get(
                    "http://106.55.103.200:8088/fire_ant_project/examStyle/getAllExamStyle"
                  )
                  .then((res) => {
                    console.log(res);
                    this.tableData = [];
                    for (var i = 0; i < res.data.message.length; i++) {
                      let examType = res.data.message[i].examType;
                      let designTime = res.data.message[i].designTime;
                      let sumNumber = res.data.message[i].sumNumber;
                      let totalScore = res.data.message[i].totalScore;
                      let multipleNumber = res.data.message[i].multipleNumber;
                      let multipleScore = res.data.message[i].multipleScore;
                      let singleNumber = res.data.message[i].singleNumber;
                      let singleScore = res.data.message[i].singleScore;
                      let judgeNumber = res.data.message[i].judgeNumber;
                      let judgeScore = res.data.message[i].judgeScore;
                      let publishTime = res.data.message[i].publishTime;
                      let examChance = res.data.message[i].totalExamChance;
                      let examId = res.data.message[i].examId;
                      let checkpublish = res.data.message[i].checkPublish;
                      let endTime = res.data.message[i].endTime;
                      let examRule = res.data.message[i].examRule;
                      let examTime = res.data.message[i].examTime / 60;
                      let publics = "";
                      if (checkpublish) {
                        publics = "已发布";
                      } else {
                        publics = "发布";
                      }
                      this.tableData.push({
                        examType,
                        designTime,
                        sumNumber,
                        totalScore,
                        singleNumber,
                        singleScore,
                        multipleNumber,
                        multipleScore,
                        judgeNumber,
                        judgeScore,
                        publishTime,
                        examChance,
                        examId,
                        checkpublish,
                        endTime,
                        examRule,
                        examTime,
                        publics,
                      });
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                this.$message({
                  type: "success",
                  message: "发布成功!",
                });
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消发布",
            });
          });
      } else if (checkpublish === true) {
        this.$alert("此考试已发布，请勿重复发布", "发布考试", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `已禁止重复发布`,
            });
          },
        });
      }
    },
    getTime() {
      this.timer = [];
      for (var i = 0; i < this.tableData.length; i++) {
        var times = new Date(this.tableData[i].endTime);
        times = times.getTime();
        //当前时间
        var date = new Date();
        var time = Date.parse(date);
        //时间差的时间戳
        let texts = times - time;
        if (texts > 0) {
          let text = datatime(texts);
          this.timer.push(text);
        } else if (
          texts == 0 &&
          this.tableData[i].checkpublish == true &&
          this.tableData[i].seasonState == true
        ) {
          console.log(this.tableData[i].seasonState);
          this.$axios
            .get(
              " http://106.55.103.200:8088/fire_ant_project/examStyle/endThisExamActivityByExamId?examId=" +
                this.tableData[i].examId
            )
            .then((res) => {})
            .catch((error) => {});
        } else if (texts < 0) {
          this.timer.push("已截止");
        }
        //时间戳转化为时间
        function datatime(data) {
          var days = Math.floor(data / (24 * 3600 * 1000));
          //计算出小时数
          var leave1 = data % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
          var hours = Math.floor(leave1 / (3600 * 1000));
          //计算相差分钟数
          var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
          var minutes = Math.floor(leave2 / (60 * 1000));

          var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
          var seconds = Math.round(leave3 / 1000);
          var time =
            days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
          // var time = days;
          return time;
        }
      }
    },
    getdetail(examId, exam) {
      this.$router.push({
        path: "/menu/getdetail",
        query: { examId: examId, exam: exam },
      });
    },
    get(examId) {
      this.$confirm("此操作将结束此赛季, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          console.log(res);
          this.$axios
            .get(
              "http://106.55.103.200:8088/fire_ant_project/examStyle/endThisExamActivityByAdmin?examId=" +
                examId
            )
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
          this.$message({
            type: "success",
            message: "已结束此赛季!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消结束赛季",
          });
        });
    },
    updatas(examId, examRule, index) {
      // console.log();
      this.$axios
        .post(
          "http://106.55.103.200:8088/fire_ant_project/examStyle/updateExamAnnounce",
          {
            examId: examId,
            examRule: examRule,
          }
        )
        .then((res) => {
          this.$refs.popover[index].showPopper = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closes(index) {
      this.$refs.popover[index].showPopper = false;
    },
    updataall(examId) {
      this.$router.push({
        path: "/menu/updatastyle",
        query: { examId: examId },
      });
    },
  },
  created: function () {
    //这里是定时器
    var inter = setInterval(this.getTime, 1000);
  },
  mounted() {
    this.$axios
      .get("http://106.55.103.200:8088/fire_ant_project/examStyle/getAllExamStyle")
      .then((res) => {
        for (var i = 0; i < res.data.message.length; i++) {
          let examType = res.data.message[i].examType;
          let designTime = res.data.message[i].designTime;
          let sumNumber = res.data.message[i].sumNumber;
          let totalScore = res.data.message[i].totalScore;
          let multipleNumber = res.data.message[i].multipleNumber;
          let multipleScore = res.data.message[i].multipleScore;
          let singleNumber = res.data.message[i].singleNumber;
          let singleScore = res.data.message[i].singleScore;
          let judgeNumber = res.data.message[i].judgeNumber;
          let judgeScore = res.data.message[i].judgeScore;
          let publishTime = res.data.message[i].publishTime;
          let examChance = res.data.message[i].totalExamChance;
          let examId = res.data.message[i].examId;
          let checkpublish = res.data.message[i].checkPublish;
          let endTime = res.data.message[i].endTime;
          let examRule = res.data.message[i].examRule;
          let examTime = res.data.message[i].examTime / 60;
          let seasonState = res.data.message[i].seasonState;
          let publics = "";
          if (checkpublish) {
            publics = "已发布";
          } else {
            publics = "发布";
          }
          this.tableData.push({
            examType,
            designTime,
            sumNumber,
            totalScore,
            singleNumber,
            singleScore,
            multipleNumber,
            multipleScore,
            judgeNumber,
            judgeScore,
            publishTime,
            examChance,
            examId,
            checkpublish,
            endTime,
            examRule,
            examTime,
            publics,
            seasonState,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style lang='less'scoped>
/deep/ .el-collapse {
  border: 0;
}
/deep/ .el-collapse-item__header {
  font-size: 18px;
  padding-left: 15px;
}
</style>
<style scoped>
.el-collapse-item div {
  padding-left: 20px;
  padding-right: 20px;
  font-size: 16px;
}
div {
  margin-top: 10px;
  font-size: 18px;
}
</style>
<style scoped>
.el-card {
  box-shadow: 0 1px 1px #409eff;
}
</style>

