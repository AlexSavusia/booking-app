<template>
  <div class="slot-list">
    <h2>Available Slots</h2>
    <ul>
      <li
          v-for="slot in slots"
          :key="slot.id"
          :class="{ reserved: slot.reserved, selected: slot.id === selectedSlot?.id }"
          @click="handleSlotClick(slot.id)"
      >
        {{ slot.time }} <span v-if="slot.reserved">(Reserved)</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useBookingStore } from '@/store/bookingStore';
import { onMounted } from 'vue';
export default defineComponent({
  setup() {
    const store = useBookingStore();

    const slots = computed(() => store.slots);
    const selectedSlot = computed(() => store.selectedSlot);
    onMounted(() => {
      store.generateSlots('10:00', 60, 5); // Генерируем 5 слотов по часу, начиная с 10:00
    });
    const handleSlotClick = (id: number) => {
      const slot = store.slots.find((s) => s.id === id);
      if (slot && !slot.reserved) {
        store.selectSlot(id);
      }
    };

    return {
      slots,
      selectedSlot,
      handleSlotClick,
    };
  },
});
</script>

<style scoped>
.slot-list li {
  cursor: pointer;
  padding: 8px;
  border: 1px solid #ccc;
  margin: 5px;
  list-style: none;
}
.slot-list li.reserved {
  background-color: #e0e0e0;
  cursor: not-allowed;
}
.slot-list li.selected {
  background-color: #d4edda;
  border-color: #28a745;
}
</style>
