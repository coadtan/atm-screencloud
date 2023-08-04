import React, { type ReactElement } from 'react';

type AtmScreenWrapperProps = {
  children: ReactElement | ReactElement[];
};

export const AtmScreenWrapper: React.FC<AtmScreenWrapperProps> = ({
  children,
}) => {
  return <div className="h-80 border p-2">{children}</div>;
};
