import { RutaModel } from "../models/ruta-aprendizaje";
export interface ModificarRutaAprendizajeCommand{
  nombre:string;
  descripcion: string;
  rutas: RutaModel[];
}
