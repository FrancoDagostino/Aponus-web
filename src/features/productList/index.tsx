import React, { FC } from "react";
import ProductListModule from "./module";
import useProductListHook from "./hooks/useProductList.hook";
import { useDbProductListService } from "./services/useDbProductList.service";
import useCategoryHook from "../categoryList/hooks/useDbCategory.hook";
import { useDbCategoryService } from "../categoryList/services/useDbCategory.service";

interface IProductListProps {
  onNavigate?: (url: string) => void;
}

const ProductListFeature: FC<IProductListProps> = (props) => {
  const productListHook = useProductListHook({
    dBProdcutListService: useDbProductListService(),
  });
  const categoryHook = useCategoryHook({
    dBCategoryService: useDbCategoryService(),
  });

  return (
    <ProductListModule
      productListHook={productListHook}
      categoryHook={categoryHook}
      onNavigate={props.onNavigate}
    />
  );
};

export default ProductListFeature;
