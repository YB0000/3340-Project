<template>
  <div>
    <el-row class="tac">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        
        :background-color="color"
        text-color="#fff"
        width="100px"
        router
        active-text-color="#ffd04b"
      >
        <el-submenu
          v-for="list in menus"
          :key="list.entity.id"
          :index="`${list.entity.id}`"
        >
          <template slot="title">
            <i :class="list.entity.icon"></i>
            <span>{{ list.entity.alias }}</span>
          </template>
          <template v-if="list.childs != null">
            <MyMen :childs="list.childs"></MyMen>
          </template>
        </el-submenu>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
import MyMen from "./MyMen";
export default {
  components: {
    MyMen,
  },
  data() {
    return {
      menus: [],
      color:'#4e6ef2'
    };
  },
  computed:{
    styleCode(){
      return this.$store.state.style;
    },
  },
  watch:{
      styleCode(newValue){
        if(newValue == 1){
          console.log("item change")
          this.color = "#4e6ef2"
          console.log(this.color)
        }else if(newValue == 2){
          this.color = "#000"
        }else if(newValue == 3){
          this.color = "#ef4e8a"
        }
        
      }
    },
  mounted() {
    setDataFromAxios("/menu", "post").then((res) => {
      this.menus = res.menuData;
    });
    /*  axios.post("/menu").then(res =>{
        console.log(res.data.menuData)
    }) */
  },
};
</script>

<style>
/* .style1 {
  color: "#fff";
  background-color: pink;
}
.el-menu-item{
  color: red;
}
.style2 {
  color: "#fff";
  background-color: red;
}
.style3 {
  color: "#fff";
  background-color: #b3c0d1;
} */
</style>