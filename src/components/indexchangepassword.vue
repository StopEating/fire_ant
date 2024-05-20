<template>
  <div class="cont">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div style="z-index: 1000000000000; margin: 50px auto; width: 600px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>修改密码</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="back()"
            >取消修改</el-button
          >
        </div>
        <div class="text item">
          <template>
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
              style="margin-right: 20px"
            >
              <el-form-item label="邮箱" prop="pass">
                <el-input v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="age">
                <el-input
                  v-model.number="ruleForm.age"
                  style="width: 55%"
                ></el-input>
                <span style="width: 45%">
                  <el-button @click="getcode()" :disabled="ruleForm.dis">{{
                    ruleForm.message
                  }}</el-button>
                </span>
              </el-form-item>
              <el-form-item style="width: 70%; margin: 0 auto">
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >确认修改</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </template>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      var regExp = /^[1-9][0-9]{4,10}@qq.com$/;
      var flag = regExp.test(value);
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (flag == false) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      var regEx = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      var fla = regEx.test(value);
      if (value === "") {
        callback(
          new Error("请输入长度为8-16,并且必须为数字以及字母的结合的密码")
        );
      } else if (fla == false) {
        callback(
          new Error("请输入长度为8-16,并且必须为数字以及字母的结合的密码")
        );
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
        dis: false,
        message: "获取验证码",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$axios
        .post(
          "http://106.55.103.200:8088/fire_ant_project/admin/modifyAdminPassword",
          {
            adminEmail: this.ruleForm.pass,
            code: this.ruleForm.age,
            newPassword: this.ruleForm.checkPass,
          }
        )
        .then((res) => {
          if (res.data.message.verify == true) {
            this.$message.success("修改密码成功");
            this.$router.push("/index");
          } else if (res.data.message.verify == false) {
            this.$message.error("修改密码失败");
            this.$refs[formName].resetFields();
          }
        })
        .catch((error) => {
          this.$message.error("修改密码失败");
        });
    },
    resetForm(formName) {
      this.ruleForm.age = "";
      this.ruleForm.checkPass = "";
    },
    back() {
      this.$router.push("/index");
    },
    getcode() {
      let count = 60;
      // this.ruleForm.message = count + "s后重新获取";
      let clock = setInterval(() => {
        if (count > 0) {
          this.ruleForm.dis = true;
          count--;
          this.ruleForm.message = count + "s后重新获取";
        } else if (count == 0) {
          this.ruleForm.message = "获取验证码";
          clearInterval(clock);
          this.ruleForm.dis = false;
        }
      }, 1000);
      // },
      this.$axios
        .post(
          "http://106.55.103.200:8088/fire_ant_project/admin/getCodeForModifyPassword",
          {
            adminEmail: this.ruleForm.pass,
          }
        )
        .then((res) => {
          console.log("获取成功");
        })
        .catch((error) => {
          console.log("获取失败");
        });
    },
  },
};
</script>
<style scoped>
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  height: 70%;
  margin: 20px auto;
}
.el-input {
  height: 60px;
}
* {
  font-size: 18px;
}
.cont {
  /* position: fixed;
  overflow: auto; */
  height: 100vh;
  width: 100%;
  background: linear-gradient(
    rgb(139, 177, 221),
    rgb(91, 142, 201),
    rgb(41, 109, 236)
  ); /* 标准的语法 */
  background-size: cover;
}

li {
  position: absolute;
  bottom: 0px;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  list-style: none;
  animation: square 15s infinite;
  transition-timing-function: linear;
}
li:nth-child(1) {
  left: 10%;
}

li:nth-child(2) {
  left: 20%;
  width: 90px;
  height: 90px;
  animation-delay: 2s;
  animation-duration: 7s;
}

li:nth-child(3) {
  left: 25%;
  animation-delay: 4s;
}

li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-duration: 8s;
  background-color: rgba(255, 255, 255, 0.3);
}
li:nth-child(5) {
  left: 70%;
}

li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}

li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  animation-delay: 2s;
}

li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
  animation-duration: 15s;
}

li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  animation-delay: 2s;
  animation-duration: 12s;
  background-color: rgba(255, 255, 255, 0.3);
}

li:nth-child(10) {
  left: 85%;
  width: 160px;
  height: 160px;
  animation-delay: 5s;
}

@keyframes square {
  0% {
    opacity: 0.5;
    transform: translateY(-100px) rotate(45deg);
  }
  25% {
    opacity: 0.75;

    transform: translateY(-200px) rotate(90deg);
  }
  50% {
    opacity: 1;
    transform: translateY(-400px) rotate(135deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-500px) rotate(180deg);
  }
}
</style>