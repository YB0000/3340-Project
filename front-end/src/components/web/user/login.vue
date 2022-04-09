<template>
  <div>
    <el-dialog
      title="Login"
      :visible.sync="$store.state.login.isLoginShow"
      width="35%"
      :before-close="handleClose"
    >
      <div>
      
        <el-form
          :model="user"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="Account" prop="user">
            <el-input
              placeholder="Please enter your account"
              v-model="user.user"
            ></el-input>
          </el-form-item>
          <el-form-item label="password" prop="pwd">
            <el-input
              type="password"
              v-model="user.pwd"
              autocomplete="off"
              placeholder="Please enter your password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">Login</el-button>
            <el-button @click="resetForm">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
      
    </el-dialog>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";

export default {
  data() {
    var validataUserName = (rule, value, callback) => {
      
      if (value == "") {
        return callback(new Error("Account cannot be empty"));
      }  else {
        this.userName = true;
        callback();
      }
    };
    var validataPwd = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("password can not be blank"));
      } else {
        this.pwd = true;
        callback();
      }
    };
    return {
      islogin: false,
      userName: false,
      pwd: false,
      user: {
        user: "",
        pwd: "",
      },
      rules: {
        user: [{ validator: validataUserName, trigger: "blur" }],
        pwd: [{ validator: validataPwd, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("Confirm to close?")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    login() {
      if (!this.userName || !this.pwd) {
        this.$message({
          message: "Please fill in the login info",
          type: "warning",
        });
        return;
      }
      setDataFromAxios("/api/login", "post", this.user).then((res) => {
        if (res.code == 200) {
            this.userName = false
            this.pwd = false;
            if(res.obj.utype == 1){
               var userJson = JSON.stringify(res.obj)
            sessionStorage.setItem("admin",userJson);
            }
            this.$message("Logged in");
            this.$refs.ruleForm.resetFields();
            var userJson = JSON.stringify(res.obj)
            sessionStorage.setItem("user",userJson);
            this.$emit("loginData",res.obj);
            sessionStorage.setItem("token",res.token)
            this.$bus.$emit("updateCode",2,res.obj);
            this.$bus.$emit("cartLoginUpdate",res.obj);
            this.$bus.$emit("historyLoginUpdate",res.obj);
            this.$bus.$emit("orderLoginUpdate",res.obj);
            this.islogin = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style>
</style>