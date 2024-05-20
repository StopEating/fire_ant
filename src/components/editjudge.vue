<template>
  <div>
    <el-page-header @back="back()"> </el-page-header>
    <div style="width: 80%; margin: 0 auto">
      <div class="ArticleDetail">
        <div
          ref="editor"
          style="text-align: left; width: 70%; z-index: -199999999"
        ></div>
      </div>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item>
          <el-radio-group v-model="radio1" style="margin-left: -70px">
            <el-radio-button label="对"></el-radio-button>
            <el-radio-button label="错"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="正确答案">
          <span>{{ radio1 }}</span>
        </el-form-item>
        <el-form-item label="解析" label-width="80px">
          <span slot="label" style="font-size: 16px">答案解析</span>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="textarea"
            style="width: 67%"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">立即修改</el-button>
          <el-button type="primary" @click="back()">完成修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
var editor;
export default {
  name: "WriteArticle",
  data: function () {
    return {
      answers: "",
      question: "",
      radio1: "对",
      textarea: "",
      Title: "",
      Content: "",
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
    };
  },
  methods: {
    back() {
      this.$router.push("/menu/questions");
    },
    submitForm() {
      let content = editor.txt.html();
      if (content !== "") {
        this.$axios
          .post("http://106.55.103.200:8088/fire_ant_project/judge/addJudge", {
            answer: this.radio1,
            question: content,
            questionAnalysis: this.textarea,
            questionId: this.questionId,
          })
          .then((res) => {
            console.log(res);
            this.$alert(
              "题目以及选项上传完毕，请点击选项按钮设定正确答案",
              "新建题目",
              {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$message({
                    type: "info",
                    message: `已成功上传`,
                  });
                },
              }
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$alert("题目不能为空", "新建题目", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `题目不能为空`,
            });
          },
        });
      }
    },
  },
  mounted: function () {
    var That = this;
    editor = new E(this.$refs.editor);
    editor.customConfig = {
      onchange: function (html) {
        That.Content = html;
      },
      uploadImgServer:
        "http://106.55.103.200:8088/fire_ant_project/singleChoice/uploadFile",

      //   使用这个字段获取图片信息
      uploadImgMaxLength: 1, // 限制一次最多上传 1 张图片
    };
    editor.config.height = 200;
    editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "indent",
      "image",
      "video",
      "undo",
      "redo",
    ];
    // 配置 server 接口地址
    // editor.config.uploadImgServer =
    //   "http://106.55.103.200:8088/fire_ant_project/singleChoice/uploadFile";
    // // 配置 server 接口地址
    // editor.config.uploadVideoServer = "/api/upload-video";
    // 配置 server 接口地址(视频、照片)
    editor.config.uploadVideoServer =
      "http://106.55.103.200:8088/fire_ant_project/singleChoice/uploadFile"; //视频
    editor.config.uploadVideoMaxSize = 40 * 1024 * 1024 * 1024; // 10*1024m
    editor.config.uploadVideoAccept = ["mp4"];
    editor.config.uploadVideoName = "file";

    editor.config.uploadVideoHooks = {
      // 上传视频之前
      before: function (xhr) {
        return true;
      },
      // 视频上传并返回了结果，视频插入已成功
      success: function (xhr) {
        console.log("success", xhr);
      },
      // 视频上传并返回了结果，但视频插入时出错了
      fail: function (xhr, editor, resData) {
        console.log("fail", resData);
      },
      // 上传视频出错，一般为 http 请求的错误
      error: function (xhr, editor, resData) {
        console.log("error", xhr, resData);
      },
      // 上传视频超时
      timeout: function (xhr) {
        console.log("timeout");
      },
      // 视频上传并返回了结果，想要自己把视频插入到编辑器中
      // 例如服务器端返回的不是 { errno: 0, data: { url : '.....'} } 这种格式，可使用 customInsert
      customInsert: function (insertVideoFn, result) {
        // result 即服务端返回的接口
        console.log("customInsert", result);
        // insertVideoFn 可把视频插入到编辑器，传入视频 src ，执行函数即可
        insertVideoFn(result.filepath);
      },
    };

    // // 照片servlet配置

    editor.config.uploadImgServer =
      "http://106.55.103.200:8088/fire_ant_project/singleChoice/uploadFile";
    // // editor.config.uploadImgServer = 'http://106.55.103.200:8088/fire_ant_project/article/uploadFile';
    editor.config.uploadImgAccept = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "bmp",
      "webp",
    ];
    editor.config.uploadImgMaxSize = 10 * 1024 * 1024; //10M
    editor.config.uploadImgParams = { token: "xxxxx" };
    editor.config.uploadFileName = "file";

    editor.config.uploadImgHooks = {
      // 上传图片之前
      before: function (xhr) {
        // 可阻止图片上传
        return true;
      },
      // 图片上传并返回了结果，图片插入已成功
      success: function (xhr) {
        console.log("success", xhr);
      },
      // 图片上传并返回了结果，但图片插入时出错了
      fail: function (xhr, editor, resData) {
        console.log("fail", resData);
      },
      // 上传图片出错，一般为 http 请求的错误
      error: function (xhr, editor, resData) {
        console.log("error", xhr, resData);
      },
      // 上传图片超时
      timeout: function (xhr) {
        console.log("timeout");
      },
      // 图片上传并返回了结果，想要自己把图片插入到编辑器中
      // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
      customInsert: function (insertImgFn, result) {
        // result 即服务端返回的接口
        console.log("customInsert", result);
        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        let filepath = result.filepath;
        // console.log( result.filepath;)
        for (var i = 0; i < filepath.length; i++) {
          insertImgFn(filepath[i]);
        }
      },
    };
    editor.config.placeholder = "请输入...";
    editor.zIndex.baseZIndex = 100;

    editor.create();
    this.questionId = this.$route.query.questionId;
    // this.category = this.$route.query.category;
    // this.original = this.$route.query.original;
    this.$axios
      .get(
        "http://106.55.103.200:8088/fire_ant_project/judge/getJudgeByQuestionId?questionId=" +
          this.questionId
      )
      .then((res) => {
        console.log(res);
        editor.txt.html(res.data.message.question);
        this.textarea = res.data.message.questionAnalysis;
        this.answers = res.data.message.answer;
        if (this.answers == "A") {
          this.radio1 = "对";
        } else if (this.answers == "B") {
          this.radio1 = "错";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
.el-form-item__content {
  margin-left: 20px;
}
.message-box {
  z-index: 10000000000;
}
</style>
<style lang='less' scoped>
</style>
