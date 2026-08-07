import AppRouter from "./Router/AppRouter";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import { Toaster } from "react-hot-toast";
import  useAuthStore from "./Store/authStore";
import { useEffect } from "react";

function App() {
  const token = useAuthStore((state) => state.token);
  const fetchProfile = useAuthStore((state) => state.fetchProfile);

  useEffect(() => {
    if(token) {
      fetchProfile();
    }
  } ,[token]);

  return (
    <div className="min-h-screen bg-base-100">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-6">
          <AppRouter />
        </main>

      </div>

      <Footer />

      <Toaster position="top-right" />
    </div>
  );
}

export default App;