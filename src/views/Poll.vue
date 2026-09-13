<template>
  <div class="w-100">
    <div class="w-100 vh-100">
      <div class=" h-100 w-100 text-center">
        <questions/>
      </div>
    </div>
  </div>
</template>
<script>

import Questions from "@/components/Questions.vue";
import {onMounted, ref} from "vue";
import App from "@/App.vue";

export default {
  name: 'Poll',
  components: {Questions,},
  setup() {
    const user = ref({})
    onMounted(() => {
      let user_ = JSON.parse(localStorage.getItem('user'));
      if (user_) {
        axios.get(App.setup().url + 'user/' + user_.id)
            .then((res) => {
              user.value = res.data
              localStorage.setItem('user', JSON.stringify(res.data));
            })
            .then(()=>{
              if (!user.value) {
                window.location = '/'
              }else if(user.value.voted == true) {
                window.location = '/'
              }
            })
            .catch((error) => console.error(error));

      } else {
        window.location = '/'
      }

    })
  }
}
</script>
<style scoped>

</style>