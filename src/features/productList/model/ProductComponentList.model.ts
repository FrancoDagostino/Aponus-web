export interface IListadoComponentes {
  idProducto: string;
  componentes: IComponente[];
}

export interface IComponente {
  idComponente: string;
  descripcion: string;
  stockFormateado: IStockFormateado[];
}

export interface IStockFormateado {
  idInsumo: string;
  requerido: string;
  recibido?: string;
  pintura?: string;
  proceso: string;
  total: string;
  granallado?: string;
  moldeado?: string;
}
