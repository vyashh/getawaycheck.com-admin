import React from "react";
import NavBar from "../../components/navbar/navbar.component";
import SideBar from "../../components/sidebar/sidebar.component";

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <SideBar activeNav="1">
        <div className="h-100 row align-items-center text-center">
          <div className="col">Article Edit</div>
        </div>
      </SideBar>
    </>
  );
}
