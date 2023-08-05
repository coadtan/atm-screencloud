import React from 'react';
import { AtmScreenWrapper } from '../components/AtmScreenWrapper';
import { AtmInputWrapper } from '../components/AtmInputWrapper';
import { AtmNumberInput } from '../components/AtmNumberInput';
import { AtmActionInput } from '../components/AtmActionInput';
import { useCheckAuth } from '../hooks/useCheckAuth';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from '@tanstack/router';
import { useResetScenario } from '../hooks/useResetScenario';
import { UserBalance } from '../components/UserBalance';
import { IconCashBanknote, IconHistory } from '@tabler/icons-react';

export const AtmPage: React.FC = () => {
  useCheckAuth();
  const navigate = useNavigate();
  const resetScenario = useResetScenario();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const goToWithDraw = () => {
    navigate({ to: '/withdraw' });
  };

  const goToHistory = () => {
    navigate({ to: '/history' });
  };

  const cancelInputPressHandler = () => {
    onOpen();
  };

  return (
    <>
      <AtmScreenWrapper>
        <div className="mt-16 flex flex-col items-center gap-8">
          <div className="border p-4 text-center shadow-sm">
            <UserBalance />
          </div>
          <div className="flex gap-8">
            <Button
              colorScheme="green"
              leftIcon={<IconCashBanknote />}
              onClick={goToWithDraw}
            >
              Withdraw
            </Button>
            <Button
              leftIcon={<IconHistory />}
              variant={'outline'}
              onClick={goToHistory}
            >
              History
            </Button>
          </div>
        </div>
      </AtmScreenWrapper>
      <AtmInputWrapper>
        <AtmNumberInput
          onNumberInputPress={() => {}}
          isDisabled
        />
        <AtmActionInput
          onCancelPress={cancelInputPressHandler}
          hideClear
          hideEnter
        />
      </AtmInputWrapper>
      <AlertDialog
        motionPreset="slideInBottom"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
            >
              Logging Out
            </AlertDialogHeader>

            <AlertDialogBody>
              By clicking <span className="font-bold">Logout</span> you will be
              redirected to the ATM login page. Please note that your current
              actions will be lost.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  resetScenario();
                }}
                ml={3}
              >
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
