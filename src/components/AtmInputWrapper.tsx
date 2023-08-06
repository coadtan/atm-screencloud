import type { ReactElement } from 'react';

type AtmInputWrapperProps = {
  children: ReactElement[];
};

export const AtmInputWrapper: React.FC<AtmInputWrapperProps> = ({
  children,
}) => {
  return <div className="flex flex-row gap-12">{children}</div>;
};
