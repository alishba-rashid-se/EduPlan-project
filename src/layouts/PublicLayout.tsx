import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ToastContainer from '../components/Toast';

export default function PublicLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
}
