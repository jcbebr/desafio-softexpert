import React, { useState } from "react";
import HomeTab from "./Tabs/HomeTab";
import UserTab from "./Tabs/UserTab";
import ProductTab from "./Tabs/ProductTab";
import SaleTab from "./Tabs/SaleTab";
import LoginTab from "./Tabs/LoginTab";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  var tabs = new Map([
    ['tab1', <HomeTab />],
    ['tab2', <UserTab />],
    ['tab3', <ProductTab />],
    ['tab4', <SaleTab />],
    ['tab5', <LoginTab />],
  ])

  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  
    const handleTab2 = () => {
      setActiveTab("tab2");
    };
  
    const handleTab3 = () => {
      setActiveTab("tab3");
    };
  
    const handleTab4 = () => {
      setActiveTab("tab4");
    };

    const handleTab5 = () => {
      setActiveTab("tab5");
    };
  
  const handleTabsState = () => {
    return tabs.get(activeTab)
  };

  return (
    <div className="Tabs">
      <ul className="nav">
        <li
          className={activeTab === "tab1" ? "active" : ""}
          onClick={handleTab1}
        >
          Início
        </li>
        <li
          className={activeTab === "tab2" ? "active" : ""}
          onClick={handleTab2}
        >
          Usuários
        </li>
        <li
          className={activeTab === "tab3" ? "active" : ""}
          onClick={handleTab3}
        >
          Produtos
        </li>
        <li
          className={activeTab === "tab4" ? "active" : ""}
          onClick={handleTab4}
        >
          Carrinho
        </li>
        <li
          className={activeTab === "tab5" ? "active" : ""}
          onClick={handleTab5}
        >
          Login
        </li>
      </ul>
      <div className="outlet">
        {handleTabsState()}
      </div>
    </div>
  );
};
export default Tabs;