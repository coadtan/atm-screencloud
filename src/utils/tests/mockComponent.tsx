import React from 'react';
import type { MockedFunction } from 'vitest';

export const mockComponent = <Props,>(
  component: React.FC<Props>,
): MockedFunction<React.FC<Props>> =>
  vi.mocked(component).mockReturnValue(<p>{component.name}</p>);
