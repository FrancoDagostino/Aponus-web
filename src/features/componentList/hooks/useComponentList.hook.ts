import { useState } from "react"
import { IDbComponentListService } from "../services/useDbComponentList.service"
import { IListadoComponentes } from "../model/componentList.model"


export interface IComponentListHook {
    componentList: IListadoComponentes[] //TODO definir el modelo
    getComponentListAction: (idDescription: number) => Promise<void>
}

interface IComponentListHookProps {
    dBComponentListService: IDbComponentListService
}


const useComponentListHook = (props: IComponentListHookProps): IComponentListHook => {

    const [componentList, setComponentList] = useState<IListadoComponentes[]>([])

    const getComponentListAction: IComponentListHook["getComponentListAction"] = async (idDescription: number) => {
        const response = await props.dBComponentListService.getDbComponentList(idDescription);
        if (response) setComponentList(response)
    }

    return {
        componentList,
        getComponentListAction
    }
}

export default useComponentListHook