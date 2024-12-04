import { defineStore } from "pinia";

export interface Slot {
  id: number;
  time: string;
  reserved: boolean;
  userName?: string;
}

interface BookingState {
  slots: Slot[];
  bookedSlots: Slot[]; // Добавлено состояние для хранения забронированных слотов
}

export const useBookingStore = defineStore("bookingStore", {
  state: (): BookingState => ({
    slots: [
      { id: 1, time: "10:00 - 11:00", reserved: false },
      { id: 2, time: "11:00 - 12:00", reserved: false },
      { id: 3, time: "12:00 - 13:00", reserved: false },
    ],
    bookedSlots: [], // Изначально массив пустой
  }),
  actions: {
    confirmBooking(slotId: number, userName: string) {
      const slot = this.slots.find((s) => s.id === slotId);
      if (slot && !slot.reserved) {
        slot.reserved = true;
        slot.userName = userName;
        this.bookedSlots.push(slot); // Добавляем слот в массив забронированных
      }
    },
  },
});
