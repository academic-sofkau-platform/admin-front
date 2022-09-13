import { StudentModel } from '../models/student';
import { RutaAprendizajeModel } from '../models/ruta-aprendizaje';

export interface CrearTrainingCommand {
  name: string;
  description: string;
  startDate: number;
  endDate: number;
  coach: string;
  apprentices: StudentModel[];
  rutaAprendizaje: RutaAprendizajeModel;
}
