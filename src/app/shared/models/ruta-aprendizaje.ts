export interface RutaAprendizajeModel {
  id: string;
  nombre: string;
  descripcion: string;
  rutas: RutaModel[];
}

export interface RutaModel{
  nivel: number;
  curso: string;
  prerrequisitos: string[];
}
