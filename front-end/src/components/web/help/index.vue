<template>
  <div style="width: 80%; margin: 0 auto">
    <h1 style="text-align: center; margin-top: 20px">User Help Documentation</h1>
    <h3 style="margin-top: 10px">1. User home page</h3>
    <p class="count">
      Using the first page you see after entering the system, you can register an account, log in, search for products, and click the product picture to enter the product details page
    </p>
    <br />
    <img
      src="../../../assets/userhome.png"
      width="100%"
      height="600px"
      alt=""
    />
    <h3 style="margin-top: 10px">2. Product details page</h3>
    <p class="count">
      On the product detail page, you can see the product name, price, title, description, and product reviews. You can add [register and login] to the shopping cart on this page and place an order
    </p>
    <br />
    <img src="../../../assets/spxq.png" width="100%" height="600px" alt="" />
    <h3 style="margin-top: 10px">3. Permission control</h3>
    <p class="count">
      When users register and log in, they can view the status of their shopping cart or order after adding to the shopping cart or purchasing products, and they can also view their own history records.</p>
    <br />
    <img src="../../../assets/userqx.png" width="100%" height="600px" alt="" />
    <br />
    <br />
    Note: When clicking on the product or registering and logging in does not respond, you can click the monitor button to view the current background and database status"    <el-button size="mini" @click="jcq"> Monitor </el-button>
    <div style="height: 60px"></div>
    <jcq ref="jcq" v-show="jcqIsShow"></jcq>
  </div>
</template>

<script>
import jcq from "./jcq";
export default {
  components: {
      jcq
  },
  data() {
      return {
          jcqIsShow:false
      }
  },
  methods: {
    jcq() {
      this.jcqIsShow = true;
      this.$refs.jcq.init();
    },
  },
};
</script>

<style>
.count {
  text-indent: 2em;
  margin-top: 5px;
}
</style>