<template>
    <div class="row w-100 p-0 m-0 overflow-x-hidden flex-row-reverse align-self-lg-end">

      <div class="col-12 col-lg-6">
        <div class="text-center mt-lg-3 py-lg-3">
          <img src="/img/logo.png" class="mt-2 d-block mx-auto logo"  alt="">
          <h3 class="text-center text-danger p-0 m-0" style="font-family: YekanBakhExtraBold">اژدها وارد می شود!</h3>
          <img src="/img/title.jpg" class="d-block mx-auto title"  alt="">
        </div>
        <router-view/>
      </div>
      <div class="col-12 col-lg-6 px-4">
        <div class="hero w-100">
          <img class="opacity-0 w-100" src="/img/desktop.jpg" alt="">
        </div>
      </div>
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
