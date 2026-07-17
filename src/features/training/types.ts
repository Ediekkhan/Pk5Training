export type Stage = "login" | "training" | "complete" | "thankyou";

export type BadgeKey = "learner" | "practitioner" | "champion";

export type TrainingUser = {
  id: string;
};

export type CompletionData = {
  signature: string;
  fullName: string;
  employeeId: string;
  department: string;
};
