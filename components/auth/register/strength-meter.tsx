import cn from '@/utils/cn';

export const calculatePasswordStrength = (password: string) => {
  let score = 0;
  if (password?.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

export const PasswordStrengthMeter: React.FC<{ strength: number }> = ({ strength }) => {
  const getStrengthLabel = () => {
    if (strength <= 1) return 'Very weak';
    if (strength === 2) return 'Weak';
    if (strength === 3) return 'Fair';
    if (strength === 4) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 1:
        return 'bg-brand-red';
      case 2:
        return 'bg-brand-gold';
      case 3:
        return 'bg-brand-gold';
      case 4:
        return 'bg-brand-gold';
      case 5:
        return 'bg-brand-mint';
      default:
        return 'bg-white/20';
    }
  };

  return (
    <div className="mt-2 w-full">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-white/70">Password strength</span>
        <span
          className={cn(
            'font-medium',
            strength <= 1
              ? 'text-brand-red'
              : strength <= 3
                ? 'text-brand-gold'
                : strength === 4
                  ? 'text-white'
                  : 'text-brand-mint'
          )}
        >
          {getStrengthLabel()}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/20">
        <div
          className={cn('h-2 rounded-full transition-all duration-200', getStrengthColor())}
          style={{ width: `${(strength / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
