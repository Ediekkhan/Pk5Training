import { http } from './https';

export interface TrainingBackendRequest {
  trainingNumber: string;
  participantEmail: string;
}

export const trainingService = {
  sendTrainingForm: async (data: TrainingBackendRequest) => {
    return http.post('/Training/training', data);
  }
};