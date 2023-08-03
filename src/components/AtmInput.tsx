import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type AtmInputProps = {
  onNumberInputPress: (currentInput: string) => void;
  onEnterPress?: (currentInput: string) => void;
  onClearPress?: () => void;
  onCancelPress?: () => void;
  maxInput?: number;
  hideCancel?: boolean;
  enterLoading?: boolean;
};

export const AtmInput: React.FC<AtmInputProps> = ({
  onNumberInputPress,
  onEnterPress,
  onClearPress,
  onCancelPress,
  maxInput = 15,
  hideCancel = false,
  enterLoading = false,
}) => {
  const [currentInput, setCurrentInput] = useState('');
  const [disableNumberInput, setDisableNumberInput] = useState(false);

  const numberButtonPressedHandler = (numberPressed: string) => {
    setCurrentInput((prev) => prev.concat(numberPressed));
  };

  const enterButtonPressedHandler = () => {
    if (onEnterPress) {
      onEnterPress(currentInput);
    }
  };

  const clearButtonPressedHandler = () => {
    setCurrentInput('');
    if (onClearPress) {
      onClearPress();
    }
  };

  const cancelButtonPressedHandler = () => {
    if (onCancelPress) {
      onCancelPress();
    }
  };

  useEffect(() => {
    if (onNumberInputPress) {
      onNumberInputPress(currentInput);
      if (currentInput.length >= maxInput) {
        setDisableNumberInput(true);
      } else {
        setDisableNumberInput(false);
      }
    }
  }, [currentInput, maxInput, onNumberInputPress]);

  return (
    <div className="flex flex-row gap-12">
      <div className="grid grid-cols-3 gap-10">
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('1')}
          size={'lg'}
        >
          1
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('2')}
          size={'lg'}
        >
          2
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('3')}
          size={'lg'}
        >
          3
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('4')}
          size={'lg'}
        >
          4
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('5')}
          size={'lg'}
        >
          5
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('6')}
          size={'lg'}
        >
          6
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('7')}
          size={'lg'}
        >
          7
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('8')}
          size={'lg'}
        >
          8
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('9')}
          size={'lg'}
        >
          9
        </Button>
        <Button
          isDisabled={true}
          size={'lg'}
        ></Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('0')}
          size={'lg'}
        >
          0
        </Button>
        <Button
          isDisabled={true}
          size={'lg'}
        ></Button>
      </div>

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
        <Button
          colorScheme="yellow"
          onClick={clearButtonPressedHandler}
          size={'lg'}
        >
          CLEAR
        </Button>
        <Button
          colorScheme="green"
          onClick={enterButtonPressedHandler}
          size={'lg'}
          isLoading={enterLoading}
        >
          ENTER
        </Button>
        <Button
          isDisabled={true}
          size={'lg'}
        ></Button>
      </div>
    </div>
  );
};
