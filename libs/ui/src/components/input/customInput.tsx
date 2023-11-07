import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from 'react';
import { cn } from '../../lib';


type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: string;
};

export const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { className, error, ...rest } = props;
    return (
      <div className="space-y-2">
        <input
          {...rest}
          ref={ref}
          className={cn(
            'bg-gray-100 w-full border-gray-100 px-3 py-[6px] focus:ring-0 focus:border-gray-300 focus:bg-white focus:outline-none',
            className
          )}
        />
        <small
          className={cn('text-red-500 inline-block animate__animated', {
            animate__headShake: error,
          })}
        >
          {error}
        </small>
      </div>
    );
  }
);