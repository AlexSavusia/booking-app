<template>
  <div class="app">
    <SlotList />
    <BookingForm />
    <ConfirmationView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SlotList from './components/SlotList.vue';
import BookingForm from './components/BookingForm.vue';
import ConfirmationView from './components/ConfirmationView.vue';

export default defineComponent({
  components: {
    SlotList,
    BookingForm,
    ConfirmationView,
  },
});

</script>

<style src="./styles/main.scss"></style>
