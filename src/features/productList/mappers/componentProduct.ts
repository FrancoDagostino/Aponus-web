import {
  IListadoComponentes,
  IStockFormateado,
} from "../model/ProductComponentList.model";

export const componentProductMapper = (
  listComponent: IListadoComponentes
): IStockFormateado[] => {
  const listComponentFormated: IStockFormateado[] =
    listComponent.componentes.flatMap((product) =>
      product.stockFormateado.map((componente) => {
        return {
          idInsumo: componente.idInsumo,
          requerido: componente.requerido,
          recibido: componente.recibido,
          pintura: componente.pintura,
          proceso: componente.proceso,
          total: componente.total,
          granallado: componente.granallado,
        };
      })
    );

  return listComponentFormated;
};
