import React, { type ReactElement } from 'react';

type AtmScreenProps = {
  children: ReactElement;
};

export const AtmScreen: React.FC<AtmScreenProps> = ({ children }) => {
  return <div className="h-80 border p-2">{children}</div>;
};
