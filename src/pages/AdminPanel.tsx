import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import BusSelector from "../components/common/BusSelector";
import { toast } from "react-toastify";
import { MdDirectionsBus, MdEventSeat, MdPeople } from "react-icons/md";
import { FaBus } from "react-icons/fa";

const AdminPanel = () => {
  const navigate = useNavigate();
  const selectedBus = useSelector((state: RootState) => state.bus.selectedBus);
  const allBuses = useSelector((state: RootState) => state.bus.buses);

  const totalBuses = allBuses.length;
  const totalSeats = allBuses.reduce((acc, bus) => acc + bus.seats.length, 0);
  const totalBookings = allBuses.reduce(
    (acc, bus) => acc + bus.seats.filter((seat) => seat.isBooked).length,
    0
  );

  const handleViewDetails = () => {
    if (!selectedBus) {
      toast.error("Please select a bus first");
      return;
    }
    navigate("/admin/seats");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Total Buses */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Buses</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalBuses}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                <FaBus className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-gray-400">Fleet Overview</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Seats</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalSeats}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                <MdEventSeat className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-gray-400">Seat Capacity</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {totalBookings}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center">
                <MdPeople className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-gray-400">
                Current Reservations
              </span>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900">
              Bus Management
            </h2>
          </div>

          <div className="p-4 space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Bus to Manage
              </label>
              <BusSelector />
            </div>

            {selectedBus && (
              <button
                onClick={handleViewDetails}
                className="w-full flex items-center justify-center px-4 py-2 
                         bg-blue-600 hover:bg-blue-700 
                         text-white rounded-lg transition-colors"
              >
                <MdDirectionsBus className="h-5 w-5 mr-2" />
                <span>Bus #{selectedBus.number}</span>
              </button>
            )}
          </div>


          {selectedBus && (
            <div className="px-4 pb-4">
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-500">Available Seats:</span>
                    <span className="ml-2 font-medium text-green-600">
                      {
                        selectedBus.seats.filter((seat) => !seat.isBooked)
                          .length
                      }
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Booked Seats:</span>
                    <span className="ml-2 font-medium text-blue-600">
                      {selectedBus.seats.filter((seat) => seat.isBooked).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
