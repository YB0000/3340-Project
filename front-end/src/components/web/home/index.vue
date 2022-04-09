<template>
  <div>
    <el-container>
      <el-header style="height: 60px">
        <div style="width: 15%">
          <img
            src="../../../assets/logo.png"
            alt="Electronics"
            style="margin-top: 18px; float: left"
          />
        </div>
        <div style="width: 50%">
          <el-menu
            default-active="1"
            class="el-menu-demo"
            router
            mode="horizontal"
          >
            <el-menu-item index="1" route="/home">Front page</el-menu-item>
            <el-menu-item index="5" route="/history">View history</el-menu-item>
            <el-menu-item index="2" route="/shoppingCart">Shopping cart</el-menu-item>
            <el-menu-item index="3" route="/userOrder">Orders</el-menu-item> 
            <el-menu-item index="4" route="/help">Help Doc</el-menu-item> 
          </el-menu>
        </div>
        <div style="width: 15%; margin-top: -20px" class="login">
          <el-button
            type="primary"
            plain
            v-if="!$store.state.login.isLogin"
            @click="loginShow"
            >Login</el-button
          >
          <el-button
            type="primary"
            plain
            v-if="!$store.state.login.isLogin"
            @click="registerShow"
            >Register</el-button
          >
          <div
            v-if="$store.state.login.isLogin"
            style="margin-top: 60px; margin-left: 15px"
          >
            <el-dropdown>
              <div style="font-size:18px">
                User: {{user.uname}}
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout"
                  >Logout</el-dropdown-item
                >
                <el-dropdown-item v-if="isadmin" @click.native="userData"
                  >Goto admin</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
        <login v-show="this.$store.state.login.isLoginShow" ref="login"></login>
        <register v-show="isRegisterShow" ref="register"></register>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import login from '../user/login'
import register from '../user/register'

export default {
  components: {
   login,register
  },
  data() {
    return {
      uploadisShow: false,
      userDataIsShow: false,
      isRegisterShow: false,
      isadmin:false,
      user: null,
    };
  },
  mounted() {
   this.$refs.login.$on("loginData",(user)=>{
     this.user = user;
     if(user.utype == 1){
       this.isadmin = true;
     }else{
       this.isadmin = false;
     }
     this.updateLogin(true,false);
   }),
   this.sessionGetUser();
  },
  methods: {

    registerShow() {
      this.isRegisterShow = true;
      this.$refs.register.init();
    },
    loginShow() {
      this.updateLogin(false, true);
    },
    logout() {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("admin");
      sessionStorage.removeItem("token");
      this.updateLogin(false, false);
      this.$bus.$emit("updateCode",1);
      this.$bus.$emit("cartLogutUpdate");
      this.$bus.$emit("orderLogutUpdate");
      this.$bus.$emit("historytLogutUpdate");
      (this.user = null)
    },
    upload() {
      //this.$refs.upload.init(this.user.uid);
      this.uploadisShow = true;
    },
    userData() {
      window.open(`http://205.185.124.239/#/backstage`)
    },
    updateLogin(islogin, isLoginShow) {
      var login = this.$store.state.login;
      login.isLogin = islogin;
      login.isLoginShow = isLoginShow;
      this.$store.commit("updateLogin", login);
    },
    sessionGetUser(){
      var user = JSON.parse(sessionStorage.getItem("user"));
      if(user != null){
        this.user = user;
        if(user.utype == 1){
          this.isadmin = true;
        }
        this.updateLogin(true, false)
      }
    }
  },
};
</script>

<style scoped>
.el-main {
  
  padding: 0;
}
.el-header {
  padding: 0;
  display: flex;
  justify-content: space-around;
}
.el-menu-demo {
  display: flex;
  justify-content: space-around;
}
.login {
  text-align: center;
}
.login button {
  margin-top: 30px;
}
.el-avatar {
  margin-top: 18px;
}
.touxiang {
  width: 40px;
  height: 40px;
  margin-top: 30px;
  border-radius: 50px;
  /* background-image: url('../../assets/1001562.jpg'); */
  background-size: 100% 100%;
}
</style>