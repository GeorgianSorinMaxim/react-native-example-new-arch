import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const OPEN_EXCHANGE_API_KEY = '8171f465ca0e4f3aba9e31687ecc40da';

export const useExchangeRates = () => {
  const [rates, setRates] = useState({
    KES: 0,
    NGN: 0,
    TZS: 0,
    UGX: 0,
    USD: 1,
  });
  const [loadingRates, setLoadingRates] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoadingRates(true);

        if (!OPEN_EXCHANGE_API_KEY) {
          setRates({ KES: 155.32, NGN: 780.5, TZS: 2600.0, UGX: 3700.0, USD: 1 });
          return;
        }

        const res = await fetch(
          `https://openexchangerates.org/api/latest.json?app_id=${OPEN_EXCHANGE_API_KEY}&symbols=KES,NGN,TZS,UGX,USD`
        );

        if (!res.ok) throw new Error('Fetch failed');

        const data = await res.json();
        setRates(data.rates);
      } catch (err) {
        Alert.alert('Error', 'Unable to fetch exchange rates.');
      } finally {
        setLoadingRates(false);
      }
    };

    fetchRates();
  }, []);

  return { rates, loadingRates };
};
