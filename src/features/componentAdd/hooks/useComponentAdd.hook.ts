import { IComponentAdd } from "../model/componentAdd.model"
import { IDbComponentAddService } from "../services/useDbComponentAdd.service"


export interface IComponentAddHook {
    postCreateDbComponentAddAction: (newComponent: IComponentAdd, description: string) => Promise<void>
}

interface IComponentAddHookProps {
    dBComponentAddService: IDbComponentAddService
}

const useComponentAddHook = (props: IComponentAddHookProps): IComponentAddHook => {


    const postCreateDbComponentAddAction: IComponentAddHook["postCreateDbComponentAddAction"] = async (newComponent: IComponentAdd, description: string) => {
        const response = await props.dBComponentAddService.postCreateDbComponentAdd(newComponent, description)
    }
    return {
        postCreateDbComponentAddAction
    }
}

export default useComponentAddHook