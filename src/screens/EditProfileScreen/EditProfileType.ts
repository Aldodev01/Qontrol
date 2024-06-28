export interface TEditProfileValidation {
  email: boolean;
  username: boolean;
  phone: boolean;
  status: boolean;
}

export interface TEditProfile {
  email: string;
  username: string;
  phone: string;
  status: string;
}
