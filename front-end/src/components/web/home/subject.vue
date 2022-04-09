<template>
  <div >
      <div class="search">
      <form class="parent">
        <input type="text" v-model="searchValue" />
        <input type="button" style="cursor: pointer" @click="search" value="Search" />
      </form>
    </div>
    <div style="width: 80%; margin-left: 10%" class="body" v-if="dataList.length != 0">
        <div class="item" v-for="item in dataList" :key="item.coid" @click="toCommodity(item.coid)">
      <p style="margin-left: 10px; margin-top: 10px">{{ item.coname }}</p>
      <div style="text-align:center">
        <img :src="item.imgUrl" alt=""   width="250px" height="250px" />
      </div>
      <div>
        <p style="text-indent: 2em;">{{ item.jhtitle }}</p>
      </div>
      <div
        style="
          position: absolute;
          bottom: 0px;
          display: flex;
          justify-content: space-around;
        "
      >
        <p style="padding-right: 70px; margin-left: 10px">
          Price:{{ item.price }}
        </p>
        <p>Sales volume:{{ item.conumber }}</p>
      </div>
    </div>
    </div>
    <div v-else style="height:400px;line-height: 400px;text-align: center;">
      No product information
    </div>
    <div class="page" v-show="isPage">
        <el-pagination
            :page-size="pagesize"
            :current-page="currPage"
            @current-change="currPageChange"
            background
            layout="prev, pager, next"
            :total="total"
          >
          </el-pagination>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
import setDataFromAxios from "../../../api/api";
export default {
  data() {
    return {
      dataList: [],
      pagesize: 8,
      currPage: 1,
      total: 100,
      isPage: false,
      searchValue:"",
      code:0,
      codeValue:""
    };
  },
  mounted() {
    this.getData(this.currPage,this.pagesize);
  },
  methods: {
    getData(currPage,pageSize) {
      setDataFromAxios(`/api/IndexQueryCommodityByPage/${currPage}/${pageSize}`, "get").then((res) => {
        if (res.code == 200) {
          this.dataList = this.titleFormat(res.data);
          if(res.total > this.pagesize){
              this.isPage = true;
              this.total = res.total;
          }else{
              this.isPage = false;
          }
        }
      });
    },
    currPageChange(value) {
        this.currPage = value;
        if(this.code == 0){
            this.getData(value,this.pagesize);
        }else if(this.code == 1){
            this.searchBlogByPage(this.codeValue,value,this.pagesize);
        }
    },
    toCommodity(coid){
     window.open(`http://205.185.124.239/#/commodity?coid=${coid}`)
    },
    search(){
      if(this.searchValue == ""){
        this.$notify({
          title: 'Warning',
          message: 'Please enter item name and click Search',
          type: 'warning'
        });
        return;
      }
        setDataFromAxios(`/api/search/${this.searchValue}`,'get')
        .then(res=>{
          if(res.code == 200){
            this.dataList = this.titleFormat(res.data);
            this.code = 1;
            this.currPage = 1;
            this.codeValue = this.searchValue;
             if(res.total > this.pagesize){
              this.isPage = true;
              this.total = res.total;
          }else{
              this.isPage = false;
              this.total = 0;
          }

          }
        })
    },
     searchBlogByPage( title, currPage, pageSize){
      setDataFromAxios(`/api/searchPage/${title}/${currPage}/${pageSize}`,'get')
      .then(res =>{
        if(res.code == 200){
            this.dataList = this.titleFormat(res.data);
             if(res.total > this.pagesize){
              this.isPage = true;
              this.total = res.total;
          }else{
              this.isPage = false;
              this.total = 0;
          }
          }
      })
    },
    titleFormat(list){
       for(let i = 0; i < list.length; i++) {
         if(!list[i].title.length < 50){
            list[i].title = list[i].title.substring(0,50) + "..."
         }
       }
       return list;
    }
  },
};
</script>

<style>
.body {
  display: flex;
  flex-wrap: wrap;
  background-color: #eaeded;
}
.item {
  width: 21%;
  height: 400px;
  border: 1px solid;
  margin-left: 3%;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
}
.page{
    text-align: center;
    margin-top: 10px;
}
.search {
  width: 500px;
  height: 50px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.parent {
  width: 100%;
  height: 42px;
  top: 4px;
  position: relative;
}

.parent > input:first-of-type {  
  width: 380px;
  height: 40px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
}

.parent > input:first-of-type:focus {
  border: 1px solid #317ef3;
  padding-left: 10px;
}

.parent > input:last-of-type {  
  width: 100px;
  height: 44px;
  position: absolute;
  background: #317ef3;
  border: 1px solid #317ef3;
  color: #fff;
  font-size: 16px;
  outline: none;
}
</style>