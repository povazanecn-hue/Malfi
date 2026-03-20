import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { CartProvider } from '@/lib/CartContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Layout imports
import AdminLayout from '@/components/layout/AdminLayout';
import MalfiLayout from '@/components/malfi/MalfiLayout';
import MalfiAdminLayout from '@/components/malfi/admin/MalfiAdminLayout';

// Admin pages
import Admin from '@/pages/Admin';
import AdminOrders from '@/pages/AdminOrders';
import AdminReservations from '@/pages/AdminReservations';
import AdminMenu from '@/pages/AdminMenu';
import AdminProducts from '@/pages/AdminProducts';

// MALFI pages
import MalfiHome from '@/pages/MalfiHome';
import MalfiMenu from '@/pages/MalfiMenu';
import MalfiOrder from '@/pages/MalfiOrder';
import MalfiCheckout from '@/pages/MalfiCheckout';
import MalfiOrderSuccess from '@/pages/MalfiOrderSuccess';
import MalfiReservation from '@/pages/MalfiReservation';
import MalfiAbout from '@/pages/MalfiAbout';
import MalfiContact from '@/pages/MalfiContact';
import MalfiAdmin from '@/pages/MalfiAdmin';
import PasswordGate from '@/components/malfi/PasswordGate';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      {/* Redirect root to MALFI home */}
      <Route path="/" element={<Navigate to="/MalfiHome" replace />} />

      {/* MALFI public routes */}
      <Route element={<MalfiLayout />}>
        <Route path="/MalfiHome" element={<MalfiHome />} />
        <Route path="/Menu" element={<MalfiMenu />} />
        <Route path="/Order" element={<MalfiOrder />} />
        <Route path="/Checkout" element={<MalfiCheckout />} />
        <Route path="/OrderSuccess" element={<MalfiOrderSuccess />} />
        <Route path="/Reservation" element={<MalfiReservation />} />
        <Route path="/About" element={<MalfiAbout />} />
        <Route path="/Contact" element={<MalfiContact />} />
      </Route>

      {/* Admin */}
      <Route element={<MalfiAdminLayout />}>
        <Route path="/MalfiAdmin" element={<MalfiAdmin />} />
      </Route>

      {/* Legacy Admin routes */}
      <Route element={<AdminLayout />}>
        <Route path="/Admin" element={<Admin />} />
        <Route path="/AdminOrders" element={<AdminOrders />} />
        <Route path="/AdminReservations" element={<AdminReservations />} />
        <Route path="/AdminMenu" element={<AdminMenu />} />
        <Route path="/AdminProducts" element={<AdminProducts />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <CartProvider>
          <Router>
            <PasswordGate>
              <AuthenticatedApp />
            </PasswordGate>
          </Router>
            <Toaster />
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App