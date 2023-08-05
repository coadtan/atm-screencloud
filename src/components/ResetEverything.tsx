import { Button, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from '@tanstack/router';
import { useBalanceStore } from '../stores/balanceStore';
import { useAuthStore } from '../stores/authStore';
import { useNoteStore } from '../stores/noteStore';

export const ResetEverything: React.FC = () => {
  const navigate = useNavigate();
  const resetBalance = useBalanceStore((state) => state.reset);
  const unauthenticated = useAuthStore((state) => state.unauthenticated);
  const resetNotes = useNoteStore((state) => state.resetNotes);

  const resetHandler = () => {
    unauthenticated();
    resetBalance();
    resetNotes();
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
