<template>
  <div>
    <div style="width: 50%; margin: 0 auto; text-align: center">
      <img
        src="../assets/textpng.png"
        alt=""
        width="80%"
        style="margin: 10px auto"
      />
    </div>

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item
        :index="item.path"
        v-for="(item, index) in nochildren"
        :key="item.path"
        style="vertical-align: middle; font-size: 16px"
      >
        <template>
          <i :class="menuIcon1[index]"></i>
          <router-link slot="title" tag="span" :to="'/menu/' + item.path">{{
            item.name
          }}</router-link>
        </template>
      </el-menu-item>
      <el-submenu
        :index="item.path"
        v-for="(item, index) in haschildren"
        :key="item.name"
      >
        <template slot="title">
          <i :class="menuIcon2[index]"></i>
          <span style="font-size: 16px">{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="item.path"
            v-for="item in item.children"
            :key="item.path"
          >
            <router-link slot="title" tag="span" :to="'/menu/' + item.path">{{
              item.name
            }}</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "commonaside",
  data() {
    return {
      menuIcon1: [
        "el-icon-user-solid",
        "el-icon-picture-outline-round",
        "el-icon-s-comment",
        "el-icon-notebook-2",
      ],
      menuIcon2: ["el-icon-reading", "el-icon-document"],
      list: [
        {
          path: "文章管理",
          name: "文章管理",
          children: [
            {
              path: "recentarticle",
              name: "近期资讯",
            },
            {
              path: "trainarticle",
              name: "培训资讯",
            },
            {
              path: "sciencearticle",
              name: "科普资讯",
            },
          ],
        },
        {
          path: "manager",
          name: "管理员中心",
        },
        {
          path: "imagesmanage",
          name: "轮播图管理",
        },
        {
          path: "data",
          name: "蚁情上传数据",
        },
        {
          path: "science",
          name: "科普文章/视频",
        },
        {
          path: "科普训练管理",
          name: "科普训练管理",
          children: [
            {
              path: "check",
              name: "科普活动管理",
            },
            {
              path: "newtest",
              name: "新建题目",
            },
            {
              path: "questions",
              name: "题库管理",
            },
            {
              path: "topicdataanalysis",
              name: "题目数据分析",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    nochildren() {
      return this.list.filter((item) => !item.children);
    },
    haschildren() {
      return this.list.filter((item) => item.children);
    },
  },
  mounted() {},
};
</script>
<style scoped>
div {
  width: 100%;
  font-style: cutefontstyle;
}
</style>
<style lang="less" scoped>
/deep/ .el-menu {
  background-color: #454959;
  color: #fff;
}
/deep/ .el-submenu__icon-arrow {
  color: #fff;
}
/deep/ li {
  color: #fff;
}
/deep/ li div {
  color: #fff;
}
/deep/ .el-menu {
  // display: none;
  position: static;
  width: 100%;
}
.active {
  color: red;
}
/deep/ .is-active {
  width: 100%;
  color: #409eff;
  // color: #fff;
  background-color: #fff;
}
/deep/ .is-opened {
  color: #409eff;
  background-color: #fff;
}
/deep/ .el-submenu__title {
  background-color: #454959;
  color: #fff;
}
/deep/ .el-submenu__title:hover {
  background-color: #36373f;
  color: #fff;
}
/deep/ .el-menu-item:hover {
  width: 100%;
  background-color: #36373f;
  color: #fff;
}
</style>
