<template>
  <div v-if="bookedSlots.length" class="confirmation-view">
    <h2>Confirmed Bookings</h2>
    <ul>
      <li v-for="slot in bookedSlots" :key="slot.id">
        <strong>Slot:</strong> {{ slot.time }} <br />
        <strong>Booked By:</strong> {{ slot.userName }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useBookingStore } from '@/store/bookingStore';

export default defineComponent({
  setup() {
    const store = useBookingStore();

    // Реактивное получение списка забронированных слотов
    const bookedSlots = computed(() => store.bookedSlots);

    return {
      bookedSlots,
    };
  },
});
</script>

<style scoped>
.confirmation-view {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
.confirmation-view ul {
  list-style: none;
  padding: 0;
}
.confirmation-view li {
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f4f4f4;
}
</style>
