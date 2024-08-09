'use client';

import Navbar from "./Navbar";
import { AuthContextProvider } from "../context/AuthContext";

export default function ClientWrapper({ children }) {
  return (
    <AuthContextProvider>
      <Navbar />
      {children}
    </AuthContextProvider>
  );
}
