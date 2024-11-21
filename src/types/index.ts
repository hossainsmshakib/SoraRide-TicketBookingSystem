export interface Seat {
  id: string;
  isBooked: boolean;
  bookedBy?: BookingDetails;
}

export interface BookingDetails {
  name: string;
  busNo: string;
  seatNo: string;
  destination: string;
  time: string;
}

export interface Bus {
  id: string;
  number: string;
  seats: Seat[];
}

export interface SetSelectedSeatAction {
  type: string;
  payload: string;
}
