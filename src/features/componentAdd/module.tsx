import React, { FC, useEffect } from 'react'
import LayoutComponent from '../../components/layout';
import { IComponentAddHook } from './hooks/useComponentAdd.hook';
import FormComponentAdd from './components/FormComponentAdd.component';
import { IStockHook } from '../stockList/hooks/useStock.hook';
import { IComponentAdd } from './model/componentAdd.model';

interface IComponentAddModuleProps {
    componentAddHook: IComponentAddHook
    stockHook: IStockHook;
}

const ComponentAddModule: FC<IComponentAddModuleProps> = (props) => {

    useEffect(() => {
        onInitHandler();
    }, [])


    const onInitHandler = () => {
        props.stockHook.getStockTypeListAction();
    }

    const onAddOrUpdateComponentHandler = (newComponent: IComponentAdd, description: string) => {
        props.componentAddHook.postCreateDbComponentAddAction(newComponent, description);
    }

    return (
        <LayoutComponent>
            <>
                <h1>Nuevo Componente</h1>
                <FormComponentAdd componentTypes={props.stockHook.categoryTypeList} onSave={onAddOrUpdateComponentHandler} />
            </>
        </LayoutComponent>
    )
}

export default ComponentAddModule