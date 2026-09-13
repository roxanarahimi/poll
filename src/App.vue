<template>
 <div class="overflow-x-hidden">
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
