import { Bus } from "../types";
import { INITIAL_BUSES } from "./constants";

export const initializeLocalStorage = () => {
  if (!localStorage.getItem("buses")) {
    localStorage.setItem("buses", JSON.stringify(INITIAL_BUSES));
  }
};

export const getBusesFromStorage = (): Bus[] => {
  const buses = localStorage.getItem("buses");
  return buses ? JSON.parse(buses) : INITIAL_BUSES;
};

export const saveBusesToStorage = (buses: Bus[]): void => {
  localStorage.setItem("buses", JSON.stringify(buses));
};
