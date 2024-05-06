const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  neutral: (opacity: number): string => `rgba(10, 10, 10, ${opacity})`,
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  white: '#fff',
  primary: '#189FAE',
  primaryMuted: '#B2BEBF',
  background: '#F5F5F5',
  darkgray: '#141518',
  gray: '#626D77',
  lightGray: '#D8DCE2',
  lighterGray: '#EEEEEE',
  error: '#CC0000',
};
