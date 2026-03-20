import { Outlet } from 'react-router-dom';
import MalfiNavbar from './MalfiNavbar';
import MalfiFooter from './MalfiFooter';
import MobileBottomNav from './MobileBottomNav';

export default function MalfiLayout() {
  return (
    <div className="min-h-screen bg-bg-primary" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <MalfiNavbar />
      <main>
        <Outlet />
      </main>
      <MalfiFooter />
      {/* Mobile bottom nav spacer */}
      <div className="h-20 md:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }} />
      <MobileBottomNav />
    </div>
  );
}