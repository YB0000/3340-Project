<template>
  <div>
    Please add a paragraph:
    <el-input type="textarea" autosize placeholder="Please enter content" v-model="body">
    </el-input>
    <div class="btn">
      <el-button type="primary" plain @click="addBody">Add a description title</el-button>
      <el-button type="primary" plain @click="addBodyItem">Add paragraph</el-button>
      <el-button type="primary" plain @click="addBlog">Add product</el-button>
    </div>

    <uplpadImg v-show="uploadImgIsShow" ref="uplpadImg"></uplpadImg>
  </div>
</template>

<script>
import uplpadImg from "./uploadImg";
import setDataFromAxios from "../../../api/api";
export default {
  components: {
    uplpadImg,
  },
  data() {
    return {
      body: "",
      uploadImgIsShow: false,
    };
  },
  methods: {
    addBody() {
      if (this.body == "") {
        this.$message.error("Please enter first before adding");
        return;
      }
      var commod = this.$store.state.commod;
      var htmlTemplate = `
                          <p class='mstitle'>${this.body}</p>
                          `;

      if (commod.productDescription == null) {
        commod.productDescription = htmlTemplate;
        this.$store.commit("saveCommodity", commod);
      } else {
        commod.productDescription += htmlTemplate;
        this.$store.commit("saveCommodity", commod);
      }
      this.$emit("updateBody");
      this.body = "";
    },
    addBodyItem() {
      if (this.body == "") {
        this.$message.error("Please enter first before adding");
        return;
      }
      console.log(11)
      var commod = this.$store.state.commod;
      var htmlTemplate = `
                          <p class='msbody'>${this.body}</p>
                          `;

      if (commod.productDescription == null) {
        this.$message("Please add a description title first")
      } else {
        commod.productDescription += htmlTemplate;
        this.$store.commit("saveCommodity",commod);
        this.$emit("updateBody");
        this.body = "";
      }
    },
    addBlog() {
      var commod = this.$store.state.commod;

      
      if (commod.coname == null || commod.coname == "") {
        this.$message.error("Product name cannot be empty");
        return;
      }
      if (commod.title == null || commod.title == "") {
        this.$message.error("Product title cannot be empty");
        return;
      }
      if (commod.price == null || commod.price == 0) {
        this.$message.error("Product price cannot be empty");
        return;
      }
      if (commod.productDescription == null || commod.productDescription == "") {
        this.$message.error("Product description cannot be empty");
        return;
      }
      if (commod.imgUrl == null || commod.imgUrl == "") {
        this.$message.error("Product image cannot be empty");
        return;
      }

      setDataFromAxios("/api/commodity", "post", commod).then((res) => {
        if (res.code == 201) {
          this.$message({
            message: "Product added successfully",
            type: "success",
          });

          this.$store.commit("clearData"); // clear blog data
          this.$bus.$emit("clearTileData"); // The global event center clears the data of the sibling components
        } else {
          this.$message.error("Post failed! Please contact the administrator");
        }
      });
    },
  },
  mounted() {
    this.$refs.uplpadImg.$on("updateImage", () => {
      console.log("Image upload callback");
      this.$emit("updateBody");
    });
  },
};
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
</style>