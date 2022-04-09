<template>
  <div
    style="width: 98%; margin-left: 2%; text-align: center; margin-top: 10px"
  >
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="Product imag" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" width="150px" height="150px" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="coname" label="Product" width="180">
      </el-table-column>
      <el-table-column prop="jhtitle" label="Title" width="200"> </el-table-column>
      <el-table-column prop="price" label="price" sortable width="150">
      </el-table-column>
      <el-table-column prop="conumber" label="Volume" sortable width="150">
      </el-table-column>
      <el-table-column label="Status" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.code == 0">On sale</span>
          <span v-else>off sale</span>
        </template>
      </el-table-column>
      <el-table-column label="Operation" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="update(scope.row)">modify</el-button>
          <el-button
            v-if="scope.row.code == 0"
            size="mini"
            type="danger"
            @click="deleted(scope.row, 1)"
            >off sale</el-button
          >
          <el-button v-else size="mini" @click="deleted(scope.row, 0)"
            >on sale</el-button
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
      <br />
      <br />
    </div>
    <updateCommodity ref="update" v-show="updateIsShow"></updateCommodity>
    <deleteCommodity ref="del" v-show="delIsShow"></deleteCommodity>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
import updateCommodity from "./updateCommodity";
import deleteCommodity from "./deleteCommodity";
export default {
  components: {
    updateCommodity,
    deleteCommodity,
  },
  data() {
    return {
      tableData: [],
      pagesize: 5,
      currPage: 1,
      updateIsShow: false,
      delIsShow: false,
      isPage: false,
      total: 0,
    };
  },
  mounted() {
    this.getData(this.currPage, this.pagesize);
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
    update(row) {
      this.$refs.update.init(row);
      this.updateIsShow = true;
      this.$refs.update.$on("update", () => {
        this.getData(this.currPage, this.pagesize);
      });
    },
    deleted(row, type) {
      this.$refs.del.init(row, type);
      this.delIsShow = true;
    },
    currPageChange(value) {
      this.currPage = value;
      // this.getOrderData(value, this.pagesize);
      this.getData(value,this.pagesize);
    },
    getData(currPage, pageSize) {
      setDataFromAxios(`/api/commodity/${currPage}/${pageSize}`, "get").then(
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
  },
};
</script>

<style>
</style>