<template>
  <div>
    <el-dialog title="put on/off sale" :visible.sync="isShow" width="30%">
      <span v-if="code == 0"> if on sale </span>
      <span v-else> if off sale </span>
      <div style="margin-top:50px">
        <el-button @click="isShow = false">Cancel</el-button>
        <el-button @click="btn" type="primary">Confirm</el-button>
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
      code: 0,
      data: null
    };
  },
  methods: {
    init(data, code) {
      this.isShow = true;
      this.data = data;
      this.code = code;
    },
    btn(){
      this.data.code = this.code;
      setDataFromAxios("/api/updateCommodity",'post',this.data)
        .then(res=>{
            if(res.code == 200){
                this.$message("Succeed");
                this.isShow = false;
            }
        })
    }
  },
};
</script>

<style>
</style>