<template>
  <router-view/>
</template>
<script>

import {ref} from "vue";

export default {
  setup(){
    const url ='http://localhost:8000/api/'

    return{
      url,
    }
  }
}
</script>

<style>

</style>
