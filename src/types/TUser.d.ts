export interface TUser {
  id: string;
  username: string;
  email: string;
  password: string;
  phone: string | number;
  employee_no: string;
  profile_pic: string;
  status: 'user' | 'signer';
  join_date: string;
  contract_end: string;
  login: boolean;
}
