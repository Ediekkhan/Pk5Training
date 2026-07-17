export type ApiResponse<T> = {
  responseMessage: string;
  responseData?: T;
  data?: T;
  responseStatus: "SUCCESS" | "FAILED" | string;
};


export interface ILoginPayload {
 email: string;
 password: string;
}

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  jwtToken: string;
  phoneNumber?: string;
  isDeleted?: boolean;
  isActive?: boolean;
  hasChangedPassword?: boolean;
}

 export interface ISSOAUTH {
  user: IUser,
  token: string;
}