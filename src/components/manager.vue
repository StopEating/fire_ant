<template>
  <div>
    <el-table :data="tableData" border style="width: 80%; margin: 0 auto">
      <!-- <el-table-column
        prop="index"
        label="序号"
        class="index"
        style="width: 100px"
      >
      </el-table-column> -->
      <el-table-column type="index" :index="indexMethod"> </el-table-column>
      <el-table-column prop="adminEmail" label="邮箱" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <!-- <el-table-column> -->
        <template slot-scope="scope">
          <el-button
            type="danger"
            class="el-icon-delete"
            @click="del(scope.row.index, scope.row.adminEmail)"
            >删除</el-button
          >
          <el-button
            class="el-icon-edit"
            @click="edit(scope.row.adminEmail)"
            type="success"
            >编辑</el-button
          >
        </template>
        <!-- </el-table-column -->
        >
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <!-- <el-button @click="add()">取消选择</el-button> -->
      <router-link to="/menu/manager/adds"
        ><el-button type="primary">增加管理员</el-button></router-link
      >
      <router-view
        style="z-index: 10000000"
        :key="new Date().getTime()"
      ></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    add() {
      this.$router.push({
        path: "/menu/adds",
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    del(index, id) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log(this.$refs.span[index], 1);
          this.$axios
            .post(
              "http://106.55.103.200:8088/fire_ant_project/admin/deleteCommonAdmin",
              {
                adminEmail: id,
              }
            )
            .then(() => {
              this.tableData.splice(index - 1, 1);
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
    edit(adminEmail) {
      this.$router.push({
        path: "/menu/manager/edits",
        query: { adminEmail: adminEmail },
      });
    },
  },
  mounted() {
    this.$axios
      .get("http://106.55.103.200:8088/fire_ant_project/admin/getAllCommonAdmin")
      .then((res) => {
        for (var i = 0; i < res.data.message.length; i++) {
          let adminEmail = res.data.message[i].adminEmail;
          let index = i + 1;
          this.tableData.push({
            adminEmail,
            index,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style scoped>
</style>
