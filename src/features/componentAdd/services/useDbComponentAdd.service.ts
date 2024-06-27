import axiosClient from "../../../utils/clients/useAxios.client";
import { IComponentAdd } from "../model/componentAdd.model";



export interface IDbComponentAddService {
    postCreateDbComponentAdd: (newComponent: IComponentAdd, description: string) => Promise<void>;
}


export const useDbComponentAddService = (): IDbComponentAddService => {

    const postCreateDbComponentAdd: IDbComponentAddService["postCreateDbComponentAdd"] = async (newComponent: IComponentAdd, description: string) => {
        console.log(description.replace(" ", ""))
        const responseId = await axiosClient.get(`Supplies/new-id/${description}`)
        const idComponent = responseId.data;

        const newComponentSave: IComponentAdd = {
            ...newComponent,
            idComponente: idComponent
        }
        const response = await axiosClient.post(`Supplies/Create-or-Update`, newComponentSave)
    }

    return {
        postCreateDbComponentAdd
    }
}