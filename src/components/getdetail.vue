<template>
  <div>
    <el-page-header @back="goBack" style="margin-bottom: 10px">
    </el-page-header>

    <div style="width: 80%; margin: 0 auto">
      <h3 style="text-align: center">{{ exam }}详情一览表</h3>
      <el-table :data="gridData" style="margin: 0 auto; text-align: center">
        <el-table-column
          width="80"
          prop="rank"
          label="考试排名"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="userId"
          label="用户Id"
        ></el-table-column>
        <el-table-column
          width="200"
          prop="createTime"
          label="考试时间"
        ></el-table-column>
        <el-table-column
          width="200"
          prop="finishTime"
          label="结束时间"
        ></el-table-column>
        <el-table-column
          width="200"
          prop="useTime"
          label="所用时间"
        ></el-table-column>
        <el-table-column
          width="80"
          prop="score"
          label="考试成绩"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      exam: "",
      gridData: [],
    };
  },
  methods: {
    goBack() {
      this.$router.push("/menu/check");
    },
  },
  mounted() {
    this.exam = this.$route.query.exam;
    let examId = this.$route.query.examId;
    this.$axios
      .get(
        "http://106.55.103.200:8088/fire_ant_project/examStyle/getAllFinishUserExamInfo?examId=" +
          examId
      )
      .then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.message.length; i++) {
          let createTime = res.data.message[i].createTime;
          let finishTime = res.data.message[i].finishTime;
          let rank = res.data.message[i].rank;
          let score = res.data.message[i].score;
          let useTime = res.data.message[i].useTime;
          let userId = res.data.message[i].userId;
          this.gridData.push({
            createTime,
            finishTime,
            rank,
            score,
            useTime,
            userId,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
