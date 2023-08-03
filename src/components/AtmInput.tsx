import { Button } from '@chakra-ui/react';
import { useState } from 'react';

export const AtmInput: React.FC = () => {
  const [_currentValue, setCurrentValue] = useState('');

  const numberButtonPressedHandler = (numberPressed: string) => {
    setCurrentValue((prev) => prev.concat(numberPressed));
  };

  const clearButtonPressedHandler = () => {
    setCurrentValue('');
  };

  return (
    <div className="flex flex-row gap-12">
      <div className="grid grid-cols-3 gap-10">
        <Button onClick={() => numberButtonPressedHandler('1')}>1</Button>
        <Button onClick={() => numberButtonPressedHandler('2')}>2</Button>
        <Button onClick={() => numberButtonPressedHandler('3')}>3</Button>
        <Button onClick={() => numberButtonPressedHandler('4')}>4</Button>
        <Button onClick={() => numberButtonPressedHandler('5')}>5</Button>
        <Button onClick={() => numberButtonPressedHandler('6')}>6</Button>
        <Button onClick={() => numberButtonPressedHandler('7')}>7</Button>
        <Button onClick={() => numberButtonPressedHandler('8')}>8</Button>
        <Button onClick={() => numberButtonPressedHandler('9')}>9</Button>
        <Button isDisabled={true}></Button>
        <Button onClick={() => numberButtonPressedHandler('0')}>0</Button>
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
