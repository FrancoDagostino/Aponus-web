import { AxiosResponse } from "axios";
import { IListadoComponentes } from "../model/componentList.model";
import axiosClient from "../../../utils/clients/useAxios.client";


export interface IDbComponentListService {
    getDbComponentList: (idDescription: number) => Promise<IListadoComponentes[] | null>;
}


export const useDbComponentListService = (): IDbComponentListService => {

    const getDbComponentList: IDbComponentListService["getDbComponentList"] = async (idDescription: number) => {
        try {
            const response: AxiosResponse<IListadoComponentes[]> = await axiosClient.get(`Components/List/${idDescription}`);
            return response.data
        } catch (error) {
            return null
        }
    }

    return {
        getDbComponentList
    }
}