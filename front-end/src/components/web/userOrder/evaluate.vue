<template>
  <div>
    <el-dialog title="Feedback" :visible.sync="isShow" width="30%">
      comment:
      <el-input
        type="textarea"
        placeholder="please enter the comment"
        v-model="msgValue"
        maxlength="150"
        show-word-limit
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">Cancel</el-button>
        <el-button type="primary" @click="addMessage"
          >Confirm</el-button
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
      orderid: "",
      msgValue: "",
      uid: "",
      coid: "",
    };
  },
  methods: {
    init(orderid, uid, coid) {
      this.orderid = orderid;
      this.uid = uid;
      this.coid = coid;
      this.isShow = true;
    },
    addMessage() {
        
      if (this.msgValue == "") {
        this.$message("Please enter in the comments first");
        return;
      }
      setDataFromAxios(`/api/order/${this.orderid}/3`, "put").then((res) => {
        if (res.code == 200) {

          var data = {
            uid: this.uid,
            coid: this.coid,
            cmcontent: this.msgValue,
          };
          setDataFromAxios("/api/addUserComment", "post", data).then((res) => {
            if (res.code == 201) {
                this.msgValue = "";
                this.$emit("updateOrder");
                this.$message("Commented");
              this.isShow = false;
            }
          });
        }
      });
    },
  },
};
</script>

<style>
</style>