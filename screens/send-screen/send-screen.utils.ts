import { TextStyle } from 'react-native';

export const getCountryBtnStyle = (isActive: boolean, textColor: string) => {
  return {
    backgroundColor: isActive ? textColor : undefined,
    borderColor: isActive ? textColor : '#e2e8f0',
  };
};

export const getCountryTextStyle = (
  active: boolean,
  textColor: string,
): TextStyle => ({
  color: active ? '#fff' : textColor,
  fontWeight: active ? '700' : '400',
});