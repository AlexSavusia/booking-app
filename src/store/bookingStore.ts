import { defineStore } from 'pinia';

interface Slot {
    id: number;
    time: string;
    reserved: boolean;
    userName?: string; // Имя пользователя для забронированных слотов
}

interface BookingState {
    slots: Slot[];
    selectedSlot: Slot | null;
    userName: string;
    bookedSlots: Slot[];
}

export const useBookingStore = defineStore('bookingStore', {
    state: (): BookingState => ({
        slots: [], // Изначально пустой массив, будет генерироваться
        selectedSlot: null,
        userName: '',
        bookedSlots: [],
    }),
    actions: {
        generateSlots(startTime: string, interval: number, count: number) {
            const slots: Slot[] = [];
            let [hours, minutes] = startTime.split(':').map(Number);

            for (let i = 0; i < count; i++) {
                const endMinutes = minutes + interval;
                const endHours = hours + Math.floor(endMinutes / 60);
                const formattedStart = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                const formattedEnd = `${String(endHours).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`;
                slots.push({
                    id: i + 1,
                    time: `${formattedStart} - ${formattedEnd}`,
                    reserved: false,
                });
                hours = endHours;
                minutes = endMinutes % 60;
            }

            this.slots = slots;
        },
        selectSlot(slotId: number) {
            const slot = this.slots.find((s) => s.id === slotId);
            if (slot && !slot.reserved) {
                this.selectedSlot = slot;
            }
        },
        confirmBooking(name: string) {
            if (this.selectedSlot) {
                this.selectedSlot.reserved = true;
                this.selectedSlot.userName = name;
                this.bookedSlots.push({ ...this.selectedSlot });
                this.selectedSlot = null;
                this.userName = '';
            }
        },
    },
});
