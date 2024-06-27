import { AxiosResponse } from "axios";
import {
  IListadoCategorias,
  IListadoDescripciones,
} from "../model/category.model";
import axiosClient from "../../../utils/clients/useAxios.client";

interface INewDescriptionPost {
  Descripcion: string;
  IdTipo: string;
}

interface IAddOrUpdateCategoryPost {
  descripcionTipo: string,
  idTipo: string
}
interface IUpdateDescriptionNew {
  descripcion: string,
  idTipo: string
}

interface IUpdateDescriptionOld {
  idDescripcion: number,
  idTipo: string
}

export interface IUpdateDescriptionPost {
  nueva: IUpdateDescriptionNew,
  anterior: IUpdateDescriptionOld
}

export interface IDbCategoryService {
  getDbCategoryList: () => Promise<IListadoCategorias[]>;
  getDbDescriptionList: (idTipo: string) => Promise<IListadoDescripciones[]>;
  AddDbCategory: (category: string, idType: string) => Promise<void>;
  AddDbDescription: (description: string, idType: string) => Promise<void>;
  UpdateDbDescription: (idDescription: number, description: string) => Promise<void>;

}

export const useDbCategoryService = (): IDbCategoryService => {

  const getDbCategoryList: IDbCategoryService["getDbCategoryList"] = async (): Promise<IListadoCategorias[]> => {
    try {
      const response: AxiosResponse<IListadoCategorias[]> =
        await axiosClient.get("Categories/Products/Types/List");
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const getDbDescriptionList: IDbCategoryService["getDbDescriptionList"] = async (idTipo: string): Promise<IListadoDescripciones[]> => {
    try {
      const response: AxiosResponse<IListadoDescripciones[]> =
        await axiosClient.get(`Categories/Products/Descriptions/List/${idTipo}`);
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const AddDbDescription: IDbCategoryService["AddDbDescription"] = async (description: string, idType: string) => {
    const body: INewDescriptionPost = {
      Descripcion: description,
      IdTipo: idType,
    };

    try {
      const response: AxiosResponse = await axiosClient.post(`Categories/Products/Descriptions/New`, body);
    } catch (error) { }
  };

  const AddDbCategory: IDbCategoryService["AddDbCategory"] = async (category: string, idType: string) => {

    const body: IAddOrUpdateCategoryPost = {
      descripcionTipo: category,
      idTipo: idType
    }
    try {
      const response: AxiosResponse = await axiosClient.post(`Categories/Products/Types/New`, body)

    } catch (error) {

    }
  }

  const UpdateDbDescription: IDbCategoryService["UpdateDbDescription"] = async (idDescription: number, description: string) => {
    const objDescription = {
      nueva: {
        descripcion: description
      },
      anterior: {
        idDescripcion: idDescription
      }
    }
    const response: AxiosResponse = await axiosClient.post(`Categories/Products/Type-or-Description/Update`, objDescription)
  }

  return {
    getDbCategoryList,
    getDbDescriptionList,
    AddDbDescription,
    AddDbCategory,
    UpdateDbDescription
  };
};
