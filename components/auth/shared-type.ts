export type RegisterFormType = {
  name: string;
  email: string;
  surname: string;
  referral_code: string;
  country: string;
  country_code: string;
  phone_number: any;
  password: string;
  confirm_password: string;
  password_type: 'password' | 'text';
  confirm_password_type: 'password' | 'text';
  terms?: boolean;
};

export const initialRegisterForm: RegisterFormType = {
  name: '',
  email: '',
  surname: '',
  referral_code: '',
  country: '',
  country_code: '',
  phone_number: '',
  password: '',
  confirm_password: '',
  password_type: 'password',
  confirm_password_type: 'password',
  terms: false,
};

export interface IRegisterForm {
  formState: RegisterFormType;
  setFormState: React.Dispatch<React.SetStateAction<RegisterFormType>>;
}
