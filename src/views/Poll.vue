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
export default {
  name: 'Poll',
  components:{Questions,}
}
</script>
<style scoped>

</style>