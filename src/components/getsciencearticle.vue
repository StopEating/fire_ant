<template>
  <div>
    <el-page-header @back="goBack" style="margin-bottom: 10px">
    </el-page-header>
    <el-card class="box-card" style="width: 80%; margin: 0 auto">
      <div
        v-for="(item, index) in head"
        :key="index"
        class="text item"
        style="text-align: center; margin-bottom: 10px"
      >
        <h2 style="margin: 0 auto; width: 60%">{{ item.title }}</h2>
        <span style="margin-right: 10px">{{ item.author }}</span>
        <span>{{ item.time }}</span>
      </div>
      <div v-html="content" style="text-indent: 2em"></div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "getsciencearticle",
  data() {
    return {
      content: "",
      head: [],
    };
  },
  methods: {
    goBack() {
      this.$router.push("/menu/science");
    },
  },
  mounted() {
    let articleId = this.$route.query.articleId;
    let original = this.$route.query.original;
    this.$axios
      .get(
        "http://106.55.103.200:8088/fire_ant_project/scienceArticle/getArticle?articleId=" +
          articleId
      )
      .then((res) => {
        console.log(res);
        this.content = res.data.message.content;
        let title = res.data.message.title;
        let time = res.data.message.time;
        let author = res.data.message.author;
        let category = res.data.message.category;
        this.head.push({ title, time, author, category });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
</style>
<style lang="less" scoped>
/deep/ p {
  text-align: justify;
  line-height: 1.5;
}
/deep/ p img {
  width: 50%;
  display: flex;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
