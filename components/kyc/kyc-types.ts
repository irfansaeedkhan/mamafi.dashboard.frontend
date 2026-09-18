export type KYCFormType = {
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string;
  birth_place: string;
  birth_country_code: string;
  nationality_country_code: string;
  document_type: string;
  profession_description: string;
  street_no: string;
  city: string;
  postal_code: string;
  residential_country_code: string;
  phone_number_home: string;
  phone_number_mobile: string;
  email: string;
  source_of_wealth: string;
  source_of_wealth_description: string;
  checkbox1: boolean;
  checkbox2: boolean;
};

export const initialKYCForm: KYCFormType = {
  first_name: '',
  middle_name: '',
  last_name: '',
  dob: '',
  birth_place: '',
  birth_country_code: '',
  nationality_country_code: '',
  document_type: 'passport',
  profession_description: '',
  street_no: '',
  city: '',
  postal_code: '',
  residential_country_code: '',
  phone_number_home: '',
  phone_number_mobile: '',
  email: '',
  source_of_wealth: 'other',
  source_of_wealth_description: '',
  checkbox1: false,
  checkbox2: false,
};

export interface IKYCForm {
  formState: KYCFormType;
  setFormState: React.Dispatch<React.SetStateAction<KYCFormType>>;
}
