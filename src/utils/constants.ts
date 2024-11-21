export const DESTINATIONS = [
  "Mirpur 11",
  "Mirpur 10",
  "Dhanmondi",
  "Gulshan",
  "Banani",
];

export const TIME_SLOTS = ["8:00 AM", "9:00 AM", "5:00 PM", "6:00 PM"];

const createBusSeats = () =>
  [
    "A1",
    "A2",
    "A3",
    "B1",
    "B2",
    "B3",
    "C1",
    "C2",
    "C3",
    "D1",
    "D2",
    "D3",
    "E1",
    "E2",
    "E3",
  ].map((id) => ({
    id,
    isBooked: false,
  }));

export const INITIAL_BUSES = [
  {
    id: "1",
    number: "S098",
    seats: createBusSeats(),
  },
  {
    id: "2",
    number: "S099",
    seats: createBusSeats(),
  },
  {
    id: "3",
    number: "S100",
    seats: createBusSeats(),
  },
];
