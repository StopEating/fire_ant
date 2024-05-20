<template>
  <div>
    <el-page-header @back="goBack" style="margin-bottom: 10px">
    </el-page-header>
    <div style="width: 60%; margin: 0 auto">
      <el-row>
        <el-col
          :span="200"
          v-for="(item, index) in head"
          :key="index"
          :offset="index > 0 ? 2 : 0"
        >
          <el-card :body-style="{ padding: '3px' }">
            <h3 style="line-height: 1.5em; margin: 10px">{{ item.title }}</h3>
            <div style="text-align: center">
              <video width="750" controls style="margin: 0 auto">
                <source :src="item.video" type="video/mp4" />
              </video>
            </div>
            <div style="padding: 14px">
              <p>
                <el-button size="mini" type="primary" style="padding: 2px"
                  >原创</el-button
                >
                {{ item.time }}
              </p>
              <p>若有侵权请联系我们</p>
              <p style="margin-top: 5px">{{ item.detail }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "getsciencevideo",
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
    let videoId = this.$route.query.videoId;
    let original = this.$route.query.original;
    let title = this.$route.query.title;
    this.$axios
      .get(
        "http://106.55.103.200:8088/fire_ant_project/video/getVideoById?videoId=" +
          videoId
      )
      .then((res) => {
        console.log(res);
        // this.content = res.data.message.content;
        // let title = res.data.message.title;
        let time = res.data.message.time;
        let detail = res.data.message.detail;
        let video = res.data.message.video;
        this.head.push({ title, time, detail, video });
        console.log(video);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
p {
  margin: 10px;
}
</style>
