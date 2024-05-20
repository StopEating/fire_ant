<template>
  <div id="recentarticle">
    <el-table :data="tableData" border style="width: 90%; margin: 0 auto">
      <el-table-column type="index" :index="indexMethod"> </el-table-column>
      <el-table-column prop="kind" label="类别" width="150"> </el-table-column>
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
            @click="check(scope.row.articleId, scope.row.category)"
            >查看</el-button
          >
        </template></el-table-column
      >
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: "",
      tableData: [],
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    check(articleId, category) {
      this.$router.push({
        path: "/menu/getarticle",
        query: { articleId: articleId, category: category },
      });
    },
  },
  mounted() {
    this.$axios
      .get("http://106.55.103.200:8088/fire_ant_project/cover/getAllTSTCover")
      .then((res) => {
        for (var i = 0; i < 7; i++) {
          console.log(res);
          if (res.data.message[i].category == "TArticle") {
            let kind = "培训资讯";
            let title = res.data.message[i].title;
            let original = res.data.message[i].original;
            let time = res.data.message[i].time;
            let img = res.data.message[i].image;
            let articleId = res.data.message[i].articleId;
            let category = res.data.message[i].category;
            this.tableData.push({
              kind,
              title,
              original,
              time,
              img,
              articleId,
              category,
            });
          } else {
            let kind = "科普资讯";
            let title = res.data.message[i].title;
            let original = res.data.message[i].original;
            let time = res.data.message[i].time;
            let img = res.data.message[i].image;
            let articleId = res.data.message[i].articleId;
            let category = res.data.message[i].category;
            this.tableData.push({
              kind,
              title,
              original,
              time,
              img,
              articleId,
              category,
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
