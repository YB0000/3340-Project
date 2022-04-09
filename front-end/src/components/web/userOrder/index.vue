<template>
  <div>
    <div
        v-if="user!=null"
      style="width: 80%; margin-left: 10%; text-align: center; margin-top: 50px"
    >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="product image" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" width="150px" height="150px" alt="" />
          </template>
        </el-table-column>
        <template slot="empty">
        <span>No data</span></span>
        </template>
        <el-table-column prop="coname" label="Product" width="180">
        </el-table-column>
        <el-table-column prop="price" label="Price" sortable width="180">
        </el-table-column>
        <el-table-column
          prop="ordernumber"
          label="quantity"
          sortable
          width="120"
        >
        </el-table-column>
        <el-table-column prop="orderdate" label="order time" width="180">
        </el-table-column>
        <el-table-column prop="ordercode" label="Order Status" width="180">
        </el-table-column>
        <el-table-column label="operation" width="120">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.ordercode == 'Not received'"
              size="mini"
              @click="updateOrderCode(scope.row, 2)"
              >Received</el-button
            >
            <el-button
              v-if="scope.row.ordercode == 'Not comment'"
              size="mini"
              @click="updateOrderCode(scope.row, 3)"
              >leave review</el-button
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
        <br>
        <br>
      </div>
    </div>
    <div v-else style="text-align: center;font-size: 20px; width: 100%;height: 400px; line-height: 400px;">
        Not logged in
    </div>
    <evaluate v-show="evaluateIsShow" ref="evaluateRef"></evaluate>
    <receiving v-show="receivingIsShow" ref="receivingRef"></receiving>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
import evaluate from "./evaluate";
import receiving from "./Receiving";
export default {
  components: {
    evaluate,
    receiving,
  },
  data() {
    return {
      tableData: [],
      pagesize: 5,
      currPage: 1,
      evaluateIsShow: false,
      receivingIsShow: false,
      isPage: false,
      total: 0,
      user: null,
    };
  },
  mounted() {
    this.getOrderData(this.currPage, this.pagesize);
     this.$bus.$on("orderLoginUpdate", (user) => {
      this.user = user;
      this.getOrderData(this.currPage, this.pagesize);
    });
    this.$bus.$on("orderLogutUpdate", () => {
      this.user = null;
    });
  },
  methods: {
    currPageChange(value) {
      this.currPage = value;
      this.getOrderData(value, this.pagesize);
    },
    updateOrderCode(row, code) {
      if (code == 2) {
        this.receivingIsShow = true;
        this.$refs.receivingRef.$on("updateOrder", this.updateOrder);
        this.$refs.receivingRef.init(row.orderid);
      } else {
        this.evaluateIsShow = true;
        this.$refs.evaluateRef.$on("updateOrder", this.updateOrder);
        this.$refs.evaluateRef.init(row.orderid, this.user.uid, row.coid);
      }
    },
    updateOrder() {
      this.getOrderData(this.currPage, this.pagesize);
    },
    getOrderData(currPage, pageSize) {
      var user = JSON.parse(sessionStorage.getItem("user"));
      if (user == null) {
        return;
      }
      this.user = user;
      setDataFromAxios(
        `/api/userQueryOrder/${user.uid}/${currPage}/${pageSize}`,
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
    dateFormart(list) {
      for (let i = 0; i < list.length; i++) {
        var date = new Date(list[i].orderdate);
        var year = date.getFullYear(); // year
        var month =
          date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1).toString(); // month
        var day =
          date.getDate() > 9 ? date.getDate() : "0" + date.getDate().toString(); // day
        var hours =
          date.getHours() > 9
            ? date.getHours()
            : "0" + date.getHours().toString(); // hours
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
  },
};
</script>

<style>
</style>