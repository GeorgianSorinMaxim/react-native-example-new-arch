import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginTop: 18,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  labelSmall: {
    opacity: 0.8,
  },
  amountInput: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
    height: 48,
  },
  currencyText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: -6,
  },
  arrowDown: {
    marginVertical: 8,
  },
  convertedText: {
    marginTop: 6,
  },
  countryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  countryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    margin: 2,
  },
  inputCard: {
    borderRadius: 16,
    padding: 14,
    marginTop: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  label: {
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  column: {
    flex: 0.5,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  gradientButton: {
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 24
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  small: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 24,
    opacity: 0.6,
  },
  sentContainer: { 
    alignItems: 'center',
  },
});
