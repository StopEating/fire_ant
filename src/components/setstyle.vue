<template>
  <div id="setstyle">
    <el-page-header @back="goBack" style="margin-bottom: 10px">
    </el-page-header>
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      style="width: 70%; margin: 0 auto"
    >
      <el-form-item label="考试名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="考试时长/分钟">
        <el-input v-model="form.examtime" type="number" min="0"></el-input>
      </el-form-item>
      <el-form-item label="允许考试次数">
        <el-input v-model="form.examchance" type="number" min="0"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date1"
        ></el-date-picker>
        <el-time-picker
          placeholder="选择时间"
          v-model="form.date2"
        ></el-time-picker>
      </el-form-item>
      <el-form-item
        label=" 单选题量"
        style="display: inline-block"
        type="number"
        min="0"
      >
        <el-input
          v-model="form.single"
          style="width: 300px; display: inline-block"
          type="number"
          min="0"
          oninput="value=value.replace(/[^0-9.]/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item
        label=" 单选题分值"
        style="display: inline-block"
        type="number"
        min="0"
      >
        <el-input
          v-model="form.singlescore"
          style="width: 300px; display: inline-block"
          type="number"
          min="0"
          oninput="value=value.replace(/[^0-9.]/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item
        label=" 多选题量"
        style="display: inline-block"
        type="number"
        min="0"
      >
        <el-input
          v-model="form.multiple"
          style="width: 300px; display: inline-block"
          type="number"
          min="0"
          oninput="value=value.replace(/[^0-9.]/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item
        label=" 多选题分值"
        style="display: inline-block"
        type="number"
        min="0"
      >
        <el-input
          v-model="form.multiplescore"
          style="width: 300px; display: inline-block"
          type="number"
          min="0"
          oninput="value=value.replace(/[^0-9.]/g,'')"
        ></el-input>
      </el-form-item>
      <el-form-item
        label=" 判断题量"
        style="display: inline-block"
        type="number"
        min="0"
      >
        <el-input
          v-model="form.judge"
          style="width: 300px; display: inline-block"
          type="number"
          min="0"
          oninput="value=value.replace(/[^0-9.]/g,'')"
        ></el-input>
      </el-form-item>

      <el-form-item
        label=" 判断题分值"
        style="display: inline-block"
        type="number"
        min="0"
      >
        <el-input
          v-model="form.judgescore"
          style="width: 300px; display: inline-block"
          type="number"
          min="0"
          oninput="value=value.replace(/[^0-9.]/g,'')"
        ></el-input>
      </el-form-item>

      <el-form-item label="考试公告">
        <el-input type="textarea" v-model="form.rule"></el-input>
      </el-form-item>
      <el-form-item style="width: 70%; margin: 0 auto">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        examtime: "",
        region: "",
        date1: "",
        date2: "",
        single: 0,
        multiple: 0,
        judge: 0,
        singlescore: 0,
        judgescore: 0,
        multiplescore: 0,
        delivery: false,
        type: [],
        resource: "",
        rule: "",
        examchance: "",
      },
    };
  },
  methods: {
    goBack() {
      history.back();
    },
    filterTime(time) {
      var date = new Date(time);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + s;
    },
    onSubmit() {
      let mytime1 = this.form.date1;
      let mytime2 = this.form.date2;
      let newTime1 = this.filterTime(mytime1);
      let newTime2 = this.filterTime(mytime2);
      let time1 = newTime1.slice(0, 10);
      let time2 = newTime2.slice(10);
      let sumNumber =
        this.form.single * 1 + this.form.multiple * 1 + this.form.judge * 1;
      let totalScore =
        this.form.single * this.form.singlescore +
        this.form.multiple * this.form.multiplescore +
        this.form.judge * this.form.judgescore;
      let endTime = time1 + time2;
      if (this.form.name !== "" && endTime !== "NaN-NaN-NaN NaN:NaN:NaN") {
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/examStyle/addThisExamStyle",
            {
              examType: this.form.name,
              examTime: this.form.examtime * 60,
              endTime: endTime,
              singleNumber: this.form.single,
              multipleNumber: this.form.multiple,
              judgeNumber: this.form.judge,
              singleScore: this.form.singlescore,
              judgeScore: this.form.judgescore,
              multipleScore: this.form.multiplescore,
              examRule: this.form.rule,
              sumNumber: sumNumber,
              totalScore: totalScore,
              sumNumber: sumNumber,
              totalExamChance: this.form.examchance,
            }
          )
          .then((res) => {
            this.$message({
              message: "设置成功！",
              type: "success",
            });
            this.form = {};
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.form = {};
        this.$message.error("考试名称以及考试结束时间不能为空");
      }
    },
  },
};
</script>
<style scoped>
</style>
