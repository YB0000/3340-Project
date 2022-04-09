<template>
  <div
    style="width: 95%; margin-left: 2%; text-align: center; margin-top: 10px"
  >
    <div>Total sales: {{ price }} $</div>
    <br />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="product picture" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" width="150px" height="150px" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="coname" label="Product" width="180">
      </el-table-column>
      <el-table-column prop="price" label="Price" sortable width="180">
      </el-table-column>
      <el-table-column prop="ordernumber" label="Quantity of order" sortable width="120">
      </el-table-column>
      <el-table-column prop="orderdate" label="Order time" width="180">
      </el-table-column>
      <el-table-column prop="ordercode" label="Order Status" width="180">
      </el-table-column>
      <el-table-column label="Operation" width="120">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.ordercode == 'Not shipped'"
            size="mini"
            @click="updateOrderCode(scope.row)"
            >Ship it</el-button
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
      total: 0,
      price: 0,
    };
  },
  mounted() {
    this.getOrderData(this.currPage, this.pagesize);
  },
  beforeRouteEnter(to, from, next) {
    // ...
    console.log("Enter");

    if (sessionStorage.getItem("admin") == null) {
      router.push("/home");
    }
    document.title = "Mall backend";
    next();
  },
  methods: {
    currPageChange(value) {
      this.currPage = value;
      this.getOrderData(value, this.pagesize);
    },
    getOrderData(currPage, pageSize) {
      setDataFromAxios(
        `/api/adminQueryOrder/${currPage}/${pageSize}`,
        "get"
      ).then((res) => {
        if (res.code == 200) {
          this.tableData = this.dateFormart(res.data);
          this.price = res.obj;
          if (res.total > this.pagesize) {
            this.isPage = true;
            this.total = res.total;
          } else {
            this.isPage = false;
          }
        }
      });
    },
    dateFormart(list) {
      for (let i = 0; i < list.length; i++) {
        var date = new Date(list[i].orderdate);
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
            : "0" + date.getHours().toString(); // Hour
        var minutes =
          date.getMinutes() > 9
            ? date.getMinutes()
            : "0" + date.getMinutes().toString(); // minutes
        list[i].orderdate =
          year + "-" + month + "-" + day + " " + hours + ":" + minutes;
        if (list[i].ordercode == 0) {
          list[i].ordercode = "Not shipped";
        } else if (list[i].ordercode == 1) {
          list[i].ordercode = "Not received";
        } else if (list[i].ordercode == 2) {
          list[i].ordercode = "Not comment";
        } else if (list[i].ordercode == 3) {
          list[i].ordercode = "Commented";
        }
      }
      return list;
    },
    updateOrderCode(row) {
      console.log(row);
      setDataFromAxios(`/api/order/${row.orderid}/1`, "put").then((res) => {
        if (res.code == 200) {
          this.$message("Shipped successfully");
          this.getOrderData(this.currPage, this.pagesize);
        }
      });
    },
  },
};
</script>

<style>
</style>