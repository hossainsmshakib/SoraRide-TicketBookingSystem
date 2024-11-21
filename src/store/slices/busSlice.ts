import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bus, BookingDetails } from "../../types";
import { INITIAL_BUSES } from "../../utils/constants";

interface BusState {
  buses: Bus[];
  selectedBus: Bus | null;
  selectedSeat: string | null;
}

const initialState: BusState = {
  buses: INITIAL_BUSES,
  selectedBus: null,
  selectedSeat: null,
};

export const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    setSelectedBus(state, action: PayloadAction<string>) {
      state.selectedBus =
        state.buses.find((b) => b.id === action.payload) || null;
    },
    setSelectedSeat(state, action: PayloadAction<string>) {
      state.selectedSeat = action.payload;
    },
    bookSeat(state, action: PayloadAction<BookingDetails>) {
      const { busNo, seatNo } = action.payload;
      const bus = state.buses.find((b) => b.number === busNo);
      if (bus) {
        const seat = bus.seats.find((s) => s.id === seatNo);
        if (seat) {
          seat.isBooked = true;
          seat.bookedBy = action.payload;
          state.selectedBus = bus;
        }
      }
    },
    resetState: (state, action: PayloadAction<{ buses: Bus[] }>) => {
      state.buses = action.payload.buses;
      state.selectedBus = null;
      state.selectedSeat = null;
    },
  },
});

export const { setSelectedBus, setSelectedSeat, bookSeat, resetState } = busSlice.actions;
export default busSlice.reducer;
