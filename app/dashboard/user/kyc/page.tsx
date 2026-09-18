'use client';
import { ExclaimationIcon } from '@/assets/svgs';
import { KYCMsgModel } from '@/components/kyc/kyc-msg-model';
import { KYCFormType, initialKYCForm } from '@/components/kyc/kyc-types';
import { Button, CustomDropdown } from '@/components/shared';
import InfoIconWithTooltip from '@/components/shared/info-icon-tooltip';
import { AppRoutes } from '@/constants/app-routes';
import { getKYCStatus } from '@/lib/auth/get-kyc-status';
import { submitKYCFormData } from '@/lib/auth/submit-kyc-form-data';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import countryList from 'react-select-country-list';

const KYC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [openKYCMsgModel, setOpenKYCMsgModel] = useState(false);
  const [modelContent, setModelContent] = useState({
    title: '',
    description: '',
    buttonText: '',
    onClick: () => {
      router.push(AppRoutes.dashboard.index);
    },
  });
  const countries = useMemo(() => countryList().getData(), []);

  const formMethods = useForm<KYCFormType>({
    defaultValues: initialKYCForm,
  });

  const {
    handleSubmit,
    reset,
    control,
    register,
    watch,
    formState: { errors },
  } = formMethods;

  // const { setValue, watch } = useFormContext();
  // const birth_country_code = watch("birth_country_code");
  const selectedOption = watch('source_of_wealth');
  // API calls
  async function onSubmit(data: KYCFormType) {
    setIsLoading(true);

    const formData = {
      first_name: data.first_name,
      last_name: data.last_name,
      middle_name: data.middle_name,
      birth_date: data.dob,
      birth_place: data.birth_place,
      birth_country: data.birth_country_code,
      nationality: data.nationality_country_code,
      document_type: data.document_type,
      profession: data.profession_description,
      street_no: data.street_no,
      city: data.city,
      postal_code: data.postal_code,
      country: data.residential_country_code,
      phone: data.phone_number_home,
      mobile: data.phone_number_mobile,
      email: data.email,
      source_of_wealth: data.source_of_wealth,
      about_wealth: data.source_of_wealth_description,
    };

    try {
      await submitKYCFormData(formData);

      setModelContent({
        title: 'Your form has been submitted',
        description:
          'Thank you! Your form has been submitted successfully. We will review your information and reach out to you via email shortly.',
        buttonText: 'GOT IT',
        onClick: () => {
          router.push(AppRoutes.dashboard.index);
        },
      });
      setIsLoading(false);
      setOpenKYCMsgModel(true);
      reset();
    } catch (error: any) {
      setIsLoading(false);

      const errorTitle = error?.message || 'Something went wrong';

      const errorMessage = error?.originalError?.response?.data?.message
        ? Array.isArray(error.originalError.response.data.message)
          ? error.originalError.response.data.message.join(', ')
          : error.originalError.response.data.message
        : error?.originalError?.message || 'An unexpected error occurred';

      setOpenKYCMsgModel(true);
      setModelContent({
        title: errorTitle,
        description: errorMessage,
        buttonText: 'GOT IT',
        onClick: () => {
          setOpenKYCMsgModel(false);
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  const GetKYCStatusFn = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getKYCStatus();
      if (res.status === 'not_submitted') {
        setModelContent({
          title: '',
          description: '',
          buttonText: '',
          onClick: () => {
            router.push(AppRoutes.dashboard.index);
          },
        });
        setOpenKYCMsgModel(false);
      }

      if (res.status === 'pending') {
        setModelContent({
          title: 'Your verification is in progress',
          description:
            'Please make sure to check your email to see if our Financial Department has gotten in touch with you!',
          buttonText: 'GOT IT',
          onClick: () => {
            router.push(AppRoutes.dashboard.index);
          },
        });
        setOpenKYCMsgModel(true);
      }

      if (res.status === 'approved') {
        setModelContent({
          title: `contact ${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'irfansaeedkhan@protonmail.com'} to get a new agreement to sign`,
          description:
            'Before you transfer your funds please provide in the email: Full Name, email address you use on the platform, and amount of Sigillum you wish to purchase.',
          buttonText: 'GOT IT',
          onClick: () => {
            router.push(AppRoutes.dashboard.index);
          },
        });
        setOpenKYCMsgModel(true);
      }
      if (res.status === 'rejected') {
        setModelContent({
          title: 'Your verification has been rejected',
          description:
            'Please make sure to check your email to see if our Financial Department has gotten in touch with you!',
          buttonText: 'GOT IT',
          onClick: () => {
            router.push(AppRoutes.dashboard.index);
          },
        });
        setOpenKYCMsgModel(true);
      }
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      setOpenKYCMsgModel(true);
      const errorTitle = error?.message || 'Something went wrong';

      const errorMessage = error?.originalError?.response?.data?.message
        ? Array.isArray(error.originalError.response.data.message)
          ? error.originalError.response.data.message.join(', ')
          : error.originalError.response.data.message
        : error?.originalError?.message || 'An unexpected error occurred';

      setOpenKYCMsgModel(true);
      setModelContent({
        title: errorTitle,
        description: errorMessage,
        buttonText: 'GOT IT',
        onClick: () => {
          setOpenKYCMsgModel(false);
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    GetKYCStatusFn();
  }, [GetKYCStatusFn]);

  return (
    <div className="flex">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 font-nexathin font-normal">
            <div className="flex w-full flex-col gap-4 lg:flex-row">
              <div className="flex w-full flex-col justify-between gap-8 rounded-xl bg-light p-6 text-white lg:w-3/5">
                <div className="flex flex-col">
                  <h4 className="pb-4 font-kanit text-base text-white">
                    Fill the KYC form to Purchase
                  </h4>
                  <p className="text-sm text-white/50">
                    Please return the original documents with electronic copies by email to{' '}
                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'irfansaeedkhan@protonmail.com'}.
                  </p>
                </div>
                {/* Identity informations  */}
                <div className="flex flex-col">
                  <div className="flex flex-col pb-4">
                    <h4 className="font-kanit text-base text-white">Identity informations</h4>
                    <div className="flex gap-1">
                      <p className="text-sm text-white/50">
                        Please fill in your personal details below{' '}
                      </p>
                      <InfoIconWithTooltip color="#FFBC39" text="fill with your personal details" />
                    </div>
                  </div>
                  <div className="form flex flex-col gap-4">
                    <div className={inputMain}>
                      <label htmlFor="first_name" className={inputLabel}>
                        First Name*
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        id="first_name"
                        className={inputField}
                        {...register('first_name', {
                          required: 'First Name is required',
                          minLength: {
                            value: 2,
                            message: 'First Name must be at least 2 characters long',
                          },
                          maxLength: {
                            value: 50,
                            message: 'First Name cannot exceed 50 characters',
                          },
                        })}
                      />
                      {errors.first_name && (
                        <p className="mt-1 text-xs text-brand-red">{errors.first_name.message}</p>
                      )}
                    </div>
                    <div className="flex w-full flex-col gap-4 lg:flex-row">
                      <div className={inputMain}>
                        <label htmlFor="middle_name" className={inputLabel}>
                          Middle Name
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          id="middle_name"
                          className={inputField}
                          {...register('middle_name', {
                            minLength: {
                              value: 2,
                              message: 'Middle Name must be at least 2 characters long',
                            },
                            maxLength: {
                              value: 50,
                              message: 'Middle Name cannot exceed 50 characters',
                            },
                          })}
                        />
                        {errors.middle_name && (
                          <p className="mt-1 text-xs text-brand-red">
                            {errors.middle_name.message}
                          </p>
                        )}
                      </div>
                      <div className={inputMain}>
                        <label htmlFor="last_name" className={inputLabel}>
                          Last Name*
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          id="last_name"
                          className={inputField}
                          {...register('last_name', {
                            required: 'Last Name is required',
                            minLength: {
                              value: 2,
                              message: 'Last Name must be at least 2 characters long',
                            },
                            maxLength: {
                              value: 50,
                              message: 'Last Name cannot exceed 50 characters',
                            },
                          })}
                        />
                        {errors.last_name && (
                          <p className="mt-1 text-xs text-brand-red">{errors.last_name.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-4 lg:flex-row">
                      <div className={inputMain}>
                        <label htmlFor="dob" className={inputLabel}>
                          Date of Birth*
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          id="dob"
                          placeholder="YYYY-MM-DD"
                          className={inputField}
                          {...register('dob', {
                            required: 'Date of Birth is required',
                            pattern: {
                              value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                              message: 'Format should be yyyy-mm-dd',
                            },
                          })}
                        />
                        {errors.dob && (
                          <p className="mt-1 text-xs text-brand-red">{errors.dob.message}</p>
                        )}
                      </div>
                      <div className={inputMain}>
                        <label htmlFor="birth_place" className={inputLabel}>
                          Birth place *
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          id="birth_place"
                          className={inputField}
                          {...register('birth_place', {
                            required: 'BirthPlace is required',
                            minLength: {
                              value: 2,
                              message: 'Birth Place must be at least 2 characters long',
                            },
                            maxLength: {
                              value: 50,
                              message: 'Birth Place cannot exceed 50 characters',
                            },
                          })}
                        />
                        {errors.birth_place && (
                          <p className="mt-1 text-xs text-brand-red">
                            {errors.birth_place.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={inputMain}>
                      <label htmlFor="birth_country_code" className={inputLabel}>
                        Birth Country*
                      </label>
                      <Controller
                        name="birth_country_code"
                        control={control}
                        rules={{ required: 'Birth Country is required' }}
                        render={({ field }) => (
                          <CustomDropdown
                            placeholder="Select Country"
                            enableFilter={true}
                            options={countries}
                            selectedValue={field.value}
                            onSelect={value => field.onChange(value)}
                          />
                        )}
                      />
                      {errors.birth_country_code && (
                        <p className="mt-1 text-xs text-brand-red">
                          {errors.birth_country_code.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Documents informations  */}
                <div className="flex flex-col">
                  <div className="flex flex-col pb-4">
                    <h4 className="font-kanit text-base text-white">Documents informations</h4>
                    <div className="flex gap-1">
                      <p className="text-sm text-white/50">
                        Please fill in your documents details below
                      </p>
                      <InfoIconWithTooltip color="#FFBC39" text="fill in your documents details" />
                    </div>
                  </div>
                  <div className="form flex flex-col gap-4">
                    <div className={inputMain}>
                      <label htmlFor="nationality_country_code" className={inputLabel}>
                        Nationality*
                      </label>
                      <Controller
                        name="nationality_country_code"
                        control={control}
                        rules={{ required: 'Nationality Country is required' }}
                        render={({ field }) => (
                          <CustomDropdown
                            placeholder="Select Country"
                            enableFilter={true}
                            options={countries}
                            selectedValue={field.value}
                            onSelect={value => field.onChange(value)}
                          />
                        )}
                      />
                      {errors.nationality_country_code && (
                        <p className="mt-1 text-xs text-brand-red">
                          {errors.nationality_country_code.message}
                        </p>
                      )}
                    </div>
                    <div className={inputMain}>
                      <label htmlFor="document_type" className={inputLabel}>
                        Document type*
                      </label>

                      <Controller
                        name="document_type"
                        control={control}
                        rules={{ required: 'Document type is required' }}
                        render={({ field }) => (
                          <div className="flex w-full flex-col gap-4 rounded-xl bg-light p-3 text-sm lg:flex-row">
                            <label className="flex cursor-pointer items-center gap-2">
                              <input
                                type="radio"
                                className="hidden"
                                onChange={() => field.onChange('passport')}
                                checked={field.value === 'passport'}
                              />
                              <div
                                className={clsx(
                                  'flex h-5 w-5 items-center justify-center rounded-full border-2',
                                  field.value === 'passport'
                                    ? 'bg-gradient-to-r from-brand-gold to-brand-rust'
                                    : 'border-gray-500 bg-gray-600'
                                )}
                              >
                                {field.value === 'passport' && (
                                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-brand-gold to-brand-rust"></div>
                                )}
                              </div>
                              <span className="text-white">Passport number</span>
                            </label>
                            <label className="flex cursor-pointer items-center gap-2">
                              <input
                                type="radio"
                                className="hidden"
                                onChange={() => field.onChange('id_card')}
                                checked={field.value === 'id_card'}
                              />
                              <div
                                className={clsx(
                                  'flex h-5 w-5 items-center justify-center rounded-full border-2',
                                  field.value === 'id_card'
                                    ? 'bg-gradient-to-r from-brand-gold to-brand-rust'
                                    : 'border-gray-500 bg-gray-600'
                                )}
                              >
                                {field.value === 'id_card' && (
                                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-brand-gold to-brand-rust"></div>
                                )}
                              </div>
                              <span className="text-white">ID Card number</span>
                            </label>

                            <div className="hidden h-full w-[2px] bg-white/20 lg:block"></div>
                          </div>
                        )}
                      />

                      {errors.document_type && (
                        <p className="mt-1 text-xs text-brand-red">
                          {errors.document_type.message}
                        </p>
                      )}
                    </div>
                    <div className={inputMain}>
                      <label htmlFor="profession_description" className={inputLabel}>
                        Profession*{' '}
                        <span className="text-xs text-white/50">
                          (if retired, please specify last profession or occupation before
                          retirement) (if director, please specify the name of the entity)
                        </span>
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        id="profession_description"
                        className={inputField}
                        {...register('profession_description', {
                          required: 'Profession Description is required',
                          minLength: {
                            value: 2,
                            message: 'proffession_description must be at least 2 characters long',
                          },
                          maxLength: {
                            value: 450,
                            message: 'proffession_description cannot exceed 450 characters',
                          },
                        })}
                      />
                      {errors.profession_description && (
                        <p className="mt-1 text-xs text-brand-red">
                          {errors.profession_description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Residential address (permanent residence) */}
                <div className="flex flex-col">
                  <div className="flex flex-col pb-4">
                    <h4 className="font-kanit text-base text-white">
                      Residential address (permanent residence)
                    </h4>
                    <div className="flex gap-1">
                      <p className="text-sm text-white/50">
                        Please fill in your Residential details below
                      </p>
                      <InfoIconWithTooltip
                        color="#FFBC39"
                        text="fill in your Residential details"
                      />
                    </div>
                  </div>
                  <div className="form flex flex-col gap-4">
                    <div className={inputMain}>
                      <label htmlFor="street_no" className={inputLabel}>
                        Street/No*
                        <span className="pl-1 text-xs text-white/20">(POX are not permitted)</span>
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        id="street_no"
                        className={inputField}
                        {...register('street_no', {
                          required: 'Street No is required',
                          maxLength: {
                            value: 250,
                            message: 'Street No cannot exceed 50 characters',
                          },
                        })}
                      />
                      {errors.street_no && (
                        <p className="mt-1 text-xs text-brand-red">{errors.street_no.message}</p>
                      )}
                    </div>
                    <div className="flex w-full flex-col gap-4 lg:flex-row">
                      <div className={inputMain}>
                        <label htmlFor="city" className={inputLabel}>
                          City*
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          id="city"
                          className={inputField}
                          {...register('city', {
                            required: 'City is required',
                            minLength: {
                              value: 2,
                              message: 'City must be at least 2 characters long',
                            },
                            maxLength: {
                              value: 50,
                              message: 'City cannot exceed 50 characters',
                            },
                          })}
                        />
                        {errors.city && (
                          <p className="mt-1 text-xs text-brand-red">{errors.city.message}</p>
                        )}
                      </div>
                      <div className={inputMain}>
                        <label htmlFor="postal_code" className={inputLabel}>
                          Postal code*
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          id="postal_code"
                          className={inputField}
                          {...register('postal_code', {
                            required: 'Postal code is required',
                            minLength: {
                              value: 4,
                              message: 'Postal code must be at least 4 characters long',
                            },
                            maxLength: {
                              value: 50,
                              message: 'Postal code cannot exceed 50 characters',
                            },
                          })}
                        />
                        {errors.postal_code && (
                          <p className="mt-1 text-xs text-brand-red">
                            {errors.postal_code.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={inputMain}>
                      <label htmlFor="residential_country_code" className={inputLabel}>
                        Country*
                      </label>
                      <Controller
                        name="residential_country_code"
                        control={control}
                        rules={{ required: 'Residential Country is required' }}
                        render={({ field }) => (
                          <CustomDropdown
                            placeholder="Select Country"
                            enableFilter={true}
                            options={countries}
                            selectedValue={field.value}
                            onSelect={value => field.onChange(value)}
                          />
                        )}
                      />
                      {errors.residential_country_code && (
                        <p className="mt-1 text-xs text-brand-red">
                          {errors.residential_country_code.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact details*/}
                <div className="flex flex-col">
                  <div className="flex flex-col pb-4">
                    <h4 className="font-kanit text-base text-white">Contact details</h4>
                    <div className="flex gap-1">
                      <p className="text-sm text-white/50">
                        Please fill in your contact details below
                      </p>
                      <InfoIconWithTooltip color="#FFBC39" text="fill in your contact details" />
                    </div>
                  </div>
                  <div className="form flex flex-col gap-4">
                    <div className="flex w-full flex-col gap-4 lg:flex-row">
                      <div className={inputMain}>
                        <label htmlFor="phone_number_home" className={inputLabel}>
                          Phone number <span className="pl-1 text-xs text-white/20">(Home)</span>
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          id="phone_number_home"
                          className={inputField}
                          {...register('phone_number_home', {
                            maxLength: {
                              value: 50,
                              message: 'Phone No cannot exceed 50 characters',
                            },
                          })}
                        />
                        {errors.phone_number_home && (
                          <p className="mt-1 text-xs text-brand-red">
                            {errors.phone_number_home.message}
                          </p>
                        )}
                      </div>
                      <div className={inputMain}>
                        <label htmlFor="phone_number_mobile" className={inputLabel}>
                          Phone number*
                          <span className="pl-1 text-xs text-white/20">(Mobile)</span>
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          id="phone_number_mobile"
                          className={inputField}
                          {...register('phone_number_mobile', {
                            required: 'Phone No is required',
                            maxLength: {
                              value: 50,
                              message: 'Phone No cannot exceed 50 characters',
                            },
                          })}
                        />
                        {errors.phone_number_mobile && (
                          <p className="mt-1 text-xs text-brand-red">
                            {errors.phone_number_mobile.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={inputMain}>
                      <label htmlFor="email" className={inputLabel}>
                        Email address*
                      </label>
                      <input
                        autoComplete="off"
                        className={clsx(inputField)}
                        type="email"
                        id="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'Invalid email address',
                          },
                          maxLength: {
                            value: 50,
                            message: 'Email cannot exceed 50 characters',
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-brand-red">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Source of wealth  */}
                <div className="flex flex-col">
                  <div className="flex flex-col pb-4">
                    <h4 className="font-kanit text-base text-white">Source of wealth</h4>
                    <div className="flex gap-1">
                      <p className="text-sm text-white/50">
                        Please add source of wealth or add in details
                      </p>
                      <InfoIconWithTooltip color="#FFBC39" text="fill in your wealth details" />
                    </div>
                  </div>
                  <div className="form flex flex-col gap-4">
                    <div className={inputMain}>
                      <label htmlFor="source_of_wealth" className={inputLabel}>
                        Source of wealth*
                      </label>

                      <Controller
                        name="source_of_wealth"
                        control={control}
                        rules={{ required: 'Source of wealth is required' }}
                        render={({ field }) => (
                          <div className="flex w-full flex-wrap gap-4 rounded-xl bg-light p-3 text-sm">
                            {[
                              { label: 'Saving number', value: 'saving' },
                              {
                                label: 'Property income',
                                value: 'property_income',
                              },
                              {
                                label: 'Professional activity',
                                value: 'professional_activity',
                              },
                              { label: 'Inheritance', value: 'inheritance' },
                              { label: 'Other', value: 'other' },
                            ].map(option => (
                              <label
                                key={option.value}
                                className="flex cursor-pointer items-center gap-2"
                              >
                                <input
                                  type="radio"
                                  className="hidden"
                                  onChange={() => field.onChange(option.value)}
                                  checked={field.value === option.value}
                                />
                                <div
                                  className={clsx(
                                    'flex h-5 w-5 items-center justify-center rounded-full border-2',
                                    field.value === option.value
                                      ? 'bg-gradient-to-r from-brand-gold to-brand-rust'
                                      : 'border-gray-500 bg-gray-600'
                                  )}
                                >
                                  {field.value === option.value && (
                                    <div className="h-3 w-3 rounded-full bg-gradient-to-r from-brand-gold to-brand-rust"></div>
                                  )}
                                </div>
                                <span className="text-white">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      />

                      {errors.source_of_wealth && (
                        <p className="mt-1 text-xs text-brand-red">
                          {errors.source_of_wealth.message}
                        </p>
                      )}
                    </div>
                    {selectedOption === 'other' && (
                      <div className={inputMain}>
                        <label htmlFor="source_of_wealth_description" className={inputLabel}>
                          About your Source of wealth*
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          id="source_of_wealth_description"
                          className={inputField}
                          {...register('source_of_wealth_description', {
                            required: selectedOption === 'other' && 'Source of wealth is required',
                            minLength: {
                              value: 2,
                              message: 'Source of wealth must be at least 2 characters long',
                            },
                            maxLength: {
                              value: 450,
                              message: 'Source of wealth cannot exceed 450 characters',
                            },
                          })}
                        />
                        {errors.source_of_wealth_description && (
                          <p className="mt-1 text-xs text-brand-red">
                            {errors.source_of_wealth_description.message}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* right card */}
              <div className="flex h-auto max-h-min w-full flex-col rounded-xl bg-light p-6 text-white lg:w-2/5">
                <h5 className="pb-6 font-kanit text-2xl">Submissions</h5>
                <div className="flex items-center gap-2 font-nexathin">
                  <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
                  <div className="flex flex-col gap-1">
                    <h3 className="pt-1 font-kanit text-xxs text-white">Important</h3>
                    <p className="text-xxs font-normal text-white">
                      Please ensure to complete all fields that are marked with an asterisk (*
                      mandatory field).
                    </p>
                  </div>
                </div>
                {/* Checkboxes */}
                <div className="flex flex-col gap-4">
                  <h6 className="pb-4 pt-8 font-kanit text-sm">By submitting the form:</h6>

                  {/* Checkbox 1 */}
                  <div className="flex items-start gap-2 sm:items-center">
                    <Controller
                      name="checkbox1"
                      control={control}
                      rules={{
                        required: 'You must agree to the terms and conditions.',
                      }}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          id="checkbox1"
                          className="border-gray-shade-1/10 block h-5 w-5 shrink-0 rounded border bg-light focus:ring-0"
                          // Use `checked` instead of `value`
                          checked={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          ref={field.ref}
                        />
                      )}
                    />
                    <label htmlFor="checkbox1" className="block text-sm font-normal text-white">
                      I declare that I have read and agree with{' '}
                      <Link href="/terms" className="font-semibold underline">
                        Terms & Conditions
                      </Link>
                    </label>
                  </div>
                  {errors.checkbox1 && (
                    <p className="mt-1 text-sm text-brand-red">{errors.checkbox1.message}</p>
                  )}

                  {/* Checkbox 2 */}
                  <div className="flex items-start gap-2 sm:items-center">
                    <Controller
                      name="checkbox2"
                      control={control}
                      rules={{
                        required: 'You must agree that provided details are correct',
                      }}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          id="checkbox2"
                          className="border-gray-shade-1/10 block h-5 w-5 shrink-0 rounded border bg-light focus:ring-0"
                          // Use `checked` instead of `value`
                          checked={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          ref={field.ref}
                        />
                      )}
                    />
                    <label htmlFor="checkbox2" className="block text-sm font-normal text-white">
                      I acknowledge that the details provided are correct and correspond to the
                      government-issued identification.
                    </label>
                  </div>
                  {errors.checkbox2 && (
                    <p className="mt-1 text-sm text-brand-red">{errors.checkbox2.message}</p>
                  )}

                  {/* Submit Button */}
                  <Button
                    title="Submit form"
                    variant="confirm"
                    size="lg"
                    compact
                    className="mt-4 w-full"
                    // loaderIcon={
                    //   <CgSpinner className="mx-auto size-5 h-5 w-5 animate-spin" />
                    // }
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>

      <KYCMsgModel
        open={openKYCMsgModel}
        onClose={() => setOpenKYCMsgModel(false)}
        modelContent={modelContent}
      />

      <div>
        {isLoading && (
          <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
            <CgSpinner className="size-14 mx-auto mt-20 h-14 w-14 shrink-0 animate-spin text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default KYC;

const inputMain = 'w-full flex flex-col gap-1';
const inputLabel = 'text-sm text-white';
const inputField =
  'peer relative w-full bg-light pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:primary focus:ring-2 focus:ring-primary focus:drop-shadow-lg py-3 rounded-full text-base text-white [&>input]:border-0 [&>input]:outline-none [&>input]:ring-0 [&>input]:bg-primary';
