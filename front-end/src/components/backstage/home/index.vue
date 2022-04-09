<template>
  <div>
    <el-container>
      <el-header :style="cssStyle">
        <span style="color: #fff"> Welcome to front admin</span>
        <el-dropdown style="float: right">
          <span class="el-dropdown-link" style="color: #fff">
            Change theme<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="updateStyle(1)"
              >Default</el-dropdown-item
            >
            <el-dropdown-item @click.native="updateStyle(2)"
              >Night</el-dropdown-item
            >
            <el-dropdown-item @click.native="updateStyle(3)"
              >Colorful</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px" :style="cssStyle">
          <left></left>
        </el-aside>
        <el-main>
          <div style="height: 660px">
            <router-view> </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import left from "./left";
import router from "../../../router";

export default {
  components: {
    left,
  },
  data() {
    return {
      cssStyle: "background-color: #4e6ef2",
    };
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    // ...
    //console.log("Enter")

    if (sessionStorage.getItem("admin") == null) {
      router.push("/home");
    }
    document.title = "Front admin";
    next();
  },
  computed:{
    styleCode(){
      return this.$store.state.style;
    },
  },
  watch:{
      styleCode(newValue,oldValue){
        if(newValue == 1){
          this.cssStyle = "background-color: #4e6ef2"
        }else if(newValue == 2){
          this.cssStyle = "background-color: #000"
        }else if(newValue == 3){
          this.cssStyle = "background-color: #ef4e8a"
        }
        
      }
    },
  methods: {
    updateStyle(code) {
      console.log(code);
      this.$store.commit("updateStyle", code);
    },
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.yejian {
  background-color: #000;
}

.mr {
  background-color: #b3c0d1;
}
.sn {
  background-color: pink;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 660px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>