import { FC } from "react";
import useStockHook from "./hooks/useStock.hook";
import { useDbStockListService } from "./services/useDbStockList.service";
import StockListModule from "./module";
import useProductListHook from "../productList/hooks/useProductList.hook";
import { useDbProductListService } from "../productList/services/useDbProductList.service";
import { useDbCategoryService } from "../categoryList/services/useDbCategory.service";
import useCategoryHook from "../categoryList/hooks/useDbCategory.hook";

interface IStock {
  onNavigate?: (url: string) => void;
}

const StockListFeature: FC<IStock> = (props) => {
  const stockHook = useStockHook({
    useDbStockListService: useDbStockListService(),
  });
  const productListHook = useProductListHook({
    dBProdcutListService: useDbProductListService(),
  });
  const categoryHook = useCategoryHook({
    dBCategoryService: useDbCategoryService(),
  });

  return (
    <StockListModule
      stockHook={stockHook}
      onNavigate={props.onNavigate}
      categoryHook={categoryHook}
      productListHook={productListHook}
    />
  );
};
export default StockListFeature;
