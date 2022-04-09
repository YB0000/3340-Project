<template>
  <div>
    <el-dialog
      title="Register"
      :visible.sync="isShow"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="Username" prop="uname">
            <el-input
              v-model.number="ruleForm.uname"
              placeholder="Please enter user name"
            ></el-input>
          </el-form-item>
          <el-form-item label="Account" prop="user">
            <el-input
              v-model.number="ruleForm.user"
              placeholder="Please enter your account"
            ></el-input>
          </el-form-item>
          <el-form-item label="password" prop="pwd">
            <el-input
              type="password"
              v-model="ruleForm.pwd"
              autocomplete="off"
              placeholder="at least 6 characters of the password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="Confirm" prop="checkpwd">
            <el-input
              type="password"
              v-model="ruleForm.checkpwd"
              autocomplete="off"
              placeholder="Please confirm your password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="margin-left: 200px"
              type="primary"
              @click="register"
              >Register</el-button
            >
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
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
    var validataUsername = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("Username can not be empty"));
      } else {
        callback();
      }
    };
    var validataUser = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("Username can not be empty"));
      } else {
        callback();
      }
    };
    var validatapwd = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("password can not be blank"));
      } else if (value.length < 6) {
        callback(new Error("Password must be at least 6 characters"));
      } else {
        callback();
      }
    };
    var validatacheckpwd = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("password can not be empty"));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error("Different passwords entered"));
      } else {
        callback();
      }
    };
  

    return {
      isregister: false,
      isShow: false,
      isDisabled:false,
      ruleForm: {
        uname: "",
        user:"",
        pwd: "",
      },
      rules: {
        uname: [{ validator: validataUsername, trigger: "blur" }],
        user: [{ validator: validataUser, trigger: "blur" }],
        pwd: [{ validator: validatapwd, trigger: "blur" }],
        checkpwd: [{ validator: validatacheckpwd, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("Confirm to close?")
        .then(() => {
          this.isShow = false;
          done();
        })
        .catch(() => {});
    },
    register() {   
      setDataFromAxios("/api/user", "post", this.ruleForm).then((res) => {
        if (res.code == 201) {
          this.$message({
            message: res.message,
            type: "success",
          });
          this.$refs.ruleForm.resetFields();
          this.isShow = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    isEmail() {
      if (this.ruleForm.email == "") {
        return;
      }
      setDataFromAxios(`/api/isEmail/${this.ruleForm.email}`, "get").then(
        (res) => {
          if (res.code == 200) {
            this.isregister = true;
          } else {
            this.$message.error(res.message);
          }
        }
      );
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    init() {
      this.isShow = true;
    },
    btnTime() {
      var btn = document.getElementById("sendBtn");
      this.isDisabled = true;
      var mis = 60;
      var timeIntval = setInterval(() => {
        if (mis == 0) {
          btn.innerHTML = "get verification code";
         this.isDisabled = false;
          clearInterval(timeIntval)
        } else {
          btn.innerHTML = `${mis--}s reacquire`
        }
      }, 1000);
    },
  },
};
</script>
<style>
</style>