import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  TextInput,
  View
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { useExchangeRates } from './use-exchange-rates';

import { countries } from './send-screen.consts';

import { useThemeColor } from '@/hooks/use-theme-color';
import { styles } from './send-screen.styles';
import { getCountryBtnStyle, getCountryTextStyle } from './send-screen.utils';

export type CountryKey = keyof typeof countries;
export type CurrencyKey = 'KES' | 'NGN' | 'TZS' | 'UGX' | 'USD';

export default function SendScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState<CountryKey>('KENYA');
  const [phone, setPhone] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [sending, setSending] = useState(false);

  const pressScale = useSharedValue(1);
  const animatedPressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(pressScale.value, { duration: 100 }) }],
  }));

  const bgColor = useThemeColor({}, 'bgColor');
  const cardBg = useThemeColor({}, 'cardBg');
  const textColor = useThemeColor({}, 'text');
  const buttonTextColor = useThemeColor({}, 'button');
  const placeholderTextColor = useThemeColor({}, 'placeholder');
  const borderColor = useThemeColor({}, 'border');

  const { rates, loadingRates } = useExchangeRates() as {
    rates: Record<CurrencyKey, number> | null;
    loadingRates: boolean;
  };

  const onSend = () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Validation', 'Please enter both first and last name.');
      return;
    }
    const digits = phone.replace(/[^0-9]/g, '');
    if (digits.length !== countries[country].digits) {
      Alert.alert('Validation', 'Phone number invalid for selected country.');
      return;
    }
    const amt = parseInt(usdAmount, 10);
    if (Number.isNaN(amt) || amt <= 0) {
      Alert.alert('Validation', 'Please enter a valid USD amount (no decimals).');
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
        Alert.alert(
          'Success',
          `Transaction Details:
          Recipient: ${firstName} ${lastName}
          Phone: ${countries[country].prefix} ${phone}
          Amount: ${recipientAmount}`
      );
    }, 1000);
  };

  const recipientCurrency = countries[country].currency as CurrencyKey;
  const recipientAmount = (() => {
    if (!usdAmount || !rates) return null;
    const rate = rates ? rates[recipientCurrency] : undefined;
    if (!rate) return null;
    const converted = parseFloat(usdAmount) * rate;
    return `${converted.toFixed(2)} ${recipientCurrency}`;
  })();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bgColor }]}>
      <ThemedText type='title'>Send</ThemedText>

      <View style={[styles.inputCard, { backgroundColor: cardBg }]}>
        <ThemedText type='subtitle' style={styles.label}>Recipient's country</ThemedText>
        <View style={styles.countryRow}>
          {(Object.keys(countries) as CountryKey[]).map((k) => {
            const isActive = country === k;
            return (
              <Pressable
                key={k}
                onPress={() => setCountry(k)}
                style={[styles.countryBtn, getCountryBtnStyle(isActive, textColor)]}
              >
                <ThemedText type="tab" style={getCountryTextStyle(isActive, textColor)}>
                  {countries[k].label}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={[styles.inputCard, { backgroundColor: cardBg }]}>
        <ThemedText type='subtitle' style={styles.label}>Recipient's name</ThemedText>
        <View style={styles.row}>
          <View style={styles.column}>
            <TextInput
              placeholder="First name"
              placeholderTextColor={placeholderTextColor}
              style={[styles.input, { color: textColor, borderColor, }]}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.column}>
            <TextInput
              placeholder="Last name"
              placeholderTextColor={placeholderTextColor}
              style={[styles.input, { color: textColor, borderColor, }]}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>
      </View>

      <View style={[styles.inputCard, { backgroundColor: cardBg }]}>
        <ThemedText type='subtitle' style={styles.label}>
          Recipient's phone number (prefix {countries[country].prefix})
        </ThemedText>
        <TextInput
          placeholder="e.g. 712345678"
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, { color: textColor, borderColor, }]}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <ThemedText type="tab" style={styles.labelSmall}>You send</ThemedText>
        <TextInput
          placeholder="0"
          placeholderTextColor={placeholderTextColor}
          style={[styles.amountInput, { color: textColor }]}
          value={usdAmount}
          onChangeText={(t) => setUsdAmount(t.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
        />
        <ThemedText style={styles.currencyText}>USD</ThemedText>

        <View style={styles.arrowDown}>
          <ThemedText type='subtitle'>↓</ThemedText>
        </View>

        {loadingRates ? (
          <ActivityIndicator testID="ActivityIndicator" />
        ) : (
          <View style={styles.sentContainer}>
            <ThemedText type="tab" style={styles.labelSmall}>They receive</ThemedText>
            <ThemedText type="title" style={styles.convertedText}>
              {recipientAmount ?? '—'}
            </ThemedText>
          </View>
        )}
      </View>

      <View style={styles.button}>
        <Animated.View style={animatedPressStyle}>
          <Pressable
            onPressIn={() => (pressScale.value = 0.95)}
            onPressOut={() => (pressScale.value = 1)}
            onPress={onSend}
            disabled={sending}
            testID="send-button"
          >
            <LinearGradient
              colors={['#0072ff', '#00c6ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <ThemedText style={[styles.buttonText, { color: buttonTextColor }]}>{sending ? 'Sending...' : 'Send'}</ThemedText>
            </LinearGradient>
          </Pressable>
        </Animated.View>
      </View>

      <ThemedText style={styles.small}>
        Exchange rates powered by openexchangerates.org
      </ThemedText>
    </ScrollView>
  );
}
