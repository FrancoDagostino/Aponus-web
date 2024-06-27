import { useState } from "react";
import { IDbProductListService } from "../services/useDbProductList.service";
import { IListadoProducto } from "../model/productList.model";
import { IStockFormateado } from "../model/ProductComponentList.model";
import { componentProductMapper } from "../mappers/componentProduct";

export interface IProductListHook {
  productList: IListadoProducto[];
  componentList: IStockFormateado[];
  getProductListAction: (idTipo: string) => Promise<void>;
  getProductListForTypeAndDescriptionAction: (
    idTipo: string,
    idDescription: string
  ) => Promise<void>;
  getDbProductComponentAction: (
    idProduct: string,
    quantity: number
  ) => Promise<IStockFormateado[]>;
}

interface IProductListHookProps {
  dBProdcutListService: IDbProductListService;
}

const useProductListHook = (props: IProductListHookProps): IProductListHook => {
  const [productList, setProductList] = useState<IListadoProducto[]>([]);

  const [componentList, setComponentList] = useState<IStockFormateado[]>([]);

  const getProductListAction: IProductListHook["getProductListAction"] = async (
    idTipo: string
  ) => {
    const response = await props.dBProdcutListService.getDbProductList(idTipo);
    setProductList(response);
  };

  const getProductListForTypeAndDescriptionAction: IProductListHook["getProductListForTypeAndDescriptionAction"] =
    async (idTipo: string, idDescription: string) => {
      const response =
        await props.dBProdcutListService.getDbProductListForTypeAndDescription(
          idTipo,
          idDescription
        );
      setProductList(response);
    };

  const getDbProductComponentAction: IProductListHook["getDbProductComponentAction"] =
    async (idProduct: string, quantity: number) => {
      const response = await props.dBProdcutListService.getDbProductComponent(
        idProduct,
        quantity
      );
      const formattedResponse = componentProductMapper(response);
      setComponentList(formattedResponse);
      return formattedResponse;
    };

  return {
    productList,
    componentList,
    getProductListAction,
    getProductListForTypeAndDescriptionAction,
    getDbProductComponentAction,
  };
};

export default useProductListHook;
