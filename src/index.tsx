import React from "react";
import ReactDOM from "react-dom/client";
import ProductListFeature from "./features/productList";
import "./style/globalStyle.css";
import { ExpandableTableProvider } from "./context/ExpandableTableProvider";
import StockListFeature from "./features/stockList";
import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ExpandableTableProvider>
        <AppRouter />
      </ExpandableTableProvider>
    </BrowserRouter>
  </React.StrictMode>
);
