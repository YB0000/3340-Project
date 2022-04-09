<template>
  <div class="addBlog">
    <div class="left" style="width: 48%; background-color: #dad4d4;float:left">
      <blogtitle></blogtitle>
      <blgSection ref="blgSection"></blgSection>
    </div>
    <div class="reight" style="width: 48%; background-color: #e9eeff;float:right">
       Preview:
      <hr />
      <div>
        <div
          style="
            width: 90%;
            margin-left: 5%;
            margin-top: 50px;
            display: flex;
            justify-content: space-around;
          "
        >
          <div
            class="cleft"
            style="width: 250px; height: 250px"
            v-if="commodity.imgUrl != null"
          >
            <img :src="commodity.imgUrl" alt="" width="250px" height="250px"/>
          </div>
          <div class="cright" style="float: right">
            <h3 v-if="commodity.coname != null">Product name: {{ commodity.coname }}</h3>

            <p style="text-indent: 2em">
              {{ commodity.title }}
            </p>
            <span v-if="commodity.productDescription != null">Description:</span>
            <div class="productDescription" v-html="commodity.productDescription">
            </div>
            <div style="">
              <p style="font-size: 18px" v-if="commodity.price != null">
                Price: <span style="color: red">{{ commodity.price }}</span
                >$
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blogtitle from "./title";
import blgSection from "./section";
import router from '../../../router';
export default {
  components: {
    blogtitle,
    blgSection,
  },
  data() {
    return {
      commodity: {
        coname: null,
        price: null,
        title: null,
        productDescription: null,
        imgUrl: null,
      },
    };
  },
  mounted() {
    this.getVuexData();
    this.$refs.blgSection.$on("updateBody", () => {
      console.log("Callback to update data");
      this.getVuexData();
    });
  },
  methods: {
     beforeRouteEnter(to, from, next) {
      // ...
      //console.log("Enter")
       document.title = "Mall background";
       if(sessionStorage.getItem("admin") == null){
         
       }
      next();
    },
    getVuexData() {
      this.commodity = this.$store.state.commod;
    },
  },
  //This is called when leaving the component
  beforeRouteLeave(to, from, next) {
    this.$store.commit("clearData"); // clear blog data
    next();
  },
  beforeRouteEnter(to, from, next) {
    // ...
    console.log("Enter")

    if (sessionStorage.getItem("admin") == null) {
      router.push("/home");
    }
    document.title = "Mall background";
    next();
  },
};
</script>

<style>
.cleft {
  border: 1px solid;
  margin-right: 50px;
}
.cright {
  width: 100%;
  position: relative;
}

.reight {
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.left {
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.mstitle {
  font-size: 20px;
}
.msbody {
  font-size: 16;
  text-indent: 2em;
}
</style>