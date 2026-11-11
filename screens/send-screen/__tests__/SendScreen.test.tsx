import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import SendScreen from '../send-screen';

import { useExchangeRates } from '../use-exchange-rates';

jest.mock('../use-exchange-rates', () => ({
  useExchangeRates: jest.fn(),
}));

describe('SendScreen (TypeScript)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  it('renders loading state while rates are loading', async () => {
    (useExchangeRates as jest.Mock).mockReturnValue({
      rates: {},
      loadingRates: true,
    });

    const { getByTestId } = await render(<SendScreen />);
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('renders converted amount correctly after rates load', async () => {
    (useExchangeRates as jest.Mock).mockReturnValue({
      rates: { KES: 150, NGN: 700, TZS: 2600, UGX: 3700, USD: 1 },
      loadingRates: false,
    });

    const { getByPlaceholderText, getByText } = await render(<SendScreen />);

    await fireEvent.changeText(getByPlaceholderText('0'), '10');

    await waitFor(() => {
      expect(getByText('1500.00 KES')).toBeTruthy();
    });
  });

  it('shows validation alert if first or last name is missing', async () => {
    (useExchangeRates as jest.Mock).mockReturnValue({
      rates: { KES: 150, NGN: 700, TZS: 2600, UGX: 3700, USD: 1 },
      loadingRates: false,
    });

    const { getByTestId } = await render(<SendScreen />);
    await fireEvent.press(getByTestId('send-button'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Validation',
      'Please enter both first and last name.'
    );
  });

  it('shows validation alert for invalid phone number', async () => {
    (useExchangeRates as jest.Mock).mockReturnValue({
      rates: { KES: 150, NGN: 700, TZS: 2600, UGX: 3700, USD: 1 },
      loadingRates: false,
    });

    const { getByPlaceholderText, getByTestId } = await render(<SendScreen />);

    await fireEvent.changeText(getByPlaceholderText('First name'), 'John');
    await fireEvent.changeText(getByPlaceholderText('Last name'), 'Doe');
    await fireEvent.changeText(getByPlaceholderText('e.g. 712345678'), '123');

    await fireEvent.press(getByTestId('send-button'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Validation',
      'Phone number invalid for selected country.'
    );
  });

  it('shows validation alert for invalid USD amount', async () => {
    (useExchangeRates as jest.Mock).mockReturnValue({
      rates: { KES: 150, NGN: 700, TZS: 2600, UGX: 3700, USD: 1 },
      loadingRates: false,
    });

    const { getByPlaceholderText, getByTestId } = await render(<SendScreen />);

    await fireEvent.changeText(getByPlaceholderText('First name'), 'John');
    await fireEvent.changeText(getByPlaceholderText('Last name'), 'Doe');
    await fireEvent.changeText(getByPlaceholderText('e.g. 712345678'), '712345678');
    await fireEvent.changeText(getByPlaceholderText('0'), '');

    await fireEvent.press(getByTestId('send-button'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Validation',
      'Please enter a valid USD amount (no decimals).'
    );
  });

  it('shows success alert after sending', async () => {
    jest.useFakeTimers();

    (useExchangeRates as jest.Mock).mockReturnValue({
      rates: { KES: 150, NGN: 700, TZS: 2600, UGX: 3700, USD: 1 },
      loadingRates: false,
    });

    const { getByPlaceholderText, getByTestId } = await render(<SendScreen />);

    await fireEvent.changeText(getByPlaceholderText('First name'), 'John');
    await fireEvent.changeText(getByPlaceholderText('Last name'), 'Doe');
    await fireEvent.changeText(getByPlaceholderText('e.g. 712345678'), '712345678');
    await fireEvent.changeText(getByPlaceholderText('0'), '10');

    await fireEvent.press(getByTestId('send-button'));

    jest.runAllTimers();

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Success',
        `Transaction Details:
          Recipient: John Doe
          Phone: +254 712345678
          Amount: 1500.00 KES`
      );
    });

    jest.useRealTimers();
  });
});
