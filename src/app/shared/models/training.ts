import { StudentModel } from './student';
import { RutaAprendizajeModel } from './ruta-aprendizaje';

export interface TrainingModel {
    trainingId: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    coach: string;
    apprentices: StudentModel[];
    rutaId: string;
}
