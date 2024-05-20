<template>
  <div style="width: 80%; margin: 0 auto">
    <el-page-header @back="backs()"> </el-page-header>
    <div class="ArticleDetail">
      <div ref="editor" style="text-align: left; width: 70%" id="editor"></div>
    </div>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      style="margin-top: 10px"
    >
      <el-form-item label="A">
        <el-button slot="label" value="A" @click="adda('A', A, Aid)"
          >A</el-button
        >
        <div style="width: 67%" ref="editora" id="editora"></div>
      </el-form-item>
      <el-form-item label="B">
        <el-button slot="label" @click="addb('B', B, Bid)">B</el-button>
        <div style="width: 67%" ref="editorb" id="editorb"></div>
      </el-form-item>
      <el-form-item label="C">
        <el-button slot="label" @click="addc('C', C, Cid)">C</el-button>
        <div style="width: 67%" ref="editorc" id="editorc"></div>
      </el-form-item>
      <el-form-item label="D">
        <el-button slot="label" @click="addd('D', D, Did)">D</el-button>
        <div style="width: 67%" ref="editord" id="editord"></div>
      </el-form-item>
      <el-form-item label="E">
        <el-button slot="label" @click="adde('E', E, Eid)">E</el-button>
        <div style="width: 67%" ref="editore" id="editore"></div>
      </el-form-item>
    </el-form>
    <el-form :label-position="labelPosition" label-width="80px">
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
        <el-button type="primary" @click="add()">立即修改</el-button>
        <el-button type="primary" @click="backs()">完成修改</el-button>
      </el-form-item>
    </el-form>
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
      checkList: [],
      questionId: "",
      textarea: "",
      labelPosition: "left",
      aClick: true,
      bClick: true,
      cClick: true,
      dClick: true,
      eClick: true,

      Aid: "",
      Bid: "",
      Cid: "",
      Did: "",
      Eid: "",
      A: "",
      B: "",
      C: "",
      D: "",
      E: "",
    };
  },
  methods: {
    backs() {
      this.$router.push("/menu/questions");
    },
    submitForm() {},
    adda(optionNumber, content, optionId) {
      let questionId = this.questionId;
      if (this.aClick == true) {
        this.checkList.push({
          optionNumber,
          content,
          optionId,
          questionId,
        });
        console.log(this.checkList);
        this.aClick = false;
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/multipleChoice/getOptionAddAnswer",
            this.checkList
          )
          .then((res) => {
            console.log(res);
            this.answers = res.data.message.answer;
            this.$message("已将" + res.data.message.answer + "设为正确答案");
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.aClick == false) {
        for (var i = 0; i < this.checkList.length; i++) {
          if (this.checkList[i].optionNumber == optionNumber) {
            this.checkList.splice(i, 1);

            console.log(this.checkList);
          }
        }
        console.log("点击过了");
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/multipleChoice/getOptionAddAnswer",
            this.checkList
          )
          .then((res) => {
            console.log(res);
            this.answers = res.data.message.answer;
            this.$message("已将" + res.data.message.answer + "设为正确答案");
          })
          .catch((error) => {
            console.log(error);
          });
        this.aClick = true;
      }
    },
    addb(optionNumber, content, optionId) {
      let questionId = this.questionId;
      if (this.bClick == true) {
        this.checkList.push({
          optionNumber,
          content,
          optionId,
          questionId,
        });
        console.log(this.checkList);
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/multipleChoice/getOptionAddAnswer",
            this.checkList
          )
          .then((res) => {
            console.log(res);
            this.answers = res.data.message.answer;
            this.$message("已将" + res.data.message.answer + "设为正确答案");
          })
          .catch((error) => {
            console.log(error);
          });
        this.bClick = false;
      } else if (this.bClick == false) {
        for (var i = 0; i < this.checkList.length; i++) {
          if (this.checkList[i].optionNumber == optionNumber) {
            console.log(this.checkList);
          }
        }
        console.log("点击过了");
        this.checkList.splice(i, 1);
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/multipleChoice/getOptionAddAnswer",
            this.checkList
          )
          .then((res) => {
            console.log(res);
            this.answers = res.data.message.answer;
            this.$message("已将" + res.data.message.answer + "设为正确答案");
          })
          .catch((error) => {
            console.log(error);
          });
        this.bClick = true;
      }
    },
    addc(optionNumber, content, optionId) {
      let questionId = this.questionId;
      if (this.cClick == true) {
        this.checkList.push({
          optionNumber,
          content,
          optionId,
          questionId,
        });
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/multipleChoice/getOptionAddAnswer",
            this.checkList
          )
          .then((res) => {
            console.log(res);
            this.answers = res.data.message.answer;
            this.$message("已将" + res.data.message.answer + "设为正确答案");
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(this.checkList);
        this.cClick = false;
      } else if (this.cClick == false) {
        for (var i = 0; i < this.checkList.length; i++) {
          if (this.checkList[i].optionNumber == optionNumber) {
            this.checkList.splice(i, 1);

            console.log(this.checkList);
          }
        }
        console.log("点击过了");
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/multipleChoice/getOptionAddAnswer",
            this.checkList
          )
          .then((res) => {
            console.log(res);
            this.answers = res.data.message.answer;
            this.$message("已将" + res.data.message.answer + "设为正确答案");
          })
          .catch((error) => {
            console.log(error);
          });
        this.cClick = true;
      }
    },
    addd(optionNumber, content, optionId) {
      let questionId = this.questionId;
      if (this.dClick == true) {
        this.checkList.push({
          optionNumber,
          content,
          optionId,
          questionId,
        });
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/multipleChoice/getOptionAddAnswer",
            this.checkList
          )
          .then((res) => {
            console.log(res);
            this.answers = res.data.message.answer;
            this.$message("已将" + res.data.message.answer + "设为正确答案");
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(this.checkList);
        this.dClick = false;
      } else if (this.dClick == false) {
        for (var i = 0; i < this.checkList.length; i++) {
          if (this.checkList[i].optionNumber == optionNumber) {
            this.checkList.splice(i, 1);

            console.log(this.checkList);
          }
        }
        console.log("点击过了");
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/multipleChoice/getOptionAddAnswer",
            this.checkList
          )
          .then((res) => {
            console.log(res);
            this.answers = res.data.message.answer;
            this.$message("已将" + res.data.message.answer + "设为正确答案");
          })
          .catch((error) => {
            console.log(error);
          });
        this.dClick = true;
      }
    },
    adde(optionNumber, content, optionId) {
      let questionId = this.questionId;
      if (this.eClick == true) {
        this.checkList.push({
          optionNumber,
          content,
          optionId,
          questionId,
        });
        let data = JSON.stringify(this.checkList);
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/multipleChoice/getOptionAddAnswer",
            this.checkList
          )
          .then((res) => {
            console.log(res);
            this.answers = res.data.message.answer;
            this.$message("已将" + res.data.message.answer + "设为正确答案");
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(this.checkList);
        this.eClick = false;
      } else if (this.eClick == false) {
        for (var i = 0; i < this.checkList.length; i++) {
          if (this.checkList[i].optionNumber == optionNumber) {
            this.checkList.splice(i, 1);

            console.log(this.checkList);
          }
        }
        console.log("点击过了");
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/multipleChoice/getOptionAddAnswer",
            this.checkList
          )
          .then((res) => {
            console.log(res);
            this.answers = res.data.message.answer;
            this.$message("已将" + res.data.message.answer + "设为正确答案");
          })
          .catch((error) => {
            console.log(error);
          });
        this.eClick = true;
      }
    },
    add() {
      this.A = $("#editora").find(".w-e-text").html();
      this.B = $("#editorb").find(".w-e-text").html();
      this.C = $("#editorc").find(".w-e-text").html();
      this.D = $("#editord").find(".w-e-text").html();
      this.E = $("#editore").find(".w-e-text").html();
      let content = $("#editor").find(".w-e-text").html();
      if (
        content != "" &&
        this.A != "" &&
        this.B !== "" &&
        this.C !== "" &&
        this.D !== "" &&
        this.E !== ""
      ) {
        //   存储选项内容
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/multipleChoice/updateMultipleChoice",
            {
              question: content,
              questionAnalysis: this.textarea,
              questionId: this.questionId,
            }
          )
          .then((res) => {
            this.$axios
              .post(
                "http://106.55.103.200:8088/fire_ant_project/multipleChoice/addMultipleOption",
                [
                  {
                    questionId: this.questionId,
                    content: this.A,
                    optionNumber: "A",
                  },
                  {
                    questionId: this.questionId,
                    content: this.B,
                    optionNumber: "B",
                  },
                  {
                    questionId: this.questionId,
                    content: this.C,
                    optionNumber: "C",
                  },
                  {
                    questionId: this.questionId,
                    content: this.D,
                    optionNumber: "D",
                  },
                  {
                    questionId: this.questionId,
                    content: this.E,
                    optionNumber: "E",
                  },
                ]
              )
              .then((res) => {
                console.log(res);
                this.Aid = res.data.message[0].optionId;
                this.Bid = res.data.message[1].optionId;
                this.Cid = res.data.message[2].optionId;
                this.Did = res.data.message[3].optionId;
                this.Eid = res.data.message[4].optionId;
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
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$alert("选项以及题目均不能为空", "新建题目", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `选项以及题目均不能为空`,
            });
          },
        });
      }
    },
    maincontent() {
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
    },
    editora() {
      var That = this;
      editor = new E(this.$refs.editora);
      editor.customConfig = {
        onchange: function (html) {
          That.Content = html;
        },
        uploadImgServer:
          "http://106.55.103.200:8088/fire_ant_project/singleChoice/uploadFile",

        //   使用这个字段获取图片信息
        uploadImgMaxLength: 1, // 限制一次最多上传 1 张图片
      };
      editor.config.height = 50;
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
      editor.zIndex.baseZIndex = 1000000;
      editor.create();
    },
    editorb() {
      var That = this;
      editor = new E(this.$refs.editorb);
      editor.customConfig = {
        onchange: function (html) {
          That.Content = html;
        },
        uploadImgServer:
          "http://106.55.103.200:8088/fire_ant_project/singleChoice/uploadFile",

        //   使用这个字段获取图片信息
        uploadImgMaxLength: 1, // 限制一次最多上传 1 张图片
      };
      editor.config.height = 50;
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
      editor.zIndex.baseZIndex = 100000;
      editor.create();
    },
    editorc() {
      var That = this;
      editor = new E(this.$refs.editorc);
      editor.customConfig = {
        onchange: function (html) {
          That.Content = html;
        },
        uploadImgServer:
          "http://106.55.103.200:8088/fire_ant_project/singleChoice/uploadFile",

        //   使用这个字段获取图片信息
        uploadImgMaxLength: 1, // 限制一次最多上传 1 张图片
      };
      editor.config.height = 50;
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
      editor.zIndex.baseZIndex = 10000;
      editor.create();
    },
    editord() {
      var That = this;
      editor = new E(this.$refs.editord);
      editor.customConfig = {
        onchange: function (html) {
          That.Content = html;
        },
        uploadImgServer:
          "http://106.55.103.200:8088/fire_ant_project/singleChoice/uploadFile",

        //   使用这个字段获取图片信息
        uploadImgMaxLength: 1, // 限制一次最多上传 1 张图片
      };
      editor.config.height = 50;
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
      editor.zIndex.baseZIndex = 1000;
      editor.create();
    },
    editore() {
      var That = this;
      editor = new E(this.$refs.editore);
      editor.customConfig = {
        onchange: function (html) {
          That.Content = html;
        },
        uploadImgServer:
          "http://106.55.103.200:8088/fire_ant_project/singleChoice/uploadFile",

        //   使用这个字段获取图片信息
        uploadImgMaxLength: 1, // 限制一次最多上传 1 张图片
      };
      editor.config.height = 50;
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
    },
  },
  mounted: function () {
    this.maincontent();
    this.editora();
    this.editorb();
    this.editorc();
    this.editord();
    this.editore();
    $(".w-e-text-container").attr(
      "style",
      "height:auto;border:1px solid rgb(201, 216, 219);border-top:0"
    );
    this.questionId = this.$route.query.questionId;
    // this.category = this.$route.query.category;
    // this.original = this.$route.query.original;
    this.$axios
      .get(
        "http://106.55.103.200:8088/fire_ant_project/multipleChoice/getQuestionByQuestionId?questionId=" +
          this.questionId
      )
      .then((res) => {
        $("#editor").find("p").html(res.data.message.question);
        this.textarea = res.data.message.questionAnalysis;
        this.answers = res.data.message.answer;
        this.$axios
          .get(
            "http://106.55.103.200:8088/fire_ant_project/multipleChoice/getAllOptionByQuestionId?questionId=" +
              this.questionId
          )
          .then((res) => {
            $("#editora").find("p").html(res.data.message[0].content);
            $("#editorb").find("p").html(res.data.message[1].content);
            $("#editorc").find("p").html(res.data.message[2].content);
            $("#editord").find("p").html(res.data.message[3].content);
            $("#editore").find("p").html(res.data.message[4].content);
            this.A = res.data.message[0].content;
            this.Aid = res.data.message[0].optionId;
            this.B = res.data.message[1].content;
            this.Bid = res.data.message[1].optionId;
            this.C = res.data.message[2].content;
            this.Cid = res.data.message[2].optionId;
            this.D = res.data.message[3].content;
            this.Did = res.data.message[3].optionId;
            this.E = res.data.message[4].content;
            this.Eid = res.data.message[4].optionId;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
div {
  line-height: 50px !important;
}
</style>
<style lang="less" scoped>
/deep/ .w-e-menu > .w-e-panel-container {
  line-height: normal;
}
</style>
