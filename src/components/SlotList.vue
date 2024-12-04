<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-4">Доступные слоты</h2>
    <ul class="space-y-2">
      <li
          v-for="slot in slots"
          :key="slot.id"
          :class="[
          'p-2 border rounded cursor-pointer',
          slot.reserved ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100',
          slot.id === selectedSlotId ? 'bg-green-100 border-green-500' : ''
        ]"
          @click="handleSlotClick(slot.id)"
      >
        {{ slot.time }} <span v-if="slot.reserved">({{ slot.userName }})</span>
      </li>
    </ul>
    <div v-if="selectedSlot && !selectedSlot.reserved" class="mt-4 p-4 border rounded bg-gray-50">
      <h3 class="text-lg font-medium mb-2">Забронировать: {{ selectedSlot.time }}</h3>
      <form @submit.prevent="confirmBooking" class="space-y-2">
        <input
            type="text"
            v-model="userName"
            placeholder="Введите имя"
            required
            class="p-2 border rounded w-full"
        />
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
         Подтвердить
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useBookingStore } from '@/store/bookingStore';
import { storeToRefs } from 'pinia';

export default defineComponent({
  setup() {
    const store = useBookingStore();
    const { slots } = storeToRefs(store);
    const selectedSlotId = ref<number | null>(null);
    const userName = ref('');

    const selectedSlot = computed(() =>
        slots.value.find((slot) => slot.id === selectedSlotId.value)
    );

    const handleSlotClick = (id: number) => {
      const slot = slots.value.find((s) => s.id === id);
      if (slot && !slot.reserved) {
        selectedSlotId.value = id;
      }
    };

    const confirmBooking = () => {
      if (selectedSlot.value && userName.value) {
        store.confirmBooking(selectedSlot.value.id, userName.value);
        selectedSlotId.value = null;
        userName.value = '';
      }
    };

    return {
      slots,
      selectedSlotId,
      selectedSlot,
      userName,
      handleSlotClick,
      confirmBooking,
    };
  },
});
</script>
