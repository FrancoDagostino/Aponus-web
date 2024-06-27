import { AxiosResponse } from "axios";
import axiosClient from "../../../utils/clients/useAxios.client";
import {
  IListadoComponentes,
  IPostUpdateStock,
  IStockProductList,
  IStockTypes,
} from "../model/stockList.model";
import { IListadoProducto } from "../../productList/model/productList.model";

export interface IDbStockListService {
  getDbStockTypeListAll: () => Promise<IStockTypes[]>;
  getDbStockListForDescription: (
    idDescription: string
  ) => Promise<IListadoComponentes[]>;
  postDbUpdateStock: (newStock: IPostUpdateStock) => Promise<void>;
  getDbStockProductList: (idTipo: string) => Promise<IStockProductList[]>;
  getDbStockProductListForTypeAndDescription: (
    idTipo: string,
    idDescription: string
  ) => Promise<IStockProductList[]>;
}

export const useDbStockListService = (): IDbStockListService => {

  const getDbStockTypeListAll: IDbStockListService["getDbStockTypeListAll"] =
    async () => {
      try {
        const response: AxiosResponse<IStockTypes[]> = await axiosClient.get(
          `Categories/Supplies/Descriptions/List`
        );
        return response.data;
      } catch (error) {
        return [];
      }
    };

  const getDbStockProductList: IDbStockListService["getDbStockProductList"] = async (
    idTipo: string
  ) => {
    try {
      const response: AxiosResponse<IStockProductList[]> = await axiosClient.get(
        `Stocks/Products/List/${idTipo}`
      );
      return response.data;
    } catch (error) {
      return [];
    }
  };
  const getDbStockProductListForTypeAndDescription: IDbStockListService["getDbStockProductListForTypeAndDescription"] =
    async (idTipo: string, idDescription: string) => {
      try {
        const response: AxiosResponse<IStockProductList[]> =
          await axiosClient.get(
            `Stocks/Products/List/${idTipo}/${idDescription}`
          );
        return response.data;
      } catch (error) {
        return [];
      }
    };
  const getDbStockListForDescription: IDbStockListService["getDbStockListForDescription"] =
    async (idDescription: string) => {
      try {
        const response: AxiosResponse<IListadoComponentes[]> =
          await axiosClient.get(`Stocks/Supplies/List/${idDescription}`);
        console.log(response)
        return response.data;
      } catch (error) {
        return [];
      }
    };

  const postDbUpdateStock: IDbStockListService["postDbUpdateStock"] = async (
    newStock: IPostUpdateStock
  ) => {
    try {
      const response = await axiosClient.post(
        `Stocks/NewStockUpdate`,
        newStock
      );
    } catch (error) { }
  };

  return {
    getDbStockTypeListAll,
    getDbStockListForDescription,
    postDbUpdateStock,
    getDbStockProductList,
    getDbStockProductListForTypeAndDescription
  };
};
