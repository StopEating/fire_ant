<template>
  <div id="edits" style="z-index: 1000000000000">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改管理员密码</span>
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
          >
            <el-form-item label="邮箱" prop="pass">
              <el-input
                v-model="ruleForm.pass"
                autocomplete="off"
                disabled
              ></el-input>
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
</template>
<script>
export default {
  name: "edits",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字与字母的结合"));
        } else {
          if (value.length < 3) {
            callback(new Error("长度必须为"));
          } else {
            callback();
          }
        }
      }, 1000);
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
        age: [{ validator: checkAge, trigger: "blur" }],
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
            this.$alert("修改管理员密码成功", "修改密码", {
              confirmButtonText: "确定",
              callback: (action) => {
                console.log("修改密码成功");
              },
            });
          } else {
            this.$alert(res.data.meta.msg, "修改密码", {
              confirmButtonText: "确定",
              callback: (action) => {
                console.log("修改密码成功");
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetForm(formName) {
      this.ruleForm.age = "";
      this.ruleForm.checkPass = "";
    },
    back() {
      this.$router.push("/menu/manager");
    },
    getcode() {
      let count = 60;
      // this.ruleForm.message = count + "s后重新获取";
      let clock = setInterval(() => {
        this.ruleForm.dis = true;
        count--;
        this.ruleForm.message = count + "s后重新获取";
        if (this.count == 0) {
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
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.ruleForm.pass = this.$route.query.adminEmail;
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
  width: 50%;
  height: 80%;
  margin: 20px auto;
}
.el-input {
  height: 40px;
}
* {
  font-size: 18px;
}
</style>