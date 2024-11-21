import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setSelectedSeat } from "../store/slices/busSlice";
import SeatGrid from "../components/booking/SeatGrid";
import Modal from "../components/common/Modal";
import SeatDetails from "../components/booking/SeatDetails";
import BusSelector from "../components/common/BusSelector";
import { Seat } from "../types";
import { FaClock, FaBus, FaMapMarkerAlt } from "react-icons/fa";
import {
  MdAirlineSeatReclineNormal,
  MdEventSeat,
  MdDirectionsBus,
} from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";
import { toast } from "react-toastify";

const SeatUI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedBus = useSelector((state: RootState) => state.bus.selectedBus);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSeatState, setSelectedSeatState] = useState<Seat | null>(null);

  const isAdminView = location.pathname.includes('/admin');

  const handleSeatClick = (seat: Seat) => {
    setSelectedSeatState(seat);

    if (isAdminView) {
      setShowDetailsModal(true);
    } else {

      if (seat.isBooked) {
        setShowDetailsModal(true);
      } else {
        dispatch(setSelectedSeat(seat.id));
        navigate("/booking", {
          state: {
            busNo: selectedBus?.number,
            seatNo: seat.id,
          },
        });
      }
    }
  };

  const renderModalContent = () => {
    if (!selectedSeatState) return null;

    if (selectedSeatState.isBooked) {
      if (isAdminView && selectedSeatState.bookedBy) {
        return <SeatDetails booking={selectedSeatState.bookedBy} />;
      } else {
        return (
          <div className="p-4">
            <div className="text-center">
              <div className="mb-3">
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <MdEventSeat className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Seat {selectedSeatState.id} is Already Booked
              </h3>
              <div className="bg-red-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-800 font-medium">
                  Please select another available seat
                </p>
              </div>
            </div>
          </div>
        );
      }
    } else if (isAdminView) {
      return (
        <div className="p-4">
          <div className="text-center">
            <div className="mb-3">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <MdEventSeat className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Seat {selectedSeatState?.id}
            </h3>
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-800 font-medium">
                This seat is available for booking
              </p>
            </div>
            <div className="text-left bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Seat Details:
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium text-green-600">
                    Available
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Seat Number:</span>
                  <span className="font-medium">{selectedSeatState?.id}</span>
                </li>
                <li className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">Regular</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const totalSeats = selectedBus?.seats.length || 0;
  const bookedSeats =
    selectedBus?.seats.filter((seat) => seat.isBooked).length || 0;
  const availableSeats = totalSeats - bookedSeats;

  return (
    <div className="h-screen bg-gray-50 p-4">
      <div className="h-full max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/5 p-4">
            <div className="h-full flex flex-col gap-3">
              <div className="bg-white rounded-lg shadow-sm p-3">
                <BusSelector />
              </div>

              {selectedBus ? (
                <div className="flex-1 bg-white rounded-lg shadow-sm p-3">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                      <h2 className="text-base font-medium text-gray-800 flex items-center gap-2">
                        <MdDirectionsBus className="h-4 w-4 text-blue-600" />
                        Bus #{selectedBus.number}
                      </h2>
                      <span className="text-sm text-gray-500">AC</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaClock className="h-3.5 w-3.5 text-blue-600" />
                        <span className="text-sm">8:00 AM</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaMapMarkerAlt className="h-3.5 w-3.5 text-blue-600" />
                        <span className="text-sm">Mirpur 10 → Dhanmondi</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-blue-50/50 rounded p-2 text-center">
                        <p className="text-lg font-semibold text-blue-600">
                          {totalSeats}
                        </p>
                        <span className="text-xs text-gray-600">Total</span>
                      </div>
                      <div className="bg-green-50/50 rounded p-2 text-center">
                        <p className="text-lg font-semibold text-green-600">
                          {availableSeats}
                        </p>
                        <span className="text-xs text-gray-600">Available</span>
                      </div>
                      <div className="bg-red-50/50 rounded p-2 text-center">
                        <p className="text-lg font-semibold text-red-600">
                          {bookedSeats}
                        </p>
                        <span className="text-xs text-gray-600">Booked</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="bg-gray-50 rounded p-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-white border-2 rounded"></div>
                            <span className="text-xs text-gray-600">
                              Available
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-400 border-2 rounded"></div>
                            <span className="text-xs text-gray-600">
                              Booked
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-100 border-2 border-blue-500 rounded"></div>
                            <span className="text-xs text-gray-600">
                              Selected
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdEventSeat className="h-4 w-4 text-blue-600" />
                            <span className="text-xs text-gray-600">
                              Click to Book
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 bg-white rounded-lg shadow-sm p-4 flex items-center justify-center">
                  <div className="text-center">
                    <BsInfoCircleFill className="h-6 w-6 text-blue-600/20 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Select a bus</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-3/5 p-4">
            <div className="bg-white rounded-lg shadow-sm p-4 h-full">
              {selectedBus ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-medium text-gray-800 flex items-center gap-2">
                      <MdEventSeat className="h-4 w-4 text-blue-600" />
                      Select Your Seat
                    </h2>
                  </div>

                  <div className="flex justify-center mb-4">
                    <div className="bg-gray-50 rounded px-3 py-1.5 flex items-center gap-2">
                      <GiSteeringWheel className="h-4 w-4 text-gray-600" />
                      <span className="text-xs text-gray-600">Driver</span>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <SeatGrid
                      seats={selectedBus.seats}
                      onSeatClick={handleSeatClick}
                    />
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <BsInfoCircleFill className="h-6 w-6 text-blue-600/20 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Please select a bus</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title={
          <div className="flex items-center gap-2">
            <MdEventSeat className="h-4 w-4 text-blue-600" />
            <span>
              {isAdminView ? 'Seat Information' : 
                (selectedSeatState?.isBooked ? 'Seat Unavailable' : 'Seat Details')}
            </span>
          </div>
        }
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default SeatUI;
