import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { initializeLocalStorage } from "./utils/localStorage";
import Navbar from "./components/common/Navbar";
import AdminPanel from "./pages/AdminPanel";
import SeatUI from "./pages/SeatUI";
import BookingForm from "./pages/BookingForm";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  initializeLocalStorage();

  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 pt-16 overflow-hidden">
          <Routes>
            <Route path="/" element={<SeatUI />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/seats" element={<SeatUI />} />
          </Routes>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
