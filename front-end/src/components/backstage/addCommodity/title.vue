<template>
  <div>
    <el-form  class="demo-form-inline">
      <el-form-item label="product name">
        <el-input
          v-model="coname"
          @blur="onblur"
          placeholder="Please enter product name"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="upLoadImg">Upload product image</el-button>
      </el-form-item>
      <el-form-item label="Price">
        <el-input type="number" v-model.number="price" @blur="priceBlur"></el-input>
      </el-form-item>
      <el-form-item label="Title">
        <el-input type="textarea" autosize placeholder="Please enter the title" @blur="titleBlur" v-model="title">
    </el-input>
      </el-form-item>
    </el-form>
    <uplpadImg ref="uplpadImg" v-show="uploadImgIsShow"></uplpadImg>
  </div>
</template>

<script>
import uplpadImg from "./uploadImg";
export default {
  components: {
    uplpadImg,
  },
  data() {
    return {
      title: "",
      coname:"",
      uploadImgIsShow: false,
      blogType: "",
      blogTypeData: null,
      price:""
    };
  },
  mounted() {
    this.$bus.$on("clearTileData", this.clearData);
  },
  methods: {
    upLoadImg() {
      this.$refs.uplpadImg.init(1);
      this.uploadImgIsShow = true;
    },
    onblur() {
      if (this.coname == "") {
        return;
      }
      var ommodity = this.$store.state.commod;
      console.log(ommodity);
      ommodity.coname = this.coname;
      this.$store.commit("saveCommodity", ommodity);
    },
    priceBlur(){
       if (this.price == "") {
        return;
      }
      var ommodity = this.$store.state.commod;
      console.log(ommodity);
      ommodity.price = this.price;
      this.$store.commit("saveCommodity", ommodity);
    },
    titleBlur(){
       if (this.title == "") {
        return;
      }
      var ommodity = this.$store.state.commod;
      if(this.title.length > 50){
        var jhtitle = this.title.substring(0,50) + "...";
        ommodity.jhtitle = jhtitle;
      }else{
        ommodity.jhtitle = this.title;
      }
      
      console.log(ommodity);
      ommodity.title = this.title;
      this.$store.commit("saveCommodity", ommodity);
    },
    clearData() {
      this.title = "";
      this.coname = "";
      this.price = "";
    },
  },
};
</script>

<style>
</style>