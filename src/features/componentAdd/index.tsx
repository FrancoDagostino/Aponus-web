import React, { FC } from 'react'
import ComponentAddModule from './module'
import useComponentAddHook from './hooks/useComponentAdd.hook'
import { useDbComponentAddService } from './services/useDbComponentAdd.service'
import useStockHook from '../stockList/hooks/useStock.hook'
import { useDbStockListService } from '../stockList/services/useDbStockList.service'

const ComponentAddFeature: FC = () => {

    const componetAddHook = useComponentAddHook({
        dBComponentAddService: useDbComponentAddService()
    })
    const stockHook = useStockHook({
        useDbStockListService: useDbStockListService(),
    });

    return (
        <ComponentAddModule componentAddHook={componetAddHook} stockHook={stockHook} />
    )
}

export default ComponentAddFeature