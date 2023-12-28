import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Default = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Default;
