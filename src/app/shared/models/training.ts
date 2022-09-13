import { StudentModel } from './student';
import { RutaAprendizajeModel } from './ruta-aprendizaje';

export interface TrainingModel {
    trainingId: string;
    name: string;
    description: string;
    startDate: number;
    endDate: number;
    coach: string;
    apprentices: StudentModel[];
    rutaAprendizaje: RutaAprendizajeModel;
}
