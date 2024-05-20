<template>
  <div id="recentarticle">
    <div style="margin-top: 0px; margin-bottom: 10px">
      <el-button type="primary" size="small" @click="loadvideo()"
        >上传科普视频<i class="el-icon-upload el-icon--right"></i
      ></el-button>
      <el-button type="primary" size="small" @click="loadarticle()"
        >上传科普文章<i class="el-icon-upload el-icon--right"></i
      ></el-button>
      <el-button
        class="el-icon-refresh"
        type="primary"
        size="small"
        @click="newest()"
        >更新内容</el-button
      >
    </div>
    <el-table
      :data="frontEndPageChange"
      border
      style="width: 90%; margin: 0 auto"
    >
      <el-table-column type="index" :index="(currentPage - 1) * pageSize + 1">
      </el-table-column>
      <el-table-column prop="category" label="类别" width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="300"
        show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="original" label="来源" width="150">
      </el-table-column>
      <el-table-column prop="time" label="时间" width="150"> </el-table-column>
      <el-table-column label="封面图" width="150"
        ><template slot-scope="scope">
          <img
            :src="scope.row.img"
            width="80"
            height="40"
            class="head_pic"
          /> </template
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="
              check(
                scope.row.id,
                scope.row.category,
                scope.row.original,
                scope.row.title
              )
            "
            >查看</el-button
          >
          <el-button
            type="success"
            size="small"
            @click="
              edit(
                scope.row.id,
                scope.row.cate,
                scope.row.original,
                scope.row.title
              )
            "
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="del(scope.row.id, scope.row.category, index)"
            >删除</el-button
          >
        </template></el-table-column
      >
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      class="z-pagination"
      :current-page="paginationOptions.currentPage"
      :page-size="paginationOptions.pageSize"
      :page-sizes="paginationOptions.pageSizes"
      layout="total,sizes, prev, pager, next, jumper"
      :total="message.length"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //分页数据
      paginationOptions: {
        currentPage: 1, // 当前页
        pageSize: 5, // 每页展示数据5条
        pageSizes: [5, 10, 30, 40], // 可选择展示页数 数组
      },
      // 申报列表表格选中数据
      setUpProjectSelectedData: [],

      size: "",
      message: [],
      total: "",
      list: null,
      listLoading: true,
      totalPage: 1, // 统共页数，默认为1
      currentPage: 1, //当前页数 ，默认为1
      pageSize: 5, // 每页显示数量
      currentPageData: [], //当前页显示内容
      headPage: 1,
    };
  },
  computed: {
    frontEndPageChange() {
      let start =
        (this.paginationOptions.currentPage - 1) *
        this.paginationOptions.pageSize;
      if (start >= this.message.length) start = 0;
      let end =
        this.paginationOptions.currentPage * this.paginationOptions.pageSize;
      if (end >= this.message.length) end = this.message.length;
      return this.message.slice(start, end);
    },
  },
  methods: {
    //1.  改变每页显示的数量时触发
    handleSizeChange(currentPageSize) {
      this.paginationOptions.pageSize = currentPageSize;
      //发起请求，获取该页的数据
    },
    //2. 改变当前页码时触发
    handlePageChange(currentPage) {
      this.paginationOptions.currentPage = currentPage;
      //发起请求，获取最新页的数据
    },
    check(id, category, original, title) {
      if (category == "视频") {
        this.$router.push({
          path: "/menu/getsciencevideo",
          query: {
            videoId: id,
            category: category,
            original: original,
            title: title,
          },
        });
      } else if (category == "文章") {
        this.$router.push({
          path: "/menu/getsciencearticle",
          query: {
            articleId: id,
            category: category,
            original: original,
          },
        });
      }
    },
    newest() {
      this.$axios
        .get("http://106.55.103.200:8088/fire_ant_project/cover/getAllSAVCover")
        .then((res) => {
          this.message = [];
          console.log(res);
          for (var i = 0; i < res.data.message.length; i++) {
            if (res.data.message[i].category == "SVideo") {
              let id = res.data.message[i].videoId;
              let cate = res.data.message[i].category;
              let category = "视频";
              let title = res.data.message[i].title;
              let original = res.data.message[i].original;
              let time = res.data.message[i].time;
              let img = res.data.message[i].image;
              this.message.push({
                id,
                category,
                title,
                original,
                time,
                img,
                cate,
              });
            } else {
              let id = res.data.message[i].articleId;
              let cate = res.data.message[i].category;
              let category = "文章";
              let title = res.data.message[i].title;
              let original = res.data.message[i].original;
              let time = res.data.message[i].time;
              let img = res.data.message[i].image;
              this.message.push({
                id,
                category,
                title,
                original,
                time,
                img,
                cate,
              });
            }
          }
          this.$message({
            message: "已加载全部内容",
            type: "success",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    edit(articleId, category, original, title) {
      if (category == "SVideo") {
        this.$router.push({
          path: "/menu/editsciencevideo",
          query: {
            videoId: articleId,
            category: category,
            original: original,
            title: title,
          },
        });
      } else if (category == "SArticle") {
        this.$router.push({
          path: "/menu/editarticle",
          query: {
            articleId: articleId,
            category: category,
            original: original,
          },
        });
      }
    },
    del(id, category, index) {
      if (category == "视频") {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios
              .post(
                "http://106.55.103.200:8088/fire_ant_project/video/deleteVideoById",
                { videoId: id }
              )
              .then((res) => {
                console.log(res);
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.message.splice(index, 1);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else if (category == "文章") {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$axios
              .post(
                "http://106.55.103.200:8088/fire_ant_project/scienceArticle/deleteArticleByArticleId",
                { articleId: id }
              )
              .then((res) => {
                console.log(res);
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.frontEndPageChange.splice(index, 1);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    loadvideo() {
      this.$router.push("/menu/loadvideo");
    },
    loadarticle() {
      this.$router.push("/menu/loadarticle");
    },
  },

  mounted() {
    this.$axios
      .get("http://106.55.103.200:8088/fire_ant_project/cover/getAllSAVCover")
      .then((res) => {
        for (var i = 0; i < res.data.message.length; i++) {
          if (res.data.message[i].category == "SVideo") {
            let id = res.data.message[i].videoId;
            let cate = res.data.message[i].category;
            let category = "视频";
            let title = res.data.message[i].title;
            let original = res.data.message[i].original;
            let time = res.data.message[i].time;
            let img = res.data.message[i].image;
            this.message.push({
              id,
              category,
              title,
              original,
              time,
              img,
              cate,
            });
          } else {
            let id = res.data.message[i].articleId;
            let cate = res.data.message[i].category;
            let category = "文章";
            let title = res.data.message[i].title;
            let original = res.data.message[i].original;
            let time = res.data.message[i].time;
            let img = res.data.message[i].image;
            this.message.push({
              id,
              category,
              title,
              original,
              time,
              img,
              cate,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
.el-descriptions-item_container {
  padding: 10px;
  margin-left: 10px;
}
</style>
