import { Button, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { removeAuthKey, removeBalanceKey } from '../localStorage/atmStorage';
import { useNavigate } from '@tanstack/router';

export const ResetEverything: React.FC = () => {
  const navigate = useNavigate();

  const resetHandler = () => {
    removeAuthKey();
    removeBalanceKey();
    navigate({ to: '/' });
  };

  return (
    <>
      <Tooltip label="This is for convenience so we do not need to remove local storage and change URL manually">
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
