import { AxiosResponse } from "axios";
import axiosClient from "../../../utils/clients/useAxios.client";
import { IListadoProducto } from "../model/productList.model";
import { IListadoComponentes } from "../model/ProductComponentList.model";

export interface IDbProductListService {
  getDbProductList: (idTipo: string) => Promise<IListadoProducto[]>;
  getDbProductListForTypeAndDescription: (
    idTipo: string,
    idDescription: string
  ) => Promise<IListadoProducto[]>;
  getDbProductComponent: (
    idProduct: string,
    quantity: number
  ) => Promise<IListadoComponentes>;
}

export const useDbProductListService = (): IDbProductListService => {
  const getDbProductList: IDbProductListService["getDbProductList"] = async (
    idTipo: string
  ) => {
    try {
      const response: AxiosResponse<IListadoProducto[]> = await axiosClient.get(
        `Products/ListProducts/${idTipo}`
      );
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const getDbProductListForTypeAndDescription: IDbProductListService["getDbProductListForTypeAndDescription"] =
    async (idTipo: string, idDescription: string) => {
      try {
        const response: AxiosResponse<IListadoProducto[]> =
          await axiosClient.get(
            `Products/ListProducts/${idTipo}/${idDescription}`
          );
        return response.data;
      } catch (error) {
        return [];
      }
    };

  const getDbProductComponent: IDbProductListService["getDbProductComponent"] =
    async (idProduct: string, quantity: number) => {
      const requestBody = {
        idProducto: idProduct,
        Cantidad: quantity,
      };

      const response: AxiosResponse<IListadoComponentes> =
        await axiosClient.post(`/Products/NewListComponents`, requestBody);
      return response.data;
    };

  return {
    getDbProductList,
    getDbProductListForTypeAndDescription,
    getDbProductComponent,
  };
};
