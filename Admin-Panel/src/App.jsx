import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Tourpackages from "./pages/Tourpackages";
import Customers from "./pages/Customers";
import Payments from "./pages/Payments";



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
          
  
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;