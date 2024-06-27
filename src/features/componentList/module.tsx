import React, { FC, useEffect, useState } from 'react'
import LayoutComponent from '../../components/layout';
import { IComponentListHook } from './hooks/useComponentList.hook';
import ComponentList from './components/ComponentList.component';
import { IStockHook } from '../stockList/hooks/useStock.hook';
import TabsCategoryComponentType from '../stockList/components/TabsCategoryType.component';


interface IComponentListModuleProps {
    componentListHook: IComponentListHook
    stockHook: IStockHook;
}

const ComponentListModule: FC<IComponentListModuleProps> = (props) => {

    const [idDescriptionFounded, setIdDescriptionFounded] = useState<string>("");


    useEffect(() => {
        onInitHandler();
    }, [])


    const onInitHandler = () => {
        props.stockHook.getStockTypeListAction();
    }

    const onChangeTabsHandler = async (idDescription: string) => {
        setIdDescriptionFounded(idDescription);
        await props.componentListHook.getComponentListAction(Number(idDescription));
    };

    return (
        <LayoutComponent>
            <>
                <h1>Listado de Componentes</h1>
                <TabsCategoryComponentType
                    categoryTypeList={props.stockHook.categoryTypeList}
                    onChangeTabsHandler={onChangeTabsHandler}
                />

                <ComponentList data={props.componentListHook.componentList} />
            </>
        </LayoutComponent>
    )
}

export default ComponentListModule;