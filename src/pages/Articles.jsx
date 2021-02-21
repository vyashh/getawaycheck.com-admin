import React from "react";
import NavBar from "../components/navbar/navbar.component";
import SideBar from "../components/sidebar/sidebar.component";
import Footer from "../components/footer/footer.component";

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <SideBar activeNav="1">
        <div className="h-100 row align-items-center text-center">
          <div className="col">Articles</div>
        </div>
      </SideBar>
      <Footer />
    </>
  );
}
