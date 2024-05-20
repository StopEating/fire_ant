<template>
  <div class="demo-image__preview" style="margin-left: 10px">
    <div style="margin-bottom: 10px">
      <el-button @click="empty()" type="danger">一键清空轮播图</el-button>
    </div>
    <div
      v-for="(item, index) in srcList"
      style="margin-right: 5px; display: inline-block"
      ref="span"
      :key="item.imageId"
    >
      <el-image
        style="width: 148px; height: 100px; vertical-align: middle"
        :src="item.image"
        :preview-src-list="images"
      >
      </el-image>
      <el-button
        type="text"
        class="el-icon-delete"
        style="vertical-align: bottom; padding: 0"
        @click="deletes(item.imageId, index)"
      ></el-button>
    </div>
    <el-upload
      class="avatar-uploader"
      action="http://106.55.103.200:8088/fire_ant_project/slideshow/addSlideshow"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      list-type="picture-card"
      style="
        display: inline-block;
        vertical-align: top;
        width: 148px;
        height: 100px;
      "
      multiple
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: "",
      url: "http://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [],
      images: [],
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$axios
        .get(
          "http://106.55.103.200:8088/fire_ant_project/slideshow/queryAllSlideshow"
        )
        .then((res) => {
          console.log(res);
          // this.images = [];
          this.srcList = [];
          for (var i = 0; i < res.data.message.length; i++) {
            let image = res.data.message[i].image;
            let imageId = res.data.message[i].imageId;
            this.srcList.push({ image, imageId });
            this.images.push(image);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // window.location.reload();
    },

    deletes(id, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log(this.$refs.span[index], 1);
          this.$axios
            .post(
              "http://106.55.103.200:8088/fire_ant_project/slideshow/deleteOneSlideshow",
              {
                imageId: id,
              }
            )
            .then(() => {
              this.srcList.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((error) => {
              this.$message({
                type: "error",
                message: "删除失败",
              });
            });
        })

        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消删除",
          });
        });
    },
    empty() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log(this.$refs.span[index], 1);
          this.$axios
            .post(
              "http://106.55.103.200:8088/fire_ant_project/slideshow/deleteAllSlideshow"
            )
            .then(() => {
              this.srcList = [];
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((error) => {
              this.$message({
                type: "error",
                message: "删除失败",
              });
            });
        })

        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消删除",
          });
        });
    },
  },

  created() {
    this.$axios
      .get("http://106.55.103.200:8088/fire_ant_project/slideshow/queryAllSlideshow")
      .then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.message.length; i++) {
          let image = res.data.message[i].image;
          let imageId = res.data.message[i].imageId;
          this.srcList.push({ image, imageId });
          this.images.push(image);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed black;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
div {
  margin-bottom: 5px;
}
.avatar {
  width: 100px;
  height: 100px;
  display: inline-block;
}
</style>
<style lang="less" scoped>
/deep/ .el-upload--picture-card {
  width: 148px;
  height: 100px;
  line-height: 100px;
}
</style>