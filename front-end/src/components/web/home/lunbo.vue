<template>
  <div style="margin-top:20px">
    <el-carousel :interval="4000" type="card" height="200px" width="760px">
      <el-carousel-item v-for="item in dataList" :key="item">
        <img :src="item"  class="img">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
    data() {
        return {
            dataList:["http://localhost:8080/images/1.1.png",
                      "http://localhost:8080/images/4.1.png",
                      "http://localhost:8080/images/4.2.png",
                      "http://localhost:8080/images/9.1.png"
                      ]
        }
    },
};
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item{
    
  }
  .el-carousel__container{
    margin:0 auto;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .img{
      width: 100%;
      height:200px;
  }
</style>