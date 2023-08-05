import React, { type ReactElement } from 'react';
import { twMerge, type ClassNameValue } from 'tailwind-merge';

type AtmScreenWrapperProps = {
  children: ReactElement | ReactElement[];
  className?: ClassNameValue;
};

export const AtmScreenWrapper: React.FC<AtmScreenWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div className={twMerge('flex h-96 flex-col border p-2', className)}>
      {children}
    </div>
  );
};
