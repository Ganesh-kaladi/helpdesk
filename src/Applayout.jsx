import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import Header from "./components/Header";

function Applayout() {
  return (
    <div className="h-screen md:grid md:grid-cols-10 md:grid-rows-10">
      <div className="md:col-span-2 md:row-span-9">
        <Aside />
      </div>
      <div className="hidden md:block md:col-span-8 md:row-span-1 border-b-2 border-neutral-400">
        <Header />
      </div>
      <div className="bg-sky-50 min-h-[70vh] md:h-auto md:col-span-8 md:row-span-8 md:overflow-y-scroll">
        <Outlet />
      </div>
      <div className="md:col-span-10 md:row-span-1">
        <Footer />
      </div>
    </div>
  );
}

export default Applayout;
