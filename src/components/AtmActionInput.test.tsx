import { fireEvent, render } from '@testing-library/react';
import { AtmActionInput } from './AtmActionInput';

describe(AtmActionInput, () => {
  describe('event handler', () => {
    test('should call onEnterPress props when press "Enter"', () => {
      const mockedFn = vi.fn();

      const view = render(<AtmActionInput onEnterPress={mockedFn} />);

      fireEvent.click(view.getByText(/ENTER/i));

      expect(mockedFn).toBeCalledTimes(1);
    });

    test('should call onClearPress props when press "CLEAR"', () => {
      const mockedFn = vi.fn();

      const view = render(<AtmActionInput onClearPress={mockedFn} />);

      fireEvent.click(view.getByText(/CLEAR/i));

      expect(mockedFn).toBeCalledTimes(1);
    });

    test('should call onCancelPress props when press "CANCEL"', () => {
      const mockedFn = vi.fn();

      const view = render(<AtmActionInput onCancelPress={mockedFn} />);

      fireEvent.click(view.getByText(/CANCEL/i));

      expect(mockedFn).toBeCalledTimes(1);
    });
  });

  describe('props', () => {
    test('should hide cancel button when "hideCancel" props is true', () => {
      const view = render(<AtmActionInput hideCancel={true} />);

      expect(view.queryByText(/CANCEL/i)).toBeNull();
    });

    test('should display cancel button when "hideCancel" props is false', () => {
      const view = render(<AtmActionInput hideCancel={false} />);

      expect(view.findByText(/CANCEL/i)).toBeDefined();
    });

    test('should display loading when "enterLoading" props is true', () => {
      const view = render(<AtmActionInput enterLoading={true} />);

      expect(view.findByText(/Loading/i)).toBeDefined();
    });

    test('should not display loading when "enterLoading" props is false', () => {
      const view = render(<AtmActionInput enterLoading={false} />);

      expect(view.queryByText(/Loading/i)).toBeNull();
    });

    test('should hide clear button when "hideClear" props is true', () => {
      const view = render(<AtmActionInput hideClear={true} />);

      expect(view.queryByText(/CLEAR/i)).toBeNull();
    });

    test('should display clear button when "hideClear" props is false', () => {
      const view = render(<AtmActionInput hideClear={false} />);

      expect(view.findByText(/CLEAR/i)).toBeDefined();
    });

    test('should hide enter button when "hideEnter" props is true', () => {
      const view = render(<AtmActionInput hideEnter={true} />);

      expect(view.queryByText(/ENTER/i)).toBeNull();
    });

    test('should display enter button when "hideEnter" props is false', () => {
      const view = render(<AtmActionInput hideEnter={false} />);

      expect(view.findByText(/ENTER/i)).toBeDefined();
    });
  });
});
