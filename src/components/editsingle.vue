<template>
  <div style="width: 80%; margin: 0 auto">
    <el-page-header @back="goback()"> </el-page-header>
    <div class="ArticleDetail">
      <div ref="editor" style="text-align: left; width: 70%" id="editor"></div>
    </div>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      style="margin-top: 10px"
    >
      <el-form-item label="A">
        <el-button slot="label" value="A" @click="answer('A', A, Aid)"
          >A</el-button
        >
        <div style="width: 67%" ref="editora" id="editora"></div>
      </el-form-item>
      <el-form-item label="B">
        <el-button slot="label" @click="answer('B', B, Bid)">B</el-button>
        <div style="width: 67%" ref="editorb" id="editorb"></div>
      </el-form-item>
      <el-form-item label="C">
        <el-button slot="label" @click="answer('C', C, Cid)">C</el-button>
        <div style="width: 67%" ref="editorc" id="editorc"></div>
      </el-form-item>
      <el-form-item label="D">
        <el-button slot="label" @click="answer('D', D, Did)">D</el-button>
        <div style="width: 67%" ref="editord" id="editord"></div>
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
        <el-button type="primary" @click="add()">立即修改</el-button>
        <el-button type="primary" @click="goback()">完成修改</el-button>
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
      questionId: "",
      textarea: "",
      answers: "",
      labelPosition: "left",
      Aid: "",
      Bid: "",
      Cid: "",
      Did: "",
      A: "",
      B: "",
      C: "",
      D: "",
    };
  },
  methods: {
    goback() {
      this.$router.push("/menu/questions");
    },
    add() {
      this.A = $("#editora").find(".w-e-text").html();
      this.B = $("#editorb").find(".w-e-text").html();
      this.C = $("#editorc").find(".w-e-text").html();
      this.D = $("#editord").find(".w-e-text").html();
      let content = $("#editor").find(".w-e-text").html();
      if (
        content != "" &&
        this.A != "" &&
        this.B !== "" &&
        this.C !== "" &&
        this.D !== ""
      ) {
        //   存储选项内容
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/singleChoice/updateSingleChoice",
            {
              question: content,
              questionAnalysis: this.textarea,
              questionId: this.questionId,
            }
          )
          .then((res) => {
            this.$axios
              .post(
                "http://106.55.103.200:8088/fire_ant_project/singleChoice/addSingleOption",
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
                ]
              )
              .then((res) => {
                console.log(res);
                this.Aid = res.data.message[0].optionId;
                this.Bid = res.data.message[1].optionId;
                this.Cid = res.data.message[2].optionId;
                this.Did = res.data.message[3].optionId;
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
    answer(index, item, id) {
      console.log(item, index, id);
      console.log(item == "");
      this.$axios
        .post(
          "http://106.55.103.200:8088/fire_ant_project/singleChoice/getOptionAddAnswer",
          {
            content: item,
            optionId: id,
            optionNumber: index,
            questionId: this.questionId,
          }
        )
        .then((res) => {
          this.answers = index;
          console.log(res);
          this.$alert(
            "已设定正确答案，正确答案设定为:" + index,
            "设定正确答案",
            {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$message({
                  type: "info",
                  message: `已设定正确答案`,
                });
              },
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
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
          for (var i = 0; i < filepath.length; i++) {
            insertImgFn(filepath[i]);
          }
        },
      };
      editor.config.placeholder = "请输入...";
      editor.zIndex.baseZIndex = 100000000;
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
          for (var i = 0; i < filepath.length; i++) {
            insertImgFn(filepath[i]);
          }
        },
      };
      editor.config.placeholder = "请输入...";
      editor.zIndex.baseZIndex = 1000000;
      editor.create();
      $("#editor").attr("style", "height:auto;");
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
          for (var i = 0; i < filepath.length; i++) {
            insertImgFn(filepath[i]);
          }
        },
      };
      editor.config.placeholder = "请输入...";
      editor.zIndex.baseZIndex = 1000;
      editor.create();
    },
  },
  mounted() {
    this.maincontent();
    this.editora();
    this.editorb();
    this.editorc();
    this.editord();
    $(".w-e-text-container").attr(
      "style",
      "height:auto;border:1px solid rgb(201, 216, 219);border-top:0"
    );
    this.questionId = this.$route.query.questionId;

    this.$axios
      .get(
        "http://106.55.103.200:8088/fire_ant_project/singleChoice/getQuestionByQuestionId?questionId=" +
          this.questionId
      )
      .then((res) => {
        this.$axios
          .get(
            "http://106.55.103.200:8088/fire_ant_project/singleChoice/getAllOptionByQuestionId?questionId=" +
              this.questionId
          )
          .then((res) => {
            console.log(res);
            this.A = res.data.message[0].content;
            this.Aid = res.data.message[0].optionId;
            this.B = res.data.message[1].content;
            this.Bid = res.data.message[1].optionId;
            this.C = res.data.message[2].content;
            this.Cid = res.data.message[2].optionId;
            this.D = res.data.message[3].content;
            this.Did = res.data.message[3].optionId;
            $("#editora").find("p").html(res.data.message[0].content);
            $("#editorb").find("p").html(res.data.message[1].content);
            $("#editorc").find("p").html(res.data.message[2].content);
            $("#editord").find("p").html(res.data.message[3].content);
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(res);
        $("#editor").find("p").html(res.data.message.question);
        // editor.txt.html(res.data.message.question);
        this.textarea = res.data.message.questionAnalysis;
        this.answers = res.data.message.answer;
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
</style>
<style lang="less" scoped>
/deep/ .w-e-menu > .w-e-panel-container {
  line-height: normal;
}
</style>