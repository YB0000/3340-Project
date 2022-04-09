<template>
  <div>
    <el-dialog title="Receive" :visible.sync="isShow" width="30%">
      Confirm received?
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">Cancel</el-button>
        <el-button type="primary" @click="receiving">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
export default {
  data() {
    return {
      isShow: false,
      orderId: "",
    };
  },
  methods: {
      init(orderId){
          this.orderId = orderId;
          this.isShow = true;
      },
      receiving(){
          setDataFromAxios(`/api/order/${this.orderId}/2`, "put").then(
          (res) => {
            if (res.code == 200) {
              this.$message("Please leave a Feedback");
              this.isShow = false;
              this.$emit("updateOrder")
            }
          }
        );
      }
  },
};
</script>

<style>
</style>