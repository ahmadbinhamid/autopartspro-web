import { Outlet } from "react-router-dom";
import { Navbar } from "@/sections/Navbar";
import { Footer } from "@/sections/Footer";
import { LiveChat } from "@/components/chat/LiveChat";

export function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <LiveChat />
    </>
  );
}
