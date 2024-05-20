<template>
  <div style="width: 100%">
    <el-page-header @back="goback"> </el-page-header>
    <div style="width: 80%; margin: 0 auto">
      <div
        style="
          width: 500px;
          margin: 0 auto;
          display: inline-block;
          vertical-align: top;
          margin-top: 10px;
        "
      >
        <el-form :label-position="labelPosition" label-width="80px">
          <el-form-item label="标题:" required>
            <el-input v-model="title" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="详情:" required>
            <el-input
              v-model="detail"
              type="textarea"
              style="width: 400px"
            ></el-input>
          </el-form-item>
          <el-form-item label="来源:" required>
            <el-input v-model="original" style="width: 400px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div
        style="
          width: 200px;
          margin-left: 30px;
          display: inline-block;
          vertical-align: top;
        "
      >
        <h5 style="margin-bottom: 20px; padding: 0; margin-top: 0">
          上传封面图：
        </h5>
        <el-upload
          class="avatar-uploader"
          action="http://106.55.103.200:8088/fire_ant_project/video/uploadFileCover"
          :show-file-list="false"
          :on-success="handleimageSuccess"
          style="
            border: 1px dashed #8c939d;
            width: 178px;
            height: 178px;
            border-radius: 6px;
            cursor: pointer;
            overflow: hidden;
            text-ailgn: center;
          "
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
            style="width: 178px"
          />
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
            style="
              font-size: 28px;
              color: #8c939d;
              width: 178px;
              height: 178px;
              line-height: 178px;
              text-align: center;
              vertical-align: middle;
            "
          ></i>
        </el-upload>
      </div>
      <h5 style="margin-bottom: 20px">上传视频：</h5>
      <el-upload
        class="avatar-uploader"
        action="http://106.55.103.200:8088/fire_ant_project/video/uploadFile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <video v-if="videoUrl" :src="videoUrl" width="450" controls></video>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div style="width: 50%; margin: 0 auto; margin-top: 20px">
        <el-button style="margin: 0 auto" @click="finish()" type="primary"
          >完成创建</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "loadvideo",
  data() {
    return {
      videoId: "",
      image: "",
      imageUrl: "",
      video: "",
      videoUrl: "",
      labelPosition: "left",
      title: "",
      original: "",
      detail: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.video = res.filepath;
      this.videoUrl = URL.createObjectURL(file.raw);
    },

    handleimageSuccess(res, file) {
      console.log(res);
      this.image = res.filepath;
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    finish() {
      this.$axios
        .post("http://106.55.103.200:8088/fire_ant_project/video/addVideo", {
          title: this.title,
          original: this.original,
          video: this.video,
          detail: this.detail,
        })
        .then((res) => {
          console.log(res);
          this.videoId = res.data.message.videoId;
          this.$axios
            .post("http://106.55.103.200:8088/fire_ant_project/video/addCover", {
              image: this.image,
              title: this.title,
              original: this.original,
              videoId: this.videoId,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goback() {
      this.$router.push("/menu/science");
    },
  },
};
</script>
<style scoped>
.el-forn-item {
  line-height: 30px;
}
.avatar-uploader {
  border: 1px dashed #8c939d;
  width: 450px;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  margin-top: 20px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 400px;
  line-height: 200px;
  text-align: center;
  vertical-align: middle;
}
.avatar {
  width: 400px;
  display: block;
}
</style>
<style lang="less" scoped>
.el-form-item {
  z-index: 9999999999;
}
/deep/.el-form-item__label {
  padding: 5;
  line-height: 25px;
  height: 25px;
}
/deep/ .el-input__inner {
  height: 40px;
}
</style>
