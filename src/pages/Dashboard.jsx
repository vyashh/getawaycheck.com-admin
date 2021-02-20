import React from "react";
import { useAuth } from "../providers/AuthProvider";

export default function Dashboard() {
  const { logout } = useAuth();
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}
