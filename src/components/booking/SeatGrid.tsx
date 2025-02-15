import { Seat } from "../../types";

interface SeatGridProps {
  seats: Seat[];
  onSeatClick: (seat: Seat) => void;
  isAdminView?: boolean;
}

const SeatGrid = ({ seats, onSeatClick, isAdminView = false }: SeatGridProps) => {
  const handleClick = (seat: Seat) => {
    if (isAdminView) {
      onSeatClick(seat);
      return;
    }
    onSeatClick(seat);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {seats.map((seat) => (
        <button
          key={seat.id}
          onClick={() => handleClick(seat)}
          className={`
            w-16 h-16 rounded-lg flex items-center justify-center
            ${seat.isBooked 
              ? 'bg-gray-400 text-white' 
              : 'bg-white border-2 border-gray-200 hover:border-blue-500'
            }
            ${isAdminView ? 'cursor-pointer' : seat.isBooked ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <span className="text-sm font-medium">{seat.id}</span>
        </button>
      ))}
    </div>
  );
};

export default SeatGrid;
