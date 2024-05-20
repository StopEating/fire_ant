<template>
  <div style="width: 100%; margin: 0 auto">
    <el-page-header @back="goback"> </el-page-header>
    <div style="width: 80%; margin: 0 auto">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        style="
          width: 480px;
          margin: 0 auto;
          display: inline-block;
          vertical-align: top;
        "
      >
        <el-form-item label="标题">
          <el-input v-model="title" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="author" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="original" style="width: 400px"></el-input>
        </el-form-item>
      </el-form>
      <div
        style="
          display: inline-block;
          vertical-align: top;
          width: 178px;
          margin-left: 20px;
        "
      >
        <h5
          style="
            margin-bottom: 20px;
            width: 178px;
            text-align: center;
            margin-top: 0px;
          "
        >
          上传封面图：
        </h5>
        <el-upload
          class="avatar-uploader"
          action="http://106.55.103.200:8088/fire_ant_project/article/uploadFileCover"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-if="this.category == 'STArticle' || this.category == 'TArticle'"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-upload
          class="avatar-uploader"
          action="http://106.55.103.200:8088/fire_ant_project/scienceArticle/uploadFileCover"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          v-else
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div
        style="
          display: inline-block;
          vertical-align: bottom;
          margin-bottom: 20px;
          margin-left: 20px;
        "
      >
        <el-button style="margin: 0 auto" @click="updates()" type="primary"
          >上传文章</el-button
        >
      </div>
    </div>

    <div class="ArticleDetail">
      <div
        ref="editor"
        style="
          text-align: left;
          width: 80%;
          z-index: -199999999;
          margin: 0 auto;
        "
      ></div>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
var editor;
export default {
  name: "editarticle",
  data() {
    return {
      original: "",
      articleId: "",
      category: "",
      imageUrl: "",
      title: "",
      author: "",
      image: "",
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    updates() {
      let content = editor.txt.html();
      let detail = editor.txt.text();

      // 培训资讯
      if (this.category == "TArticle") {
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/article/updateTArticle",
            {
              articleId: this.articleId,
              title: this.title,
              author: this.author,
              content: content,
              detail: detail,
            }
          )
          .then((res) => {
            this.$axios
              .post(
                "http://106.55.103.200:8088/fire_ant_project/article/updateCoverByArticleId",
                {
                  image: this.image,
                  title: this.title,
                  original: this.original,
                  articleId: this.articleId,
                }
              )
              .then((res) => {
                console.log("res");
              })
              .catch((error) => {
                console.log("error");
              });
            this.$router.push("/menu/trainarticle");
          })
          .catch((error) => {
            consolr.log("error");
          });
      }
      // 科普资讯
      else if (this.category == "STArticle") {
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/article/updateSTArticle",
            {
              articleId: this.articleId,
              title: this.title,
              author: this.author,
              content: content,
              detail: detail,
            }
          )
          .then((res) => {
            this.$axios
              .post(
                "http://106.55.103.200:8088/fire_ant_project/article/updateCoverByArticleId",
                {
                  image: this.image,
                  title: this.title,
                  original: this.original,
                  articleId: this.articleId,
                }
              )
              .then((res) => {
                console.log("res");
              })
              .catch((error) => {
                console.log("error");
              });
            this.$router.push("/menu/sciencearticle");
          })
          .catch((error) => {
            consolr.log("error");
          });
      }
      //科普文章
      else if (this.category == "SArticle") {
        this.$axios
          .post(
            "http://106.55.103.200:8088/fire_ant_project/scienceArticle/updateArticle",
            {
              articleId: this.articleId,
              title: this.title,
              author: this.author,
              content: content,
              detail: detail,
            }
          )
          .then((res) => {
            this.$axios
              .post(
                "http://106.55.103.200:8088/fire_ant_project/scienceArticle/updateCoverByArticleId",
                {
                  image: this.image,
                  title: this.title,
                  original: this.original,
                  articleId: this.articleId,
                }
              )
              .then((res) => {
                console.log("成功！");
              })
              .catch((error) => {
                console.log("error");
              });
            this.$router.push("/menu/science");
          })
          .catch((error) => {
            consolr.log(error);
          });
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.image = res.filepath;
      this.imageUrl = URL.createObjectURL(file.raw);
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
        "http://106.55.103.200:8088/fire_ant_project/article/uploadFile",

      //   使用这个字段获取图片信息
      uploadImgMaxLength: 1, // 限制一次最多上传 1 张图片
    };
    editor.config.height = 400;
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
      "http://106.55.103.200:8088/fire_ant_project/article/uploadFile"; //视频
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
      "http://106.55.103.200:8088/fire_ant_project/article/uploadFile";
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

    this.articleId = this.$route.query.articleId;
    this.category = this.$route.query.category;
    this.original = this.$route.query.original;
    // 培训咨询
    if (this.category == "TArticle") {
      this.$axios
        .get(
          "http://106.55.103.200:8088/fire_ant_project/article/getTArticle?articleId=" +
            this.articleId
        )
        .then((res) => {
          this.author = res.data.message.author;
          this.title = res.data.message.title;
          editor.txt.html(res.data.message.content);
          this.$axios
            .get(
              "http://106.55.103.200:8088/fire_ant_project/article/getCoverByArticleId?articleId=" +
                this.articleId
            )
            .then((res) => {
              this.imageUrl = res.data.message.image;
              this.image = res.data.message.image;
            })
            .catch((error) => {
              console.log("error");
            });
        })
        .catch((error) => {
          console.log("error");
        });
      // 科普资讯
    } else if (this.category == "STArticle") {
      this.$axios
        .get(
          "http://106.55.103.200:8088/fire_ant_project/article/getSTArticle?articleId=" +
            this.articleId
        )
        .then((res) => {
          this.author = res.data.message.author;
          this.title = res.data.message.title;
          editor.txt.html(res.data.message.content);
          this.$axios
            .get(
              "http://106.55.103.200:8088/fire_ant_project/article/getCoverByArticleId?articleId=" +
                this.articleId
            )
            .then((res) => {
              this.imageUrl = res.data.message.image;
              this.image = res.data.message.image;
            })
            .catch((error) => {
              console.log("error");
            });
        })
        .catch((error) => {
          console.log("error");
        });
      // 科普文章
    } else if (this.category == "SArticle") {
      this.$axios
        .get(
          "http://106.55.103.200:8088/fire_ant_project/scienceArticle/getArticle?articleId=" +
            this.articleId
        )
        .then((res) => {
          this.author = res.data.message.author;
          this.title = res.data.message.title;
          editor.txt.html(res.data.message.content);
          this.$axios
            .get(
              "http://106.55.103.200:8088/fire_ant_project/scienceArticle/getCoverByArticleId?articleId=" +
                this.articleId
            )
            .then((res) => {
              this.imageUrl = res.data.message.image;
              this.image = res.data.message.image;
            })
            .catch((error) => {
              console.log("error");
            });
        })
        .catch((error) => {
          console.log("error");
        });
    }
  },
};
</script>
<style scoped>
.avatar-uploader {
  border: 1px dashed #8c939d;
  width: 178px;
  height: 125px;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 125px;
  line-height: 125px;
  text-align: center;
  vertical-align: middle;
}
.avatar {
  width: 178px;
  height: 125px;
  display: block;
}
</style>
