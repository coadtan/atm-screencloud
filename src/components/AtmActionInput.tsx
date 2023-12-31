import { Button } from '@chakra-ui/react';

type AtmActionInputProps = {
  onEnterPress?: () => void;
  onClearPress?: () => void;
  onCancelPress?: () => void;
  hideCancel?: boolean;
  hideClear?: boolean;
  hideEnter?: boolean;
  enterLoading?: boolean;
};

export const AtmActionInput: React.FC<AtmActionInputProps> = ({
  onEnterPress,
  onClearPress,
  onCancelPress,
  hideCancel = false,
  hideClear = false,
  hideEnter = false,
  enterLoading = false,
}) => {
  const enterButtonPressedHandler = () => {
    if (onEnterPress) {
      onEnterPress();
    }
  };

  const clearButtonPressedHandler = () => {
    if (onClearPress) {
      onClearPress();
    }
  };

  const cancelButtonPressedHandler = () => {
    if (onCancelPress) {
      onCancelPress();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      {hideCancel ? (
        <Button
          isDisabled={true}
          size={'lg'}
        ></Button>
      ) : (
        <Button
          colorScheme="red"
          onClick={cancelButtonPressedHandler}
          size={'lg'}
        >
          CANCEL
        </Button>
      )}
      {hideClear ? (
        <Button
          isDisabled={true}
          size={'lg'}
        ></Button>
      ) : (
        <Button
          colorScheme="yellow"
          onClick={clearButtonPressedHandler}
          size={'lg'}
        >
          CLEAR
        </Button>
      )}
      {hideEnter ? (
        <Button
          isDisabled={true}
          size={'lg'}
        ></Button>
      ) : (
        <Button
          colorScheme="green"
          onClick={enterButtonPressedHandler}
          size={'lg'}
          isLoading={enterLoading}
        >
          ENTER
        </Button>
      )}
      <Button
        isDisabled={true}
        size={'lg'}
      ></Button>
    </div>
  );
};
