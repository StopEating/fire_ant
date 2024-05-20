<template>
  <header>
    <div class="l-content" style="width: 90%; overflow: auto">
      <el-tag
        @click="turntoindex()"
        type="primary"
        style="cursor: pointer"
        :disable-transitions="false"
        >返回首页</el-tag
      >
      <el-tag
        :key="index"
        v-for="(tag, index) in route"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        @click="turn(tag)"
        style="cursor: pointer; margin-left: 10px"
      >
        {{ tag.name }}
      </el-tag>
    </div>
    <!-- </header> -->
    <!-- </div> -->
    <div class="r-content">
      <el-dropdown trigger="click" size="medium">
        <span>
          <el-button class="el-icon-user-solid" type="primary"
            >个人中心</el-button
          >
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="change()">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="quit()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: "commonheader",
  data() {
    return {
      route: [
        // {
        //   name: "首页",
        //   path: "indexmenu",
        //   redirect: "indexmenu",
        // },
      ],
    };
  },
  methods: {
    turntoindex() {
      this.$router.push("/indexmenu");
    },
    turn(tag) {
      this.$router.push(tag.path);
    },
    handleClose(tag) {
      this.route.splice(this.route.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.list.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    change() {
      this.$router.push("/menu/changepersonalpassword");
    },
    quit() {
      this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post(
              "http://106.55.103.200:8088/fire_ant_project/admin/quitAdminSystem",
              {
                token: sessionStorage.getItem("token"),
              }
            )
            .then((res) => {
              if (res.data.message.verify == true) {
                // location.href = "../index.html";

                this.$message({
                  type: "success",
                  message: "退出成功!",
                });
                this.$router.push("/index");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>
<style scoped>
*::-webkit-scrollbar {
  display: none;
}
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.l-content {
  display: flex;
  align-items: center;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
