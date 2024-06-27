import { Route, Routes } from "react-router-dom";
import ProductListFeature from "../features/productList";
import StockListFeature from "../features/stockList";
import CategoryListFeature from "../features/categoryList";
import ComponentAddFeature from "../features/componentAdd";
import ComponentListFeature from "../features/componentList";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductListFeature />} />
      <Route path="/stock-list" element={<StockListFeature />} />
      <Route path="/product-list" element={<ProductListFeature />} />
      <Route path="/category-list" element={<CategoryListFeature />} />
      <Route path="/component-add" element={<ComponentAddFeature />} />
      <Route path="/component-list" element={<ComponentListFeature />} />
    </Routes>
  );
};
