import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Tourpackages from "./pages/Tourpackages";
import Customers from "./pages/Customers";
import Payments from "./pages/Payments";
import Users from "./pages/Users"
import Tourschedules from "./pages/Tourschedules";
import Reviews from "./pages/Reviews";
import Notifications from "./pages/Notifications";
import Bookingtravelers from "./pages/Bookingtravelers";
import Bookingaddons from "./pages/Bookingaddons";
import Addons from "./pages/Addons";





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/tourpackages" element={<Tourpackages />} />
          <Route path="/customers" element={<Customers />} />
           <Route path="/payments" element={<Payments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tourschedules" element={<Tourschedules />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/bookingtravelers" element={<Bookingtravelers  />} />
          <Route path="/bookingaddons" element={<Bookingaddons  />} />
          <Route path="/addons" element={<Addons  />} />



           
          
  
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;