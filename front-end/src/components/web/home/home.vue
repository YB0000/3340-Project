<template>
  <div>
      <lunbo></lunbo>
      <subject></subject>
  </div>
</template>

<script>
import lunbo from "./lunbo"
import subject from './subject'
export default {
    
components:{
    lunbo,subject
},
methods: {
  beforeRouteEnter(to, from, next) {
 
    document.title = "Front page";
    next();
  },
},
}
</script>

<style>

</style>