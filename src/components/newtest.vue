<template>
  <el-container>
    <el-aside width="200px" style="text-align: center">
      <el-button type="primary" plain @click="adds()" style="width: 150px"
        >添加单项选择题</el-button
      >
      <el-button
        type="primary"
        plain
        @click="addm()"
        style="width: 150px; margin-left: 0"
        >添加多项选择题</el-button
      >
      <el-button
        type="primary"
        plain
        @click="addj()"
        style="width: 150px; margin-left: 0"
        >添加判断题</el-button
      >
      <p class="clearfix">
        单项选择题
        <el-badge class="mark" :value="single" />
      </p>
      <p class="clearfix">
        多项选择题
        <el-badge class="mark" :value="multy" />
      </p>
      <p class="clearfix">
        判断题
        <el-badge class="mark" :value="judge" />
      </p>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "WriteArticle",
  data() {
    return {
      single: 0,
      multy: 0,
      judge: 0,
      value: "",
      Title: "",
      Content: "",
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
    };
  },
  methods: {
    adds() {
      this.$router.push("/menu/newtest/addsingle");
      // this.single++;
    },
    addm() {
      // this.multy++;
      this.$router.push("/menu/newtest/addmulty");
    },
    addj() {
      // this.judge++;
      this.$router.push("/menu/newtest/addjudge");
    },
  },
};
</script>
<style scoped>
.el-aside {
  padding-top: 30px;
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 500px;
}

.el-main {
  background-color: #fff;
  color: #333;
  /* text-align: center; */
  line-height: 160px;
}
</style>
