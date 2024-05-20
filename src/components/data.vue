<template>
  <div id="data">
    <el-button
      class="el-icon-refresh"
      type="primary"
      size="small"
      @click="newest()"
      style="margin-bottom: 20px"
      >更新内容</el-button
    >
    <el-button
      type="primary"
      size="small"
      @click="statistics()"
      style="margin-bottom: 20px"
      >数据统计</el-button
    >
    <el-table :data="frontEndPageChange" border style="width: 100%;font-size: 24px;">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <p style="margin: 10px; font-size: 16px">
            上传时间：{{ scope.row.times }}
          </p>
          <p style="margin: 10px; font-size: 16px">
            电话号码：{{ scope.row.userIds }}
          </p>
          <p style="margin: 10px; font-size: 16px">
            地址：{{ scope.row.address }}
          </p>
          <p style="margin: 10px; font-size: 16px">
            经度：{{ scope.row.latitudes }}
          </p>
          <p style="margin: 10px; font-size: 16px">
            维度：{{ scope.row.longitudes }}
          </p>
          <p style="margin: 10px; font-size: 16px">
            细节：{{ scope.row.details }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="times" label="上传时间" width="180">
      </el-table-column>
      <el-table-column prop="userIds" label="电话号码" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="latitudes" label="纬度"> </el-table-column>
      <el-table-column prop="longitudes" label="经度"> </el-table-column>
      <el-table-column prop="details" label="细节"> </el-table-column>

      <el-table-column
        prop="imgLists"
        label="现场图片"
        style="text-align: center"
      >
        <template width="90" slot-scope="scope">
          <el-image
            v-for="(item, index) in scope.row.imgLists"
            :key="index"
            v-show="index == 0"
            style="width: 60px; height: 30px; margin-right: 10px"
            :src="item"
            :preview-src-list="images[scope.$index]"
          ></el-image
          >...
        </template>
      </el-table-column>
    </el-table>
    <!-- <div style="margin-top: 20px">
      <el-button @click="firstPage">首页</el-button>
      <el-button @click="prevPage">上一页</el-button>
      <el-button @click="nextPage">下一页</el-button>
      <el-button @click="lastPage">尾页</el-button>
    </div> -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      class="z-pagination"
      :current-page="paginationOptions.currentPage"
      :page-size="paginationOptions.pageSize"
      :page-sizes="paginationOptions.pageSizes"
      layout="total,sizes, prev, pager, next, jumper"
      :total="tableData.length"
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

      images: [],
      tableData: [],
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

    statistics() {
      window.open("/statistics");
    },
    newest() {
      this.images = [];
      this.tableData = [];
      this.$axios
        .get(
          "http://106.55.103.200:8088/fire_ant_project/environmentData/queryAllEnvironmentData"
        )
        .then((res) => {
          console.log(res.data.message);
          for (var i = 0; i < res.data.message.length; i++) {
            let address = res.data.message[i].address;
            let details = res.data.message[i].detail;
            let imgLists = res.data.message[i].imgList;
            let latitudes = res.data.message[i].latitude;
            let longitudes = res.data.message[i].longitude;
            let times = res.data.message[i].time;
            let userIds = res.data.message[i].userId;
            this.images.push(res.data.message[i].imgList);
            this.tableData.push({
              address,
              details,
              imgLists,
              latitudes,
              longitudes,
              times,
              userIds,
            });
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
  },
  computed: {
    frontEndPageChange() {
      let start =
        (this.paginationOptions.currentPage - 1) *
        this.paginationOptions.pageSize;
      if (start >= this.tableData.length) start = 0;
      let end =
        this.paginationOptions.currentPage * this.paginationOptions.pageSize;
      if (end >= this.tableData.length) end = this.tableData.length;
      return this.tableData.slice(start, end);
    },
  },
  mounted() {
    this.$axios
      .get(
        "http://106.55.103.200:8088/fire_ant_project/environmentData/queryAllEnvironmentData"
      )
      .then((res) => {
        for (var i = 0; i < res.data.message.length; i++) {
          let address = res.data.message[i].address;
          let details = res.data.message[i].detail;
          let imgLists = res.data.message[i].imgList;
          let latitudes = res.data.message[i].latitude;
          let longitudes = res.data.message[i].longitude;
          let times = res.data.message[i].time;
          let userIds = res.data.message[i].userId;
          this.images.push(res.data.message[i].imgList);
          this.tableData.push({
            address,
            details,
            imgLists,
            latitudes,
            longitudes,
            times,
            userIds,
          });
        }
        // this.total = res.data.message.length;
        // this.totalPage = Math.ceil(res.data.message.length / this.pageSize);
        // this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
        // this.getCurrentPageData();
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
.el-table::-webkit-scrollbar {
  display: none;
}
</style>
