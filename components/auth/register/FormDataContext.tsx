import React, { createContext, useState } from 'react';
import { IRegisterForm } from '../shared-type';

export interface IFormDataContext {
  formData: IRegisterForm;
  setFormData: (data: IRegisterForm) => void;
  updateFormData: (newData: Partial<IRegisterForm>) => void;
}

export const FormDataContext = createContext<IFormDataContext | null>(null);

export const FormDataProvider: React.FC = ({ children }: any) => {
  const [formData, setFormData] = useState<IRegisterForm>({
    formState: {
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
    },
    setFormState: () => {},
  });

  const updateFormData = (newData: Partial<IRegisterForm>) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
