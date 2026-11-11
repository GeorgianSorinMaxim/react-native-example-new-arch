import { renderHook, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useExchangeRates } from '../use-exchange-rates';

describe('useExchangeRates', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('fetches rates from API when API key is present', async () => {
    const mockRates = {
      KES: 100,
      NGN: 200,
      TZS: 300,
      UGX: 4000,
      USD: 1,
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ rates: mockRates }),
      }) as any
    );

    const { result } = await renderHook(() => useExchangeRates());

    await waitFor(() => expect(result.current.loadingRates).toBe(false));

    expect(global.fetch).toHaveBeenCalledWith(
      'https://openexchangerates.org/api/latest.json?app_id=8171f465ca0e4f3aba9e31687ecc40da&symbols=KES,NGN,TZS,UGX,USD'
    );

    expect(result.current.rates).toEqual(mockRates);
  });

  it('handles fetch failure and shows alert', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: false }) as any
    );

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    const { result } = await renderHook(() => useExchangeRates());

    await waitFor(() => expect(result.current.loadingRates).toBe(false));

    expect(alertSpy).toHaveBeenCalledWith(
      'Error',
      'Unable to fetch exchange rates.'
    );
  });

  it('handles thrown error inside fetch', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    const { result } = await renderHook(() => useExchangeRates());

    await waitFor(() => expect(result.current.loadingRates).toBe(false));

    expect(alertSpy).toHaveBeenCalled();
  });
});
