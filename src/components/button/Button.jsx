import { cn } from '@/lib/utils';

export const Button = ({ children, className, onClick, type, disabled }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        'py-2 px-3 rounded-md bg-amber-500 font-bold cursor-pointer',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
