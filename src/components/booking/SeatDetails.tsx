import { BookingDetails } from "../../types";

interface SeatDetailsProps {
  booking: BookingDetails;
  isReadOnly?: boolean;
}

const SeatDetails: React.FC<SeatDetailsProps> = ({
  booking,
  isReadOnly = false,
}) => {
  return (
    <div className="p-4">
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500">Passenger Name</label>
          <p className="font-medium">{booking.name}</p>
        </div>
      </div>
    </div>
  );
};

export default SeatDetails;
