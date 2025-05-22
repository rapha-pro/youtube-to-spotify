import { ButtonProps } from '@/types';

export const Button: React.FC<ButtonProps> = ({
  color = 'default',
  variant = 'filled',
  size = 'md',
  className,
  onClick,
  children,
}) => {
  const baseStyles = 'rounded focus:outline-none transition duration-200';
  const colorStyles = {
    default: 'bg-gray-800 text-white',
    success: 'bg-green-500 text-white',
    danger: 'bg-red-500 text-white',
  };
  const variantStyles = {
    shadow: 'shadow-lg',
    outline: 'border border-gray-600',
    filled: '',
  };
  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6',
    lg: 'py-4 px-8 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${colorStyles[color]} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};