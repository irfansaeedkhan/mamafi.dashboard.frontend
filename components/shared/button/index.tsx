import cn from '@/utils/cn';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?:
    | 'primary'
    | 'primary-new'
    | 'secondary'
    | 'outline'
    | 'outline-new'
    | 'danger'
    | 'warning'
    | 'tertiary'
    | 'underline'
    | 'underline-gradient'
    | 'pending'
    | 'outlineBlue'
    | 'approved'
    | 'golden'
    | 'confirm'
    | 'confirm-secondary'
    | 'confirm-danger';

  IconStart?: React.ReactNode;
  IconEnd?: React.ReactNode;
  borderRounded?: string;
  backgroundColor?: string;
  loaderIcon?: React.ReactNode;
  outlineBG?: string;
  outlineBGNew?: string;
  compact?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'lg';
}

interface CustomCSSProperties extends React.CSSProperties {
  '--border-rounded': string;
  '--background-color': string;
  '--outline-bg'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'confirm',
  className,
  IconStart,
  IconEnd,
  loaderIcon,
  borderRounded = '14px',
  backgroundColor = '#BCE300',
  outlineBG = 'light',
  outlineBGNew = 'bg-brand-gray',
  compact = true,
  fullWidth,
  size = 'lg',
  ...props
}) => {
  const classStr = typeof className === 'string' ? className : '';
  const isFullWidth = fullWidth ?? /w-full|full\s*width|fullwidth/i.test(classStr);
  const cleanClassName = classStr.replace(/\b(?:md:|lg:|sm:)?!?py-[^\s]+/g, '').replace(/\s+/g, ' ').trim() || undefined;

  const customStyles: CustomCSSProperties = {
    '--border-rounded': borderRounded,
    '--background-color': backgroundColor,
  };

  const customStylesNew: CustomCSSProperties = {
    '--border-rounded': borderRounded,
    '--background-color': backgroundColor,
    '--outline-bg': outlineBGNew,
  };

  if (variant === 'confirm' || variant === 'confirm-secondary' || variant === 'confirm-danger') {
    const isSecondary = variant === 'confirm-secondary';
    const isDanger = variant === 'confirm-danger';

    return (
      <span className={cn('btn-confirm-wrapper', cleanClassName, isFullWidth && 'w-full')}>
        <span
          className={cn(
            'btn-confirm-blue-glow',
            isSecondary && 'btn-confirm-blue-glow-secondary',
            isDanger && 'btn-confirm-blue-glow-danger'
          )}
          aria-hidden
        />
        <span className="btn-confirm-orb" aria-hidden />
        <button
          className={cn(
            'btn-confirm',
            isSecondary && 'btn-confirm-secondary',
            isDanger && 'btn-confirm-danger',
            compact && 'btn-confirm-compact',
            isFullWidth && 'btn-confirm-full',
            size === 'sm' && 'btn-confirm-sm',
            props.disabled && 'cursor-not-allowed'
          )}
          {...props}
          disabled={props.disabled}
        >
          <span className="relative z-[3] flex items-center justify-center gap-2 whitespace-nowrap">
            {IconStart && <span className="shrink-0">{IconStart}</span>}
            <span className="font-nexablack leading-none text-white">
              {loaderIcon ? loaderIcon : title}
            </span>
            {IconEnd && <span className="shrink-0">{IconEnd}</span>}
          </span>
        </button>
      </span>
    );
  }

  const isSm = size === 'sm';
  return (
    <button
      className={cn(
        'relative flex items-center justify-center gap-2 rounded-full uppercase transition duration-200 ease-in-out',
        isSm ? 'min-h-[28px] px-4 py-1 text-[9px]' : 'px-3 py-2.5 text-[0.625rem] md:px-4 md:py-3',
        variant === 'danger' && 'bg-gradient-pattern-red',
        variant === 'golden' && 'bg-brand-gold',
        variant === 'primary-new' && 'bg-gradient-pattern-new',
        variant === 'outline' && 'relative',
        variant === 'outline-new' && 'relative',
        variant === 'outlineBlue' && 'relative border border-brand-gold',
        variant === 'secondary' &&
          'hover:bg-blue-shade-1 border border-[#00020A] bg-light shadow-[0px_1px_2px_0px_rgba(16_24_40_0.05)] hover:text-white',
        variant === 'tertiary' && 'bg-blue-shade-1 text-white',
        variant === 'underline' && 'text-white underline',
        variant === 'underline-gradient' && 'text-gradient',
        variant === 'pending' &&
          'rounded-full border border-brand-red bg-brand-red !px-3 !py-1 !text-xs text-[#FF6565]',
        variant === 'approved' &&
          'border-brand-mint-shade-1 bg-brand-mint-shade-2 text-brand-mint-shade-1 rounded-full border !px-3 !py-1 !text-xs',
        className,
        props.disabled && 'cursor-not-allowed opacity-50'
      )}
      {...props}
      style={
        variant === 'primary-new'
          ? customStylesNew
          : variant === 'outline-new'
            ? customStylesNew
            : undefined
      }
      disabled={props.disabled}
    >
      <span className="relative z-[5] mt-[2px] flex items-center justify-center truncate md:mt-0">
        {IconStart && IconStart}
        <span
          className={cn(
            'font-nexablack font-black leading-[normal]',
            variant === 'danger' && 'text-white',
            variant === 'outline' && 'text-gradient',
            variant === 'outline-new' && 'text-gradient',
            variant === 'outlineBlue' && 'text-gradient',
            variant === 'tertiary' && 'text-white',
            variant === 'underline-gradient' && 'text-gradient gradient-border-bottom'
          )}
        >
          {loaderIcon ? loaderIcon : title}
        </span>
        {IconEnd && IconEnd}
      </span>

      {variant === 'outline' && (
        <span className="absolute inset-0 z-0 w-full rounded-xl bg-gradient-pattern p-px">
          <span className={`block bg-${outlineBG} h-full w-full rounded-xl`}></span>
        </span>
      )}

      {variant === 'outline-new' && (
        <span className="absolute inset-0 z-0 w-full rounded-xl bg-gradient-pattern p-px">
          <span className={`block ${outlineBGNew} h-full w-full rounded-xl`}></span>
        </span>
      )}
    </button>
  );
};