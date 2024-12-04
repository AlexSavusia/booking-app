<template>
  <div class="booking-form">
    <h2>Book a Slot</h2>
    <form @submit.prevent="confirmBooking">
      <input
          type="text"
          v-model="userName"
          placeholder="Enter your name"
      />
      <button :disabled="!userName || !selectedSlot">Confirm Booking</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useBookingStore } from '@/store/bookingStore';

export default defineComponent({
  setup() {
    const store = useBookingStore();

    const userName = computed({
      get: () => store.userName,
      set: (value: string) => (store.userName = value),
    });

    const selectedSlot = computed(() => store.selectedSlot);

    const confirmBooking = () => {
      if (store.userName && store.selectedSlot) {
        store.confirmBooking(store.userName);
      }
    };

    return {
      userName,
      selectedSlot,
      confirmBooking,
    };
  },
});
</script>

<style scoped>
.booking-form input {
  margin-right: 10px;
  padding: 5px;
}
</style>
