<template>
  <div class="app">
    <SlotList />
    <ConfirmationView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SlotList from "./components/SlotList.vue";
import ConfirmationView from "./components/ConfirmationView.vue";

export default defineComponent({
  components: {
    SlotList,
    ConfirmationView,
  },
});
</script>
