<template>
  <el-container id="menus">
    <el-aside width="200px">
      <commonaside ref="asides"></commonaside>
    </el-aside>
    <el-container>
      <el-header>
        <commonheader ref="header"></commonheader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import commonaside from "./commonaside.vue";
import commonheader from "./commonheader.vue";

export default {
  components: {
    commonaside,
    commonheader,
  },

  watch: {
    $route: "getPath",
  },

  methods: {
    getPath() {
      let name = this.$route.name;
      this.$refs["header"].route.push({
        name: name,
        path: this.$route.path,
      });
      let arr = [];
      for (var i = 0; i < this.$refs["header"].route.length; i++) {
        arr[i] = this.$refs["header"].route[i];
      }
      this.$refs["header"].route = unique(arr);
      function unique(arr) {
        const res = new Map();
        return arr.filter((arr) => !res.has(arr.name) && res.set(arr.name, 1));
      }
    },
  },
  mounted() {
    this.$axios
      .post("http://106.55.103.200:8088/fire_ant_project/admin/verifyAdminToken", {
        token: sessionStorage.getItem("token"),
      })
      .then((res) => {
        if (res.data.message.verify == true) {
          this.$axios
            .post(
              "http://106.55.103.200:8088/fire_ant_project/admin/verifyIsBigAdminByToken",
              {
                token: sessionStorage.getItem("token"),
              }
            )
            .then((res) => {
              if (res.data.message.verify == true) {
              } else {
                this.$refs["asides"].list.splice(1, 1);
              }
            })
            .catch((error) => {
              console.log(error);
            });
          console.log("登录成功");
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
.el-header {
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #454959;
}
.el-aside {
  background-color: #454959;
  color: #333;
  text-align: left;
  height: auto;
  overflow-x: hidden;
}
.el-aside::-webkit-scrollbar {
  display: none;
}
.el-aside > h2 {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.el-main {
  background-color: #fff;
  color: #333;
  height: 100vh;
  padding: 0;
  margin: 5px;
}
.el-main::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
