<template>
  <div class="w-100">
    <div class="w-100 vh-100">
      <div class=" h-100 w-100 text-center">
        <questions />
      </div>
    </div>
  </div>
</template>
<script>

import Questions from "@/components/Questions.vue";
import {onMounted, ref} from "vue";
export default {
  name: 'Poll',
  components:{Questions,},
  setup(){
    const user = ref({})
    onMounted(()=>{
      user.value =JSON.parse(localStorage.getItem('user'));
      console.log(user.value)
      if(user.value == {}){
        window.location = '/'
      }
      if(user.value.voted){
        window.location = '/'
      }

    })
  }
}
</script>
<style scoped>

</style>