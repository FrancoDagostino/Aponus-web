import { useState } from "react";
import {
  IListadoCategorias,
  IListadoDescripciones,
} from "../model/category.model";
import { IDbCategoryService, IUpdateDescriptionPost } from "../services/useDbCategory.service";

export interface ICategoryHook {
  categoryList: IListadoCategorias[];
  descriptionList: IListadoDescripciones[];
  getCategoryListAction: () => Promise<void>;
  getDescriptionListAction: (idTipo: string) => Promise<IListadoDescripciones[]>;
  AddDescriptionAction: (description: string, idType: string) => Promise<void>;
  AddCategoryAction: (category: string, idType: string) => Promise<void>;
  UpdateDescriptionAction: (idDescription: number, description: string) => Promise<void>;
}

interface ICategoryHookProps {
  dBCategoryService: IDbCategoryService;
}

const useCategoryHook = (props: ICategoryHookProps): ICategoryHook => {
  const [categoryList, setCategoryList] = useState<IListadoCategorias[]>([]);

  const [descriptionList, setDescriptionList] = useState<IListadoDescripciones[]>([]);

  const getCategoryListAction: ICategoryHook["getCategoryListAction"] = async () => {
    const response = await props.dBCategoryService.getDbCategoryList();
    setCategoryList(response);
  };

  const getDescriptionListAction: ICategoryHook["getDescriptionListAction"] = async (idTipo: string) => {
    const response = await props.dBCategoryService.getDbDescriptionList(
      idTipo
    );
    setDescriptionList(response);
    return response;
  };

  const AddDescriptionAction: ICategoryHook["AddDescriptionAction"] = async (description: string, idType: string) => {
    await props.dBCategoryService.AddDbDescription(
      description,
      idType
    );
  };

  const AddCategoryAction: ICategoryHook["AddCategoryAction"] = async (category: string, idType: string) => {
    const response = await props.dBCategoryService.AddDbCategory(category, idType);
  }

  const UpdateDescriptionAction: ICategoryHook["UpdateDescriptionAction"] = async (idDescription: number, description: string) => {
    const response = await props.dBCategoryService.UpdateDbDescription(idDescription, description);
  }

  return {
    categoryList,
    descriptionList,
    getCategoryListAction,
    getDescriptionListAction,
    AddDescriptionAction,
    AddCategoryAction,
    UpdateDescriptionAction
  };
};

export default useCategoryHook;
