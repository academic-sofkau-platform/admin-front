export interface RutaAprendizajeModel {
  id: string;
  nombre: string;
  descripcion: string;
  rutas: RutaModel[];
}

export interface RutaModel{
  //rutaId: string = ;
  nivel: number;
  cursoId: string;
  prerrequisitosId: string[];
}
