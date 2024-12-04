<template>
  <div
    v-if="bookedSlots && bookedSlots.length"
    class="mt-6 p-4 border rounded bg-white shadow"
  >
    <h2 class="text-xl font-semibold mb-4">Забронированные слоты</h2>
    <ul class="space-y-2">
      <li
        v-for="slot in bookedSlots"
        :key="slot.id"
        class="p-2 border rounded bg-gray-50"
      >
        <strong>Слот:</strong> {{ slot.time }} <br />
        <strong>Имя :</strong> {{ slot.userName }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useBookingStore } from "@/store/bookingStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const store = useBookingStore();
    const { bookedSlots } = storeToRefs(store); // Реактивно подключаем массив

    return {
      bookedSlots,
    };
  },
});
</script>
