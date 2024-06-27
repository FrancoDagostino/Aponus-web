import { useState } from "react";
import {
  IEspecificaciones,
  IPostUpdateStock,
  IStockProductList,
  IStockTypes,
} from "../model/stockList.model";
import { IDbStockListService } from "../services/useDbStockList.service";
import { getSpecificationsStock } from "../mappers/especifications";
import { IListadoProducto } from "../../productList/model/productList.model";

export interface IStockHook {
  categoryTypeList: IStockTypes[];
  stockListForDescription: IEspecificaciones[];
  productList: IStockProductList[];
  getStockTypeListAction: () => Promise<void>;
  getDbStockListForDescriptionAction: (idDescription: string) => Promise<void>;
  postDbUpdateStockAction: (newStock: IPostUpdateStock) => Promise<void>;
  getStockProductListAction: (idTipo: string) => Promise<void>;
  getStockProductListForTypeAndDescriptionAction: (
    idTipo: string,
    idDescription: string
  ) => Promise<void>;
}

interface IStockHookProps {
  useDbStockListService: IDbStockListService;
}

const useStockHook = (props: IStockHookProps): IStockHook => {
  const [categoryTypeList, setCategoryTypeList] = useState<IStockTypes[]>([]);
  const [stockListForDescription, setStockListForDescription] = useState<
    IEspecificaciones[]
  >([]);
  const [productList, setProductList] = useState<IStockProductList[]>([]);

  const getStockTypeListAction: IStockHook["getStockTypeListAction"] =
    async () => {
      const response =
        await props.useDbStockListService.getDbStockTypeListAll();
      setCategoryTypeList(response);
    };

  const getDbStockListForDescriptionAction: IStockHook["getDbStockListForDescriptionAction"] =
    async (idDescription: string) => {
      const response =
        await props.useDbStockListService.getDbStockListForDescription(
          idDescription
        );
      const stockSpecifications = getSpecificationsStock(response);
      setStockListForDescription(stockSpecifications);
    };

  const postDbUpdateStockAction: IStockHook["postDbUpdateStockAction"] = async (
    newStock: IPostUpdateStock
  ) => {
    await props.useDbStockListService.postDbUpdateStock(newStock);
  };
  const getProductListAction: IStockHook["getStockProductListAction"] = async (
    idTipo: string
  ) => {
    const response = await props.useDbStockListService.getDbStockProductList(idTipo);
    setProductList(response);
  };

  const getProductListForTypeAndDescriptionAction: IStockHook["getStockProductListForTypeAndDescriptionAction"] =
    async (idTipo: string, idDescription: string) => {
      const response =
        await props.useDbStockListService.getDbStockProductListForTypeAndDescription(
          idTipo,
          idDescription
        );
      setProductList(response);
    };

  return {
    categoryTypeList,
    stockListForDescription,
    productList,
    getStockTypeListAction,
    getDbStockListForDescriptionAction,
    postDbUpdateStockAction,
    getStockProductListAction: getProductListAction,
    getStockProductListForTypeAndDescriptionAction: getProductListForTypeAndDescriptionAction
  };
};

export default useStockHook;
