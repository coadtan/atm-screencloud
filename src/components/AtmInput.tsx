import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type AtmInputProps = {
  onNumberInputPress: (currentInput: string) => void;
  maxInput?: number;
};

export const AtmInput: React.FC<AtmInputProps> = ({
  onNumberInputPress,
  maxInput = 15,
}) => {
  const [currentInput, setCurrentInput] = useState('');
  const [disableNumberInput, setDisableNumberInput] = useState(false);

  const numberButtonPressedHandler = (numberPressed: string) => {
    setCurrentInput((prev) => prev.concat(numberPressed));
  };

  const clearButtonPressedHandler = () => {
    setCurrentInput('');
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
        >
          1
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('2')}
        >
          2
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('3')}
        >
          3
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('4')}
        >
          4
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('5')}
        >
          5
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('6')}
        >
          6
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('7')}
        >
          7
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('8')}
        >
          8
        </Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('9')}
        >
          9
        </Button>
        <Button isDisabled={true}></Button>
        <Button
          isDisabled={disableNumberInput}
          onClick={() => numberButtonPressedHandler('0')}
        >
          0
        </Button>
        <Button isDisabled={true}></Button>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <Button colorScheme="red">CANCEL</Button>
        <Button
          colorScheme="yellow"
          onClick={clearButtonPressedHandler}
        >
          CLEAR
        </Button>
        <Button colorScheme="green">ENTER</Button>
        <Button isDisabled={true}></Button>
      </div>
    </div>
  );
};
