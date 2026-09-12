<template>
 <div class="container-fluid p-0 m-0">
   <router-view/>
 </div>
</template>
<script>

import {ref} from "vue";

export default {
  setup(){
    const url ='https://polladmin.amadehlaziz.com/api/'

    return{
      url,
    }
  }
}
</script>

<style>

</style>
