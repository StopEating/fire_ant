<template>
  <div style="width: 100%; margin: 0 auto">
    <div style="margin-bottom: 20px">
      <el-button @click="emptyall()" type="danger">清空</el-button>
      <el-button @click="delmany()" type="warning">删除所选题目</el-button>
      <el-select v-model="value" placeholder="所有类型题目">
        <el-option
          label="单项选择题"
          value="单项选择题"
          @click.native="singles()"
        >
        </el-option>
        <el-option
          label="多项选择题"
          value="多项选择题"
          @click.native="multys()"
        >
        </el-option>

        <el-option label="判断题" value="判断题" @click.native="judges()">
        </el-option>
        <el-option label="所有题目" value="所有题目" @click.native="alls()">
        </el-option>
      </el-select>
    </div>
    <el-table
      ref="multipleTable"
      :data="frontEndPageChange"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <p>题目：</p>
          <h3 v-html="scope.row.question" style="margin: 10px"></h3>
          <div
            v-for="(item, index) in scope.row.optionMap"
            :key="index"
            style="margin: 10px"
          >
            {{ index }}:
            <template>
              <span v-html="item"></span>
            </template>
          </div>
          <div style="margin: 10px">正确答案: {{ scope.row.answer }}</div>
          <div style="margin: 10px">
            解析： {{ scope.row.questionAnalysis }}
          </div>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="type" label="类型" width="200"> </el-table-column>
      <el-table-column label="题目" width="auto">
        <template slot-scope="scope">
          <p v-html="scope.row.question"></p>
        </template>
      </el-table-column>
      <el-table-column
        prop="answer"
        label="正确答案"
        show-overflow-tooltip
        width="auto"
      >
      </el-table-column>
      <el-table-column
        prop="questionAnalysis"
        label="解析"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="del(scope.row.questionId, scope.$index)"
            type="danger"
            >删除</el-button
          >
          <el-button
            @click="edit(scope.row.questionId, scope.$index, scope.row.type)"
            type="success"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      class="z-pagination"
      :current-page="paginationOptions.currentPage"
      :page-size="paginationOptions.pageSize"
      :page-sizes="paginationOptions.pageSizes"
      layout="total,sizes, prev, pager, next, jumper"
      :total="form.length"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "questions",
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

      single: [],
      multy: [],
      judge: [],
      all: [],
      value: "",
      check: [],
      form: [],
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
    handleSelectionChange(val) {
      this.check = val;
    },
    singles() {
      this.form = [];
      for (var i = 0; i < this.single.length; i++) {
        this.form.push(this.single[i]);
      }
      this.total = this.form.length;
      this.totalPage = Math.ceil(this.form.length / this.pageSize);
      this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
      this.getCurrentPageData();
    },
    multys() {
      this.form = [];
      for (var i = 0; i < this.multy.length; i++) {
        this.form.push(this.multy[i]);
      }
      this.total = this.form.length;
      this.totalPage = Math.ceil(this.form.length / this.pageSize);
      this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
      this.getCurrentPageData();
    },
    judges() {
      this.form = [];
      for (var i = 0; i < this.judge.length; i++) {
        this.form.push(this.judge[i]);
      }
      this.total = this.form.length;
      this.totalPage = Math.ceil(this.form.length / this.pageSize);
      this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
      this.getCurrentPageData();
    },
    alls() {
      this.form = [];
      for (var i = 0; i < this.all.length; i++) {
        this.form.push(this.all[i]);
      }
      this.total = this.form.length;
      this.totalPage = Math.ceil(this.form.length / this.pageSize);
      this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
      this.getCurrentPageData();
    },
    emptyall() {
      this.$confirm("此操作将清空所有题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post(
              "http://106.55.103.200:8088/fire_ant_project/question/deleteAllQuestion"
            )
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    delmany() {
      console.log(this.check);
      this.$confirm("此操作将删除所选题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = [];
          for (var i = 0; i < this.check.length; i++) {
            data.push(this.check[i].questionId);
          }
          this.$axios
            .post(
              "http://106.55.103.200:8088/fire_ant_project/question/deletePartQuestion",
              data
            )
            .then((res) => {
              window.location.reload();
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
    },
    del(questionId, index) {
      console.log(this.check);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post(
              "http://106.55.103.200:8088/fire_ant_project/question/deleteQuestionContentByQuestionId",
              { questionId: questionId }
            )
            .then((res) => {
              console.log(res);
              this.form.splice(index, 1);
            })
            .catch((error) => {
              console.log(error);
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(questionId, index, type) {
      if (type == "单选") {
        this.$router.push({
          path: "/menu/editsingle",
          query: { questionId: questionId },
        });
      } else if (type == "多选") {
        this.$router.push({
          path: "/menu/editmulty",
          query: { questionId: questionId },
        });
      } else if (type == "判断") {
        this.$router.push({
          path: "/menu/editjudge",
          query: { questionId: questionId },
        });
      }
    },
  },
  computed: {
    frontEndPageChange() {
      let start =
        (this.paginationOptions.currentPage - 1) *
        this.paginationOptions.pageSize;
      if (start >= this.form.length) start = 0;
      let end =
        this.paginationOptions.currentPage * this.paginationOptions.pageSize;
      if (end >= this.form.length) end = this.form.length;
      return this.form.slice(start, end);
    },
  },
  mounted() {
    this.$axios
      .get(
        "http://106.55.103.200:8088/fire_ant_project/question/getAllQuestionInfoDetail"
      )
      .then((res) => {
        console.log(res);
        for (var i = 0; i < res.data.message.length; i++) {
          if (res.data.message[i].questionType == "single") {
            let type = "单选";
            let answer = res.data.message[i].answer;
            let question = res.data.message[i].question;
            let questionAnalysis = res.data.message[i].questionAnalysis;
            let questionId = res.data.message[i].questionId;
            let optionMap = res.data.message[i].optionMap;
            this.single.push({
              type,
              answer,
              question,
              questionAnalysis,
              questionId,
              optionMap,
            });
            this.form.push({
              type,
              answer,
              question,
              questionAnalysis,
              questionId,
              optionMap,
            });
            this.all.push({
              type,
              answer,
              question,
              questionAnalysis,
              questionId,
              optionMap,
            });
          } else if (res.data.message[i].questionType == "multiple") {
            let type = "多选";
            let answer = res.data.message[i].answer;
            let question = res.data.message[i].question;
            let questionAnalysis = res.data.message[i].questionAnalysis;
            let questionId = res.data.message[i].questionId;
            let optionMap = res.data.message[i].optionMap;
            this.multy.push({
              type,
              answer,
              question,
              questionAnalysis,
              questionId,
              optionMap,
            });
            this.form.push({
              type,
              answer,
              question,
              questionAnalysis,
              questionId,
              optionMap,
            });
            this.all.push({
              type,
              answer,
              question,
              questionAnalysis,
              questionId,
              optionMap,
            });
          } else if (res.data.message[i].questionType == "judge") {
            let type = "判断";
            let answer = res.data.message[i].answer;
            let question = res.data.message[i].question;
            let questionAnalysis = res.data.message[i].questionAnalysis;
            let questionId = res.data.message[i].questionId;
            let optionMap = res.data.message[i].optionMap;
            this.judge.push({
              type,
              answer,
              question,
              questionAnalysis,
              questionId,
              optionMap,
            });
            this.form.push({
              type,
              answer,
              question,
              questionAnalysis,
              questionId,
              optionMap,
            });
            this.all.push({
              type,
              answer,
              question,
              questionAnalysis,
              questionId,
              optionMap,
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
<style lang="less" scoped>
/deep/ p img {
  width: 50px !important;
  padding: 10px;
  padding-top: 30px;
}
/deep/.el-collapse-item__header {
  height: auto;
  font-size: 18px;
  // padding: 10px;
  line-height: 30px;
}
/deep/ .el-collapse-item__content {
  font-size: 16px;
  padding-left: 6em;
  word-break: break-all;
  word-wrap: break-word;
}
/deep/ .el-collapse-item__content div {
  margin-bottom: 5px;
}
/deep/ .el-table tr td {
  padding-left: 20px;
  font-size: 16px;
}
</style>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
