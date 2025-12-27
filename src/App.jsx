import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { useState } from "react";

// Pages
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";
import Payments from "./features/payments/Payments";
import Settings from "./features/settings/Settings";

// Product pages
import AddMensProducts from "./features/products/men/AddMen";
import ManageMensProducts from "./features/products/men/ManageMen";

import AddWomen from "./features/products/women/AddWomen";
import ManageWomensProducts from "./features/products/women/ManageWomen";

// Category pages
import AddSubCategory from "./features/categories/sub/AddSubCategory";
import EditSubCategory from "./features/categories/sub/EditSubCategory";
import ListSubCategory from "./features/categories/sub/ListSubCategory";
import AddMainCategory from "./features/categories/main/AddMainCategory";
import EditMainCategory from "./features/categories/main/EditMainCategory";
import ListMainCategory from "./features/categories/main/ListMainCategory";

// Order pages
import Manageorders from "./features/orders/Manageorders";
// import WomensOrders from './features/orders/Womens';

// User pages
import ManageCustomers from "./features/users/Manage";

//offer pages
import Offers from "./features/offers/Offers";

//feedback page
import Feedback from "./features/Feedback/Feedback";
// import AddWomen from './features/products/women/AddWomen';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                />
                <div className="flex-1 ml-72" id="main-content">
                  <Topbar onMenuToggle={toggleSidebar} />
                  <main className="min-h-screen bg-gray-50">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      {/* Product Routes */}
                      <Route
                        path="/products/men/add"
                        element={<AddMensProducts />}
                      />
                      <Route
                        path="/products/men/manage"
                        element={<ManageMensProducts />}
                      />
                      <Route
                        path="/products/women/add"
                        element={<AddWomen />}
                      />
                      <Route
                        path="/products/women/manage"
                        element={<ManageWomensProducts />}
                      />
                      {/* Category Routes */}
                      <Route
                        path="/categories/sub/add"
                        element={<AddSubCategory />}
                      />
                      <Route
                        path="/categories/sub/edit/:id"
                        element={<EditSubCategory />}
                      />
                      <Route
                        path="/categories/sub/manage"
                        element={<ListSubCategory />}
                      />
                      <Route
                        path="/categories/main/add"
                        element={<AddMainCategory />}
                      />
                      <Route
                        path="/categories/main/edit/:id"
                        element={<EditMainCategory />}
                      />
                      <Route
                        path="/categories/main/manageCategory"
                        element={<ListMainCategory />}
                      />
                      {/* Order Routes */}
                      <Route path="/orders/Manage" element={<Manageorders />} />
                      {/* <Route path="/orders/women" element={<WomensOrders />} /> */}
                      {/* User Routes */}
                      <Route
                        path="/users/manage"
                        element={<ManageCustomers />}
                      />
                      {/* offer Routes */}.
                      <Route path="/offers" element={<Offers />} />
                      {/* Other Routes */}
                      <Route path="/Feedback" element={<Feedback />} />
                      <Route path="/payments" element={<Payments />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
