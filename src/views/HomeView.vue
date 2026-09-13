<template>
  <div class="w-100">
    <div class="w-100">
      <div class=" w-100 text-center">
        <user />
      </div>
    </div>
  </div>
</template>

<script>

import User from "@/components/User.vue";

export default {
  name: 'HomeView',
  components: {
    User
  }
}
</script>
