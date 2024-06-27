import {
  IEspecificaciones,
  IListadoComponentes,
} from "../model/stockList.model";

export function getSpecificationsStock(
  listado: IListadoComponentes[]
): IEspecificaciones[] {
  return listado.flatMap((componente) => componente.especificacionesFormato);
}
