<template>
  <div>
    <div
      v-if="user != null"
      style="width: 70%; margin-left: 25%; text-align: center; margin-top: 50px"
    >
      <el-table :data="tabaleData" style="width: 100%">
        <el-table-column label="Product image" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" width="150px" height="150px" alt="" />
          </template>
        </el-table-column>
        <!-- <template slot="empty">
        <span>No data</span></span>
        </template> -->
        <el-table-column prop="coname" label="Product name" width="180">
        </el-table-column>
        <el-table-column prop="title" label="Product description" width="180">
        </el-table-column>
        <el-table-column prop="price" label="Price" sortable width="180">
        </el-table-column>
        <el-table-column prop="recorddate" label="Browse time" width="180">
        </el-table-column>
      </el-table>
      <el-button
        v-show="btnIsShow"
        style="margin-top: 30px; margin-left: -300px"
        @click="clear"
        >Clear history</el-button
      >
      <div style="height:60px"></div>
    </div>
    <div
      v-else
      style="
        text-align: center;
        font-size: 20px;
        width: 100%;
        height: 400px;
        line-height: 400px;
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
      tabaleData: [],
      user: null,
      isLogin: false,
      btnIsShow: false,
    };
  },
  mounted() {
    this.getUser();
    this.getData();
     this.$bus.$on("historyLoginUpdate", (user) => {
      this.user = user;
      this.getData(this.currPage, this.pagesize);
    });
    this.$bus.$on("historytLogutUpdate", () => {
      this.user = null;
    });
  },
  methods: {
      clear(){
          setDataFromAxios(`/api/clearHistory/${this.user.uid}`,'get')
          .then(res =>{
              if(res.code == 200){
                  this.$message("All clear");
                  this.getData();
              }
          })
      },
    getUser() {
      var user = JSON.parse(sessionStorage.getItem("user"));
      if (user != null) {
        this.isLogin = true;
        this.user = user;
      }
    },
    getData() {
      setDataFromAxios(`/api/getHistory/${this.user.uid}`, "get").then(
        (res) => {
          if (res.code == 200) {
            this.tabaleData = this.dateFormart(res.data);
            if (this.tabaleData.length != 0) {
              this.btnIsShow = true;
            }else{
                this.btnIsShow = false;
            }
          }
        }
      );
    },
    dateFormart(list) {
      for (let i = 0; i < list.length; i++) {
        var date = new Date(list[i].recorddate);
        var year = date.getFullYear(); // Year
        var month =
          date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1).toString(); // Month
        var day =
          date.getDate() > 9 ? date.getDate() : "0" + date.getDate().toString(); // Day
        var hours =
          date.getHours() > 9
            ? date.getHours()
            : "0" + date.getHours().toString(); // hour
        var minutes =
          date.getMinutes() > 9
            ? date.getMinutes()
            : "0" + date.getMinutes().toString(); // min
        list[i].recorddate =
          year + "-" + month + "-" + day + " " + hours + ":" + minutes;
      }
      return list;
    },
  },
};
</script>

<style>
</style>