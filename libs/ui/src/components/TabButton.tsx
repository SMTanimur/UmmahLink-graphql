
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, type FC, type ReactNode } from 'react';
import { cn } from '..';

interface TabButtonProps {
  name: string;
  icon?: ReactNode;
  active: boolean;
  type?: string;
  count?: string;
  className?: string;
  showOnSm?: boolean;
  onClick: () => void;
}

export const TabButton: FC<TabButtonProps> = ({
  name,
  icon,
  active,
  type,
  count,
  showOnSm = false,
  className = '',
  onClick
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!
 
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (type:any,value:string) => {
      const params = new URLSearchParams(searchParams)
      params.set(type, value)
 
      return params.toString()
    },
    [searchParams]
  )

  return (
    <button
      type="button"
      onClick={() => {
        if (type) {
          router.push(pathname + '?' + createQueryString('type',type))
        }
        onClick();
      }}
      className={cn(
        { 'text-brand bg-brand-100 dark:bg-brand-300/20': active },
        'flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 sm:px-3 sm:py-1.5',
        'hover:bg-brand-100/80 dark:hover:bg-brand-300/30 justify-center',
        className
      )}
      data-testid={`tab-button-${name.toLowerCase()}`}
      aria-label={name}
    >
      {icon}
      <span className={cn({ 'hidden sm:block': !showOnSm })}>{name}</span>
      {count && (
        <span
          className={cn(
            active
              ? 'bg-brand-500 dark:bg-brand-500/80 text-white dark:text-white'
              : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
            'ml-2 rounded-2xl px-2 py-0.5 text-xs font-bold'
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
};

