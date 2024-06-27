// export interface IListadoProducto {
//   idProducto: string;
//   componentes: Componente[];
// }

// export interface Componente {
//   idComponente: string;
//   descripcion: string;
//   stockFormateado: IStockFormateado[];
// }

// export interface IStockFormateado {
//   idInsumo: string;
//   requerido: string;
//   recibido?: string;
//   pintura?: string;
//   proceso: string;
//   total: string;
//   granallado?: string;
// }

export interface IListadoProducto {
  idDescripcion: number;
  descripcionProducto: string;
  productos: Producto[];
}

export interface Producto {
  idProducto: string;
  idDescripcion: number;
  idTipo: string;
  diametroNominal: number;
  tolerancia: string;
  cantidad: number;
  precioLista: number;
  precioFinal: number | null;
  porcentajeGanancia: number | null;
  idDescripcionNavigation: null;
  idTipoNavigation: null;
  componentesCuantitativos: any[];
}
