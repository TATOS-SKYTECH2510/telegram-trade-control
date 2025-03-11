
import React from 'react';
import { cn } from '@/lib/utils';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  description?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ToggleSwitch = ({
  checked,
  onChange,
  label,
  description,
  className,
  size = 'md',
}: ToggleSwitchProps) => {
  const dimensions = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7',
    },
  };

  const { track, thumb, translate } = dimensions[size];

  return (
    <div className={cn("flex items-center", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={cn(
          "relative inline-flex flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          track,
          checked ? 'bg-primary' : 'bg-secondary'
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
            thumb,
            checked ? translate : 'translate-x-0',
            size === 'md' && 'mt-0.5 ml-0.5',
            size === 'lg' && 'mt-0.5 ml-0.5',
            size === 'sm' && 'mt-0.5 ml-0.5',
          )}
        />
      </button>
      
      {(label || description) && (
        <div className="ml-3">
          {label && (
            <div className="text-sm font-medium">{label}</div>
          )}
          {description && (
            <div className="text-xs text-muted-foreground">{description}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ToggleSwitch;
