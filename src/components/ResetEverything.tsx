import { Button, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { useResetScenario } from '../hooks/useResetScenario';

export const ResetEverything: React.FC = () => {
  const resetScenario = useResetScenario();

  const resetHandler = () => {
    resetScenario();
  };

  return (
    <>
      <Tooltip label="This is for convenience to go reset everything like user auth state and ATM's remaining notes">
        <Button
          colorScheme="gray"
          onClick={resetHandler}
        >
          Reset Scenario
        </Button>
      </Tooltip>
    </>
  );
};
