import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#151718',
    background: '#fff',
    bgColor: '#f9fafb',
    cardBg: '#fff',
    button: '#fff',
    tab: '#999',
    placeholder: '#999',
    border: '#151718',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    bgColor: '#0b0b0f',
    cardBg: '#16181c',
    button: '#fff',
    tab: '#666',
    placeholder: '#666',
    border: '#ECEDEE',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
