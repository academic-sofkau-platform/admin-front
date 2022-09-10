import { RutaModel } from "../models/ruta-aprendizaje";

export interface CrearRutaAprendizajeCommand {
  nombre:string;
  descripcion: string;
  rutas: RutaModel[];
}
