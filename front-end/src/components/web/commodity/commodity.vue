<template>
  <div>
    <div v-if="extend">
      <div
        style="
          width: 90%;
          margin-left: 5%;
          margin-top: 50px;
          display: flex;
          justify-content: space-around;
        "
      >
        <div class="left" style="width: 500px; height: 500px">
          <img :src="commodity.imgUrl" alt="" />
        </div>
        <div class="right" style="float: right">
          <h3>Product name: {{ commodity.coname }}</h3>

          <p style="text-indent: 2em">
            {{commodity.title}}
          </p>
          <br>
          <div>Description:</div>
          <br>
          <div class="productDescription" v-html="commodity.productDescription">
          </div>
          <div style="margin-top:10px">
            <p style="font-size: 18px">
              Price: <span style="color: red">{{ commodity.price }}</span
              >$
            </p>
            <el-input-number v-model="num" :min="1"></el-input-number>
            &nbsp;&nbsp;
            <el-button
              type="primary"
              :disabled="isDisabled"
              @click="addOrder"
              plain
              >Buy</el-button
            >
            <el-button
              type="primary"
              :disabled="isDisabled"
              icon="el-icon-shopping-cart-1"
              @click="addCart"
              >Add to cart</el-button
            >
          </div>
        </div>
      </div>
      <br />

      <el-divider></el-divider>
      <span style="margin-left: 60px; font-size: 20px">Comment</span>
      <div v-if="messages.length != 0">
        <div class="message">
          <div class="liuyan">
            <ul>
              <li v-for="message in messages" :key="message.cmid">
                <div class="messageItem">
                  <div class="title">
                    User:{{ message.uname }}
                    <span class="el-icon-chat-dot-square"></span>
                  </div>
                  <div class="count">
                    <div class="msgCount">
                      <p>{{ message.cmcontent }}</p>
                    </div>
                    <div class="msgDate">
                      <p>{{ message.cmdate }}</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <!-- Paging -->
            <div class="page" v-if="isPage">
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
        </div>
      </div>
      <div v-else style="text-align: center;font-size: 20px; width: 100%;height: 200px; line-height: 200px;">
        No comment currently
      </div>
    </div>
    <div v-else>
      <p>Product not avilable</p>
    </div>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
export default {
  data() {
    return {
      commodity: null,
      extend: false,
      num: 1,
      pagesize: 5,
      currPage: 1,
      total: 1,
      isPage:false,
      isLogin: false,
      isDisabled: true,
      user: null,
      coid: "",
      messages: [],
    };
  },
  mounted() {
    var url = document.location.href;
    var coid = url.split("?")[1].split("=")[1];
    this.coid = coid;
    this.getCommodity(coid);
    this.getUser();
    this.getMessage(this.currPage,this.pagesize);
    this.$bus.$on("updateCode", (code,user) => {
      if (code == 1) {
        this.isDisabled = true;
      }else{
        this.isDisabled = false;
        this.user = user;
        this.addHistory();
      }
    });
  },
  methods: {
    getCommodity(coid) {
      setDataFromAxios(`/api/commodity/${coid}`, "get").then((res) => {
        if (res.code == 200) {
          this.commodity = res.obj;
          console.log(this.commodity);
          this.addHistory();
          this.extend = true;
        }
      });
    },
    addHistory(){

      if(this.commodity == null || this.user == null){
         console.log(this.commodity,"   " , this.user)
        console.log("Something wrong")
        return;
      }
       console.log("Something wrong 1")
      var data = {
        uid:this.user.uid,
        coid:this.commodity.coid
      }
      console.log(data)
      setDataFromAxios(`/api/addRecord`,'post',data);
    },
    currPageChange(currPage) {
      this.currPage = currPage;
      this.getMessage(currPage,this.pagesize);
    },
    getMessage(currPage, pageSize) {
      setDataFromAxios(
        `/api/queryMessage/${this.coid}/${currPage}/${pageSize}`,
        "get"
      ).then((res) => {
        if (res.code == 200) {
          this.messages = this.dateFormart(res.data);
          if (res.total > this.pagesize) {
            this.isPage = true;
            this.total = res.total;
          } else {
            this.isPage = false;
          }
        }
      });
    },
    getUser() {
      var user = JSON.parse(sessionStorage.getItem("user"));
      if (user != null) {
        this.user = user;
        this.isLogin = true;
        this.isDisabled = false;
      }
    },
    addCart() {
      var data = {
        uid: this.user.uid,
        coid: this.coid,
        scNumber: this.num,
      };
      setDataFromAxios("/api/shoppingCart", "post", data).then((res) => {
        if (res.code == 201) {
          this.$message("Add to cart successfully");
        }
      });
    },
    dateFormart(list) {
      for (let i = 0; i < list.length; i++) {
        var date = new Date(list[i].cmdate);
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
            : "0" + date.getHours().toString(); // Hour
        var minutes =
          date.getMinutes() > 9
            ? date.getMinutes()
            : "0" + date.getMinutes().toString(); // Minute
        list[i].cmdate =
          year + "-" + month + "-" + day + " " + hours + ":" + minutes;
      }
      return list;
    },
    addOrder() {
      var data = {
        uid: this.user.uid,
        coid: this.coid,
        orderNumber: this.num,
      };
      setDataFromAxios("/api/order", "post", data).then((res) => {
        if (res.code == 201) {
          this.$message("Purchaed. Waiting for ship.");
        }
      });
    },
  },
};
</script>

<style soped>
.left {
  border: 1px solid;
  margin-right: 50px;
}
.right {
  width: 100%;
  position: relative;
}
.message {
  width: 100%;
  height: 500px;
  overflow: hidden;
}
.liuyan {
  width: 70%;
  height: 700px;
  margin: 50px auto;
}
.messageItem {
  width: 70%;
  height: 110px;
  margin: 0 auto;
}
.liuyan ul li {
  list-style-type: none;
  margin-bottom: 20px;
}
.title {
  background-color: aquamarine;
  height: 30px;
  border-radius: 8px 8px 0 0;

  color: #000;
  line-height: 30px;
  padding-left: 20px;
}
.count {
  height: 80px;
  border-left: aquamarine 1px solid;
  border-right: aquamarine 1px solid;
  border-bottom: aquamarine 1px solid;
  color: #000;
  border-radius: 0 0 8px 8px;
}
.msgCount {
  height: 50px;
  text-align: center;
  font-size: 18px;
  padding-top: 10px;
  padding-left: 2px;
  padding-right: 2px;
  text-indent: 2em;
}
.msgDate {
  font-size: 12px;
  float: right;
  margin-right: 10px;
  margin-top: -10px;
}
.page {
  display: flex;
  justify-content: center;
}

.mstitle {
  font-size: 20px;
}
.msbody {
  font-size: 16;
  text-indent: 2em;
}
</style>