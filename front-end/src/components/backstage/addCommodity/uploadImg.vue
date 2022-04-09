<template>
  <div>
    <el-dialog
      title="Upload image"
      :visible.sync="isShow"
      width="35%"
      :before-close="handleClose"
      @open="open"
    >
      <div style="margin-left: 50px">
        <el-upload
          class="upload-demo"
          :drag="true"
          ref="uploadRef"
          :headers="headers"
          :on-success="success"
          :limit="1"
          action="http://localhost:8080/imgUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drag files here, or <em>click upload</em></div>
          <div class="el-upload__tip" slot="tip">Only jpg/png files can be uploaded</div>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      type: 0,
      headers: null,
    };
  },
  mounted() {},
  methods: {
    init(type) {
      this.isShow = true;
      this.type = type;
    },
    open() {
      var headers = {};
      headers.token = sessionStorage.getItem("token");
      headers.uid = this.uid;
      this.headers = headers;
    },
    handleClose(done) {
      this.$confirm("Confirm close?")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    success(res) {
      if (res.code == 200) {
        this.$notify({
          title: "succeed",
          message: res.message,
          type: "success",
        });
        
        var commod = this.$store.state.commod;
        console.log(this.$store.state)
        commod.imgUrl = res.imgUrl;
        this.$store.commit("saveCommodity", commod);
        this.$emit("updateImage");

        this.isShow = false;
        this.$refs.uploadRef.clearFiles();
      } else {
        this.$notify.error({
          title: "error",
          message: res.message,
        });
      }
    },
  },
};
</script>

<style>
</style>