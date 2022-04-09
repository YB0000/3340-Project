<template>
  <div>
    <el-dialog
      title="Modify item"
      :before-close="handleClose"
      :visible.sync="isShow"
      width="50%"
    >
      <div>
        <el-form ref="form" :model="data" label-width="80px">
          <el-form-item label="item id">
            <el-input disabled v-model="data.coid"></el-input>
          </el-form-item>
          <el-form-item label="item name">
            <el-input v-model="data.coname"></el-input>
          </el-form-item>
          <el-form-item label="item title">
            <el-input type="textarea" autosize v-model="data.title"> </el-input>
          </el-form-item>
          <el-form-item label="item price">
            <el-input type="number" v-model.number="data.price"></el-input>
          </el-form-item>
          <el-form-item label="volume">
            <el-input disabled v-model="data.conumber"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="update">Modify</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
export default {
  data() {
    return {
      isShow: false,
      data: {
        coid: null,
        coname: null,
        price: null,
        title: null,
        jhtitle: null,
        productDescription: null,
        imgUrl: null,
        conumber: null,
      },
    };
  },
  methods: {
    init(data) {
      this.data = data;
      this.isShow = true;
    },
    handleClose(done) {
      this.$confirm("Confirm to close?")
        .then((_) => {
          done();
          this.$emit("update");
        })
        .catch((_) => {});
    },
    update() {
      if (this.data.coname == "") {
        this.$message.error("Product name cannot be empty");
        return;
      }
      if (this.data.title == "") {
        this.$message.error("Product title cannot be empty");
        return;
      }
      if (this.data.price == "") {
        this.$message.error("Product price cannot be empty");
        return;
      }
      if (this.data.title.length > 50) {
        var jhtitle = this.data.title.substring(0, 50) + "...";
       this.data.jhtitle = jhtitle;
      } else {
        this.data.jhtitle = this.title;
      }

      setDataFromAxios("/api/updateCommodity", "post", this.data).then(
        (res) => {
          if (res.code == 200) {
            this.$message("Successfully modified");
            this.isShow = false;
          }
        }
      );
    },
  },
};
</script>

<style>
</style>