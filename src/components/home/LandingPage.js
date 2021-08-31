import React from "react";
import Header from "../../layout/header/Header";
import ManageProdList from '../managements/productManagement/ManageProdList'
import Home from "./Home";

function LandingPage() {
  return (
    <div>
      <Header></Header>
      <Home></Home>
    </div>
  );
}

export default LandingPage;
