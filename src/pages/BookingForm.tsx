import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookSeat } from "../store/slices/busSlice";
import { toast } from "react-toastify";
import { DESTINATIONS, TIME_SLOTS } from "../utils/constants";
import { FaUserAlt, FaBus, FaRegClock } from "react-icons/fa";
import { MdEventSeat, MdLocationOn } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { busNo, seatNo } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    busNo: busNo || "",
    seatNo: seatNo || "",
    destination: "",
    time: "",
  });

  useEffect(() => {
    if (!busNo || !seatNo) {
      toast.error("Please select a seat first");
      navigate("/");
    }
  }, [busNo, seatNo, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.destination || !formData.time) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      dispatch(bookSeat(formData));
      toast.success(`Seat ${seatNo} booked successfully!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/");
    } catch (error) {
      toast.error("Failed to book seat. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MdEventSeat className="h-6 w-6" />
              Book Your Seat
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaUserAlt className="h-4 w-4 text-blue-500" />
                Passenger Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaBus className="h-4 w-4 text-blue-500" />
                  Bus Number
                </label>
                <input
                  type="text"
                  value={formData.busNo}
                  disabled
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MdEventSeat className="h-4 w-4 text-blue-500" />
                  Seat Number
                </label>
                <input
                  type="text"
                  value={formData.seatNo}
                  disabled
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <MdLocationOn className="h-4 w-4 text-blue-500" />
                Destination
              </label>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select destination</option>
                {DESTINATIONS.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaRegClock className="h-4 w-4 text-blue-500" />
                Time Slot
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select time slot</option>
                {TIME_SLOTS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <IoMdSave className="h-5 w-5" />
                <span>Book Seat</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ImCancelCircle className="h-5 w-5" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
