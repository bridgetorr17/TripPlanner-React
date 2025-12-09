export type SignupInfo = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type LoginInfo = {
    email: string;
    password: string;
}

export type AuthenticationResult = {
    success: boolean;
    message?: string;
}

export type ResetPasswordDetails = {
    token: string;
    userId: string;
    email: string;
    password: string;
    confirmPassword: string;
}