import { FC, ReactNode, createContext, useContext, useState } from "react";
import useProductListHook from "../features/productList/hooks/useProductList.hook";
import { useDbProductListService } from "../features/productList/services/useDbProductList.service";
import { IStockFormateado } from "../features/productList/model/ProductComponentList.model";
import useCategoryHook from "../features/categoryList/hooks/useDbCategory.hook";
import { IUpdateDescriptionPost, useDbCategoryService } from "../features/categoryList/services/useDbCategory.service";
import {
  IListadoCategorias,
  IListadoDescripciones,
} from "../features/categoryList/model/category.model";

interface ExpandableTableContextProps {
  componentList: IStockFormateado[];
  handleSelectProductId: (idProduct: string, quantity: number) => void;
  handleSelectListDescription: (
    idType: string
  ) => Promise<IListadoDescripciones[]>;
  handlAddOrUpdateDescription: (description: string, idType: string) => void;
  handleUpdateDescription: (idDescription: number, description: string) => void;
}

const ExpandableTableContext = createContext<ExpandableTableContextProps>({
  componentList: [],
  handleSelectProductId: () => { },
  handleSelectListDescription: () => {
    return new Promise<IListadoDescripciones[]>((resolve) => {
      resolve([]);
    });
  },
  handlAddOrUpdateDescription: () => { },
  handleUpdateDescription: () => { },
});

interface ExpandableTableProviderProps {
  children: ReactNode;
}

export const ExpandableTableProvider: FC<ExpandableTableProviderProps> = (
  props
) => {
  const [componentList, setComponentList] = useState<IStockFormateado[]>([]);

  const productListHook = useProductListHook({
    dBProdcutListService: useDbProductListService(),
  });

  const categoryHook = useCategoryHook({
    dBCategoryService: useDbCategoryService(),
  });

  const handleSelectProductId = async (idProduct: string, quantity: number) => {
    const response = await productListHook.getDbProductComponentAction(
      idProduct,
      quantity
    );
    setComponentList(response);
  };

  const handleSelectListDescription = async (idType: string) => {
    const response = await categoryHook.getDescriptionListAction(idType);
    return response;
  };

  const handlAddOrUpdateDescription = async (
    description: string,
    idType: string
  ) => {
    categoryHook.AddDescriptionAction(description, idType);
  };

  const handleUpdateDescription = async (idDescription: number, description: string) => {

    const response = await categoryHook.UpdateDescriptionAction(idDescription, description);
  }
  return (
    <ExpandableTableContext.Provider
      value={{
        componentList,
        handleSelectProductId,
        handleSelectListDescription,
        handlAddOrUpdateDescription,
        handleUpdateDescription
      }}
    >
      {props.children}
    </ExpandableTableContext.Provider>
  );
};

export const useExpandableTableContext = () => {
  const context = useContext(ExpandableTableContext);
  if (!context) {
    throw new Error(
      "useProductoContext must be used within a ProductoProvider"
    );
  }
  return context;
};
