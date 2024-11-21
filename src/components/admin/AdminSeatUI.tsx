import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Seat } from '../../types';
import SeatGrid from '../booking/SeatGrid';
import Modal from '../common/Modal';
import SeatDetails from '../booking/SeatDetails';
import { MdEventSeat } from 'react-icons/md';

const AdminSeatUI = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const selectedBus = useSelector((state: RootState) => state.bus.selectedBus);

  const handleSeatClick = (seat: Seat) => {
    setSelectedSeat(seat);
    setShowDetailsModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-800">
            Bus #{selectedBus?.number} - Seat Management
          </h2>
        </div>

        {/* Seat Grid */}
        <div className="flex justify-center">
          <SeatGrid 
            seats={selectedBus?.seats || []} 
            onSeatClick={handleSeatClick}
            isAdminView={true}
          />
        </div>

        {/* Modal */}
        <Modal 
          isOpen={showDetailsModal} 
          onClose={() => setShowDetailsModal(false)}
          title={
            <div className="flex items-center gap-2">
              <MdEventSeat className="h-4 w-4 text-blue-600" />
              <span>
                {selectedSeat?.isBooked ? 'Booking Details' : 'Available Seat'}
              </span>
            </div>
          }
        >
          {selectedSeat?.isBooked && selectedSeat.bookedBy ? (
            <SeatDetails booking={selectedSeat.bookedBy} />
          ) : (
            <div className="p-4">
              <div className="text-center">
                <div className="mb-3">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <MdEventSeat className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Seat {selectedSeat?.id}
                </h3>
                <p className="text-sm text-gray-600">
                  This seat is available for booking
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Status</span>
                      <p className="font-medium text-green-600">Available</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Seat Type</span>
                      <p className="font-medium text-gray-900">Regular</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AdminSeatUI; 