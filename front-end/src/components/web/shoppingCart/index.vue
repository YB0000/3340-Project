<template>
  <div>
    <div
      style="width: 80%; margin-left: 10%; text-align: center; margin-top: 50px"
      v-if="user != null"
    >
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="coname" label="Name" width="180">
        </el-table-column>
        <el-table-column prop="title" label="Title" width="250">
        </el-table-column>
        <el-table-column prop="price" label="Price" width="150">
        </el-table-column>
        <el-table-column prop="scnumber" label="Quantity" width="150">
        </el-table-column>
        <el-table-column prop="scdate" label="added time" width="200">
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button size="mini" @click="addOrder(scope.row)">Buy</el-button>
            <el-button size="mini"
            type="danger"
             @click="deletedOrder(scope.row)">Delete</el-button>
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
    </div>
    <div
      v-else
      style="
        height: 400px;
        line-height: 400px;
        text-align: center;
        font-size: 20px;
      "
    >
      Not logged in
    </div>
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
      user: null,
    };
  },
  mounted() {
    this.getTableData(this.currPage, this.pagesize);
    this.$bus.$on("cartLoginUpdate", (user) => {
      this.user = user;
      this.getTableData(this.currPage, this.pagesize);
    });
    this.$bus.$on("cartLogutUpdate", () => {
      this.user = null;
    });
  },
  methods: {
    currPageChange(value) {
      this.currPage = value;
      this.getTableData(value, this.pagesize);
    },
    getTableData(currPage, pageSize) {
      var user = JSON.parse(sessionStorage.getItem("user"));
      if (user == null) {
        return;
      }
      this.user = user;

      setDataFromAxios(
        `/api/queryShoppingCart/${user.uid}/${currPage}/${pageSize}`,
        "get"
      ).then((res) => {
        if (res.code == 200) {
          this.tableData = this.dateFormart(res.data);
          if (res.total > this.pagesize) {
            this.isPage = true;
            this.total = res.total;
          } else {
            this.isPage = false;
          }
        }
      });
    },
    deletedOrder(row){
      setDataFromAxios(`/api/delShoppingCartById/${row.scid}`,'delete')
      .then(res =>{
        if(res.code == 200){
          this.$message("Deleted")
          this.getTableData(1,this.pagesize);
        }
      })
    },
    addOrder(row) {
      if (this.user == null) {
        return;
      }
      var data = {
        uid: this.user.uid,
        coid: row.coid,
        orderNumber: row.scnumber,
      };
      setDataFromAxios("/api/order", "post", data).then((res) => {
        if (res.code == 201) {
          this.$message("Order submitted");
          setDataFromAxios(
            `/api/delShoppingCartById/${row.scid}`,
            "delete"
          ).then((res) => {
            if (res.code == 200) {
              this.getTableData(1, this.pagesize);
            }
          });
        }
      });
    },
    dateFormart(list) {
      for (let i = 0; i < list.length; i++) {
        var date = new Date(list[i].scdate);
        var year = date.getFullYear(); // Year
        var month =
          date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1).toString(); // Month
        var day =
          date.getDate() > 9 ? date.getDate() : "0" + date.getDate().toString(); // 日
        var hours =
          date.getHours() > 9
            ? date.getHours()
            : "0" + date.getHours().toString(); // hr
        var minutes =
          date.getMinutes() > 9
            ? date.getMinutes()
            : "0" + date.getMinutes().toString(); // min
        list[i].scdate =
          year + "-" + month + "-" + day + " " + hours + ":" + minutes;
      }
      return list;
    },
  },
};
</script>

<style>
</style>