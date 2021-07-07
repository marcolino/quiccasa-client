import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Auth from "./Auth";
// import Footer from "./Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Auth />
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
