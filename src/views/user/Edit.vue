<template>
  <UserDetail :isEdit="isEdit" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import UserDetail from './components/UserDetail.vue'
export default defineComponent({
  components: {
    UserDetail
  },
  setup() {
    const route = useRoute()
    const isEdit = ref(false)
    if (route.params.id) {
      isEdit.value = true
    }
    return {
      isEdit
    }
  }
})
</script>

<style lang="" scoped>

</style>
