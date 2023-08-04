import { Button, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { removeAuthKey } from '../localStorage/atmStorage';
import { useNavigate } from '@tanstack/router';
import { useBalanceStore } from '../stores/balanceStore';

export const ResetEverything: React.FC = () => {
  const navigate = useNavigate();
  const resetBalance = useBalanceStore((state) => state.reset);

  const resetHandler = () => {
    removeAuthKey();
    navigate({ to: '/' });
    resetBalance();
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
