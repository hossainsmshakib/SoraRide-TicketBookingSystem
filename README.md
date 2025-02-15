# SoraRide

SoraRide is an office bus ticket booking system that allows employees to reserve seats for daily commutes efficiently. The system includes an intuitive UI for booking, an admin panel for managing reservations, and local storage for data persistence.

## Features

### 🚀 **User Features**
- **Seat Reservation**: Employees can select and book seats for their rides.
- **Real-time Seat Availability**: Ensures users can see which seats are available before booking.
- **Mobile-Friendly Interface**: Responsive design optimized for different devices.

### 🔐 **Admin Features**
- **Seat Management**: View and manage seat allocations.
- **User Booking Data**: View reservations and reset seat data if needed.
- **Local Data Persistence**: Uses local storage to store booking details.

## 🛠️ **Tech Stack**
- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: Redux
- **Routing**: React Router
- **Icons**: React Icons
- **Notifications**: React Toastify

## 📂 **Project Structure**
```
/soraride
├── /src
│   ├── /components
│   │   ├── Navbar.tsx
│   ├── /pages
│   │   ├── SeatUI.tsx
│   │   ├── BookingForm.tsx
│   │   ├── AdminPanel.tsx
│   ├── /utils
│   │   ├── localStorage.ts
│   ├── App.tsx
│   ├── main.tsx
│
├── package.json
├── README.md
```

## ⚙️ **Installation & Setup**
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/soraride.git
   ```
2. Navigate to the project directory:
   ```sh
   cd soraride
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open `http://localhost:5173/` in your browser.

## 🏗️ **Usage**
1. **Booking Seats**: Select available seats on the homepage and confirm your reservation.
2. **Admin Panel**: Navigate to `/admin` to manage bookings.
3. **Reset Data**: Admins can clear all bookings in development mode.

## 🔧 **Customization**
- Modify `Navbar.tsx` to adjust branding.
- Update `SeatUI.tsx` to customize seat layouts.
- Change Tailwind styles in `index.css`.

## 📜 **License**
MIT License. See `LICENSE` for details.

## ✉️ **Contact**
For support, reach out at [your.email@example.com](mailto:your.email@example.com).

