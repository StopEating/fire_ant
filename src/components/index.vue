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
    <h1
      style="
        margin: 10px auto;
        text-align: center;
        color: #fff;
        font-family: qingkaiti;
        font-size: 200px;
      "
    >
      <!-- 防控红火蚁 -->
    </h1>
    <div style="margin: 20px auto; width: 500px; margin-top: 15%">
      <el-card class="box-card">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          style="margin: 0 auto; margin-right: 30px; width: 400px"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="text"
              v-model="ruleForm.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item style="width: auto">
            <el-dialog
              :visible.sync="dialogVisible"
              width="80%"
              :before-close="handleClose"
              style="overflow: auto"
            >
              <div>
                <h3 style="text-align: center">用户协议</h3>
                <div
                  style="line-height: 2em; font-size: 14px; text-indent: 2em"
                >
                  <h4>
                    本协议为您与本网页管理者之间所订立的契约，具有合同的法律效力，请您仔细阅读。
                  </h4>
                  <p>
                    一、本协议内容、生效、变更。本协议内容包括协议正文及所有本网页已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。如您对协议有任何疑问，应向本网页咨询。您在同意所有协议条款并完成注册程序，才能成为本站的正式用户，您勾选“已同意用户协议”按钮后，本协议即生效，对双方产生约束力。只要您使用本网页平台服务，则本协议即对您产生约束，届时您不应以未阅读本协议的内容或者未获得本网页对您问询的解答等理由，主张本协议无效，或要求撤销本协议。您确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。
                    您承诺接受并遵守本协议的约定。如果您不同意本协议的约定，您应立即停止注册程序或停止使用本网页平台服务。本网页有权根据需要不定期地制订、修改本协议及/或各类规则，并在本网页平台公示，不再另行单独通知用户。变更后的协议和规则一经在网站公布，立即生效。如您不同意相关变更，应当立即停止使用本网页平台服务。您继续使用本网页平台服务的，即表明您接受修订后的协议和规则。
                  </p>
                  <p>
                    二、注册资格用户须具有法定的相应权利能力和行为能力的自然人、法人或其他组织，能够独立承担法律责任。您完成注册程序或其他本网页平台同意的方式实际使用本平台服务时，即视为您确认自己具备主体资格，能够独立承担法律责任。若因您不具备主体资格，而导致的一切后果，由您及您的监护人自行承担。
                    2.1用户应自行诚信向本站提供注册资料，用户同意其提供的注册资料真实、准确、完整、合法有效，用户注册资料如有变动的，应及时更新其注册资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且本网页保留终止用户使用本平台各项服务的权利。
                    2.2用户在本站进行浏览等活动时，涉及用户真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，本站将予以严格保密，除非得到用户的授权或法律另有规定，本站不会向外界披露用户隐私信息。为完成创建账号，用户需提供以下信息：用户的姓名、身份证号、密码、户籍地址、家庭住址、手机号等信息。
                    用户提供的上述信息，将在用户使用本服务期间持续授权我们使用。在用户注销账号时，我们将停止使用并删除上述信息。
                    上述信息将存储于中华人民共和国境内。如需跨境传输，我们将会单独征得用户的授权同意。
                  </p>
                  <p>
                    三、账户
                    3.1您注册成功后，即成为本网页平台的用户，将持有本网页平台唯一编号的账户信息，您可以根据本站规定改变您的密码。
                    3.2您设置的邮箱为真实邮箱，不得侵犯或涉嫌侵犯他人合法权益。否则，本网页有权终止向您提供服务，注销您的账户。账户注销后，相应的用户名将开放给任意用户注册登记使用。
                    3.3您应谨慎合理的保存、使用您的邮箱名和密码，应对通过您的会员名和密码实施的行为负责。除非有法律规定或司法裁定，且征得本网页的同意，否则，会员名和密码不得以任何方式转让、赠与或继承（与账户相关的财产权益除外）。
                    3.4用户不得将在本站注册获得的账户借给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。
                    3.5如果发现任何非法使用等可能危及您的账户安全的情形时，您应当立即以有效方式通知本网页要求暂停相关服务，并向公安机关报案。您理解本网页对您的请求采取行动需要合理时间，本网页对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。
                  </p>
                  <p>
                    四、用户信息的合理使用
                    4.1您同意本网页平台拥有通过邮件、短信电话等形式，向在本站注册用户发送信息等告知信息的权利。
                    4.2您了解并同意，本网页有权应国家司法、行政等主管部门的要求，向其提供您在本网页平台填写的注册信息和交易记录等必要信息。如您涉嫌侵犯他人知识产权，则本网页亦有权在初步判断涉嫌侵权行为存在的情况下，向权利人提供您必要的身份信息。
                    4.3用户同意本网页有权使用用户的注册信息、用户名、密码等信息，登陆进入用户的注册账户，进行证据保全，包括但不限于公证、见证等。
                  </p>
                  <p>
                    五、免责条款 5.1
                    本平台仅提供信息对接，发生一切纠纷问题皆与本平台无关，请通过仲裁部门维护各自权益。
                  </p>
                </div>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <span
              >已同意<a
                href=""
                @click.prevent
                style="text-decoration: none"
                @click="dialogVisible = true"
                >用户协议</a
              ></span
            >
            <el-switch v-model="ruleForm.agree"></el-switch>
            <el-link
              type="primary"
              :underline="false"
              style="float: right"
              @click="passwordchange()"
              >忘记密码<i class="el-icon-info"></i
            ></el-link>
          </el-form-item>
          <el-form-item style="width: 100%; text-align: center">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
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
        if (this.ruleForm.pass !== "") {
          this.$refs.ruleForm.validateField("pass");
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
      dialogVisible: false,
      ruleForm: {
        email: "",
        pass: "",
        code: "",
        agree: true,
        dis: false,
        message: "获取验证码",
      },
      rules: {
        email: [{ required: true, validator: validatePass, trigger: "blur" }],
        pass: [{ required: true, validator: validatePass2, trigger: "blur" }],
        code: [{ required: true, validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    passwordchange() {
      this.$router.replace("/indexchangepassword");
    },
    submitForm(formName) {
      if (this.ruleForm.agree == true) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios
              .post(
                "http://106.55.103.200:8088/fire_ant_project/admin/toLoginAdminSystem",
                {
                  adminEmail: this.ruleForm.email,
                  password: this.ruleForm.pass,
                }
              )
              .then((res) => {
                sessionStorage.setItem("token", res.data.message.token);
                this.$axios
                  .post(
                    "http://106.55.103.200:8088/fire_ant_project/admin/verifyAdminToken",
                    {
                      token: sessionStorage.getItem("token"),
                    }
                  )
                  .then((res) => {
                    if (res.data.message.verify == true) {
                      this.$router.push("/indexmenu");
                    } else {
                      this.$message.error("登录失败,请检查邮箱以及密码");
                      this.$refs[formName].resetFields();
                    }
                  })
                  .catch((error) => {
                    this.$message.error("登录失败,token错误");
                  });
              })
              .catch((error) => {
                this.$message.error("登录失败,请检查邮箱以及密码是否正确");
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else if (this.ruleForm.agree == false) {
        this.$message.error("尚未同意用户协议");
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .el-form-item__error {
  width: 400px;
  position: static;
}
</style>
<style scoped>
.cont {
  height: 100%;
  width: 100%;
  background-image: url("../assets/back.jpg");
  background-size: cover;
  overflow: hidden;
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
