import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSelectedBus } from "../../store/slices/busSlice";
import { IoBusOutline } from "react-icons/io5";
import { HiChevronUpDown } from "react-icons/hi2";
import { BsCheckCircleFill } from "react-icons/bs";

interface BusSelectorProps {
  className?: string;
  label?: string;
}

const BusSelector = ({
  className = "",
  label = "Select Route",
}: BusSelectorProps) => {
  const dispatch = useDispatch();
  const buses = useSelector((state: RootState) => state.bus.buses);
  const selectedBus = useSelector((state: RootState) => state.bus.selectedBus);

  const handleBusSelect = (busId: string) => {
    dispatch(setSelectedBus(busId));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700">
          <IoBusOutline className="h-5 w-5" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        {selectedBus && (
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
            <BsCheckCircleFill className="h-3 w-3" />
            <span>Bus Selected</span>
          </div>
        )}
      </div>


      <div className="relative">
        <select
          className={`w-full appearance-none rounded-lg border-0 bg-gray-50 
                     px-4 py-3.5 text-base text-gray-900
                     ring-1 ring-inset ring-gray-200
                     focus:ring-2 focus:ring-inset focus:ring-blue-500
                     transition-all duration-200
                     hover:bg-gray-100
                     disabled:opacity-50 disabled:cursor-not-allowed
                     sm:text-sm sm:leading-6
                     ${selectedBus ? "pl-12" : "pl-4"}`}
          value={selectedBus?.id || ""}
          onChange={(e) => handleBusSelect(e.target.value)}
        >
          <option value="">Choose a bus</option>
          {buses.map((bus) => (
            <option key={bus.id} value={bus.id}>
              Bus {bus.number}
            </option>
          ))}
        </select>

        {selectedBus && (
          <div className="absolute inset-y-0 left-3 flex items-center">
            <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-100">
              <IoBusOutline className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <HiChevronUpDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {buses.length === 0 && (
        <div className="text-center py-3 text-sm text-gray-500 bg-gray-50 rounded-lg">
          No buses available at the moment
        </div>
      )}
    </div>
  );
};

export default BusSelector;
