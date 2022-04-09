<template>
  <div>
    <el-dialog
      title="Monitor"
      :visible.sync="isShow"
      width="30%"
    >
      <div v-if="flag">
        <span>Backend running status: normal</span>
        <br>
        <span>Database running status: normal</span>
      </div>
      <div v-else>
         <span>Backend running status: abnormal</span>
        <br>
        <span>Database running status: abnormal</span>
      </div> 
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isShow = false"
          >Verify</el-button
        >
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
      flag: false,
    };
  },
  methods: {
    getFlag() {
      setDataFromAxios("/api/monitor", "get").then((res) => {
        if (res.code == 200) {
          this.flag = true;
        }
      });
    },
    init() {
      this.isShow = true;
      this.getFlag();
    },
  },
};
</script>

<style>
</style>