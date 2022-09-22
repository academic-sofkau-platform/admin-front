import { StudentModel } from './student';

export interface ActiveTraining {
    trainingId: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    coach: string;
    apprentices: StudentModel[];
    rutaId: string;
    apprenticesCount: number;
    period: string;

}
