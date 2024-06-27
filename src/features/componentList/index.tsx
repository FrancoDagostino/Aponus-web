import React, { FC } from 'react'
import ComponentListModule from './module';
import useComponentListHook from './hooks/useComponentList.hook';
import { useDbComponentListService } from './services/useDbComponentList.service';
import useStockHook from '../stockList/hooks/useStock.hook';
import { useDbStockListService } from '../stockList/services/useDbStockList.service';

interface IComponentListProps {
    onNavigate?: (url: string) => void;
}

const ComponentListFeature: FC<IComponentListProps> = (props) => {

    const componentListHook = useComponentListHook({
        dBComponentListService: useDbComponentListService()
    })
    const stockHook = useStockHook({
        useDbStockListService: useDbStockListService(),
    });

    return (
        <ComponentListModule componentListHook={componentListHook} stockHook={stockHook} />
    )
}

export default ComponentListFeature;
