<template>
  <div
    style="width: 90%; margin-left: 2%; text-align: center; margin-top: 20px"
  >
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column prop="uname" label="User id" width="200">
      </el-table-column>
      <el-table-column prop="user" label="User account" width="250">
      </el-table-column>
      <el-table-column prop="utype" label="User status" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.utype == 0">Account is normal</span>
          <span v-else>Account is freezed</span>
        </template>
      </el-table-column>
      <el-table-column label="Operation">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.utype == 0"
            size="mini"
            @click="updateUser(scope.row, 2)"
            >Freeze account</el-button
          >
          <el-button v-else size="mini" @click="updateUser(scope.row, 0)"
            >Restore account</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px" v-show="isPage">
      <el-pagination
        :page-size="pagesize"
        :current-page="currPage"
        @current-change="currPageChange"
        background
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <div style="height:60px"></div>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
export default {
  data() {
    return {
      tableData: [],
      pagesize: 5,
      currPage: 1,
      isPage: false,
      total: 100,
    };
  },
  mounted() {
    this.getUserData(this.currPage, this.pagesize);
  },
  beforeRouteEnter(to, from, next) {
    // ...
    //console.log("Enter")

    if (sessionStorage.getItem("admin") == null) {
      router.push("/home");
    }
    document.title = "Mall backend";
    next();
  },
  methods: {
    currPageChange(value) {
      this.currPage = value;
      this.getUserData(value, this.pagesize);
    },
    getUserData(currPage, pageSize) {
      setDataFromAxios(`/api/user/${currPage}/${pageSize}`, "get").then(
        (res) => {
          if (res.code == 200) {
            this.tableData = res.data;
            if (res.total > this.pagesize) {
              this.isPage = true;
              this.total = res.total;
            } else {
              this.isPage = false;
            }
          }
        }
      );
    },
    updateUser(row, code) {
      row.utype = code;
      setDataFromAxios("/api/updateUser", "post", row).then((res) => {
        if (res.code == 200) {
          this.$message("User modified successfully");
        }
      });
    },
  },
};
</script>
<style>
</style>