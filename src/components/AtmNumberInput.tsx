import { Button } from '@chakra-ui/react';

type AtmNumberInputProps = {
  onNumberInputPress: (currentInput: string) => void;
  isDisabled?: boolean;
};

export const AtmNumberInput: React.FC<AtmNumberInputProps> = ({
  onNumberInputPress,
  isDisabled = false,
}) => {
  const numberButtonPressedHandler = (numberPressed: string) => {
    onNumberInputPress(numberPressed);
  };

  return (
    <div className="grid grid-cols-3 gap-10">
      <Button
        isDisabled={isDisabled}
        onClick={() => numberButtonPressedHandler('1')}
        size={'lg'}
      >
        1
      </Button>
      <Button
        isDisabled={isDisabled}
        onClick={() => numberButtonPressedHandler('2')}
        size={'lg'}
      >
        2
      </Button>
      <Button
        isDisabled={isDisabled}
        onClick={() => numberButtonPressedHandler('3')}
        size={'lg'}
      >
        3
      </Button>
      <Button
        isDisabled={isDisabled}
        onClick={() => numberButtonPressedHandler('4')}
        size={'lg'}
      >
        4
      </Button>
      <Button
        isDisabled={isDisabled}
        onClick={() => numberButtonPressedHandler('5')}
        size={'lg'}
      >
        5
      </Button>
      <Button
        isDisabled={isDisabled}
        onClick={() => numberButtonPressedHandler('6')}
        size={'lg'}
      >
        6
      </Button>
      <Button
        isDisabled={isDisabled}
        onClick={() => numberButtonPressedHandler('7')}
        size={'lg'}
      >
        7
      </Button>
      <Button
        isDisabled={isDisabled}
        onClick={() => numberButtonPressedHandler('8')}
        size={'lg'}
      >
        8
      </Button>
      <Button
        isDisabled={isDisabled}
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
        isDisabled={isDisabled}
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
  );
};
