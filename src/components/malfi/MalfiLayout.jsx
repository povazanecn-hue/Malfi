import { Outlet } from 'react-router-dom';
import MalfiNavbar from './MalfiNavbar';
import MalfiFooter from './MalfiFooter';

export default function MalfiLayout() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <MalfiNavbar />
      <main>
        <Outlet />
      </main>
      <MalfiFooter />
      {/* Mobile bottom bar spacer */}
      <div className="h-16 md:hidden" />
    </div>
  );
}