import { fireEvent, render } from '@testing-library/react';
import { AtmNumberInput } from './AtmNumberInput';

describe(AtmNumberInput, () => {
  describe('number button handler', () => {
    test.each(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])(
      'should call onNumberInputPress prop with %s',
      (buttonNumber) => {
        const mockedFn = vi.fn();

        const view = render(<AtmNumberInput onNumberInputPress={mockedFn} />);

        fireEvent.click(view.getByText(buttonNumber));

        expect(mockedFn).toHaveBeenCalledWith(buttonNumber);
      },
    );
  });
});
