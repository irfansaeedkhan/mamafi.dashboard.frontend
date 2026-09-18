import { Button } from '@/components/shared';
import ModalContainer from '@/components/shared/modal-container';
import { registerDemo } from '@/lib/auth/admin/register-demo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineUser } from 'react-icons/hi';
import { HiOutlinePhone } from 'react-icons/hi2';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { z } from 'zod';

// Zod validation schema
const demoProfileSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    surName: z
      .string()
      .min(2, 'Surname must be at least 2 characters')
      .max(50, 'Surname must be less than 50 characters'),
    email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
        'Password must contain at least one uppercase, one lowercase, one number, and one special character'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type DemoProfileFormData = z.infer<typeof demoProfileSchema>;

interface DemoProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DemoProfileModal({ isOpen, onClose, onSuccess }: DemoProfileModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<DemoProfileFormData>({
    resolver: zodResolver(demoProfileSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      surName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: DemoProfileFormData) => {
    setIsSubmitting(true);
    try {
      // Parse phone number to extract country code and mobile
      const phoneNumberParsed = parsePhoneNumber(data.phoneNumber as any);

      if (!phoneNumberParsed) {
        toast.error('Invalid phone number format');
        setIsSubmitting(false);
        return;
      }

      const payload = {
        email: data.email,
        mobile: phoneNumberParsed.nationalNumber,
        countryCode: `+${phoneNumberParsed.countryCallingCode}`,
        surName: data.surName,
        name: data.name,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const response = await registerDemo(payload);

      if (response) {
        toast.success(response.message || 'Demo account created successfully!');
      } else {
        toast.success('Demo account created successfully!');
      }

      reset();
      setShowPassword(false);
      setShowConfirmPassword(false);
      onClose();

      // Refresh the user list after successful creation
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Error creating DEMO account:', error);
      const errorMessage =
        error?.response?.data?.message || error?.message || 'Failed to create demo account';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  return (
    <ModalContainer
      modalId="demo-profile"
      isOpen={isOpen}
      onClose={handleClose}
      modalContentClassName="max-w-4xl rounded-xl box-3d bg-dark p-6 text-white"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-gradient text-2xl font-bold">DEMO Profile</h2>
        <IoIosCloseCircleOutline
          className="size-6 h-6 w-6 shrink-0 cursor-pointer text-white"
          onClick={handleClose}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="w-full space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                <HiOutlineUser className="h-5 w-5 shrink-0 text-white" />
                Name *
              </label>
              <input
                type="text"
                {...register('name')}
                placeholder="Enter first name"
                className={`placeholder-gray-400 w-full rounded-full bg-light px-6 py-3 text-sm text-white transition-colors focus:outline-none ${
                  errors.name
                    ? 'border-2 border-brand-red'
                    : 'border-2 border-transparent focus:border-[#1C83FF]'
                }`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                <HiOutlineUser className="h-5 w-5 shrink-0 text-white" />
                Surname *
              </label>
              <input
                type="text"
                {...register('surName')}
                placeholder="Enter surname"
                className={`placeholder-gray-400 w-full rounded-full bg-light px-6 py-3 text-sm text-white transition-colors focus:outline-none ${
                  errors.surName
                    ? 'border-2 border-brand-red'
                    : 'border-2 border-transparent focus:border-[#1C83FF]'
                }`}
              />
              {errors.surName && (
                <p className="mt-1 text-xs text-red-400">{errors.surName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                <HiOutlineMail className="h-5 w-5 shrink-0 text-white" />
                Email *
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="Enter email address"
                className={`placeholder-gray-400 w-full rounded-full bg-light px-6 py-3 text-sm text-white transition-colors focus:outline-none ${
                  errors.email
                    ? 'border-2 border-brand-red'
                    : 'border-2 border-transparent focus:border-[#1C83FF]'
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                <HiOutlinePhone className="h-5 w-5 shrink-0 text-white" />
                Phone Number (with country code) *
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={field.value as any}
                    onChange={field.onChange}
                    defaultCountry="US"
                    className={`w-full rounded-full bg-light px-6 py-3 text-sm text-white transition-colors focus:outline-none ${
                      errors.phoneNumber
                        ? 'border-2 border-brand-red'
                        : 'border-2 border-transparent focus:border-[#1C83FF]'
                    } [&>input]:placeholder-gray-400 [&>input]:border-0 [&>input]:bg-light [&>input]:text-white [&>input]:outline-none [&>input]:ring-0`}
                  />
                )}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-400">{errors.phoneNumber.message as string}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                <HiOutlineLockClosed className="h-5 w-5 shrink-0 text-white" />
                Password *
              </label>
              <div
                className={`flex items-center rounded-full bg-light px-6 py-3 text-sm transition-colors ${
                  errors.password
                    ? 'border-2 border-brand-red'
                    : 'border-2 border-transparent focus-within:border-[#1C83FF]'
                }`}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Enter password"
                  className="placeholder-gray-400 w-full flex-grow bg-transparent text-white focus:outline-none focus:ring-0"
                />
                <span
                  className="size-5 flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaRegEye className="size-[18px]" />
                  ) : (
                    <FaRegEyeSlash className="size-[18px]" />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                <HiOutlineLockClosed className="h-5 w-5 shrink-0  text-white" />
                Confirm Password *
              </label>
              <div
                className={`flex items-center rounded-full bg-light px-6 py-3 text-sm transition-colors ${
                  errors.confirmPassword
                    ? 'border-2 border-brand-red'
                    : 'border-2 border-transparent focus-within:border-[#1C83FF]'
                }`}
              >
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  placeholder="Confirm password"
                  className="placeholder-gray-400 w-full flex-grow bg-transparent text-white focus:outline-none focus:ring-0"
                />
                <span
                  className="size-5 flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaRegEye className="size-[18px]" />
                  ) : (
                    <FaRegEyeSlash className="size-[18px]" />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-between border-t border-white/10 pt-6">
          <p className="text-xs italic text-white/60">
            * All fields marked with an asterisk (*) are mandatory
          </p>
          <Button
            title={isSubmitting ? 'CREATING...' : 'ADD DEMO ACCOUNT'}
            variant="confirm"
            size="lg"
            compact
            className="font-medium uppercase disabled:opacity-50"
            type="submit"
            disabled={isSubmitting || !isValid}
            loaderIcon={isSubmitting && <CgSpinner className="size-5 mx-auto animate-spin" />}
          />
        </div>
      </form>
    </ModalContainer>
  );
}
