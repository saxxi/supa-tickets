export type ThemeType = {
  fontWeights: {
    normal: 'normal' | 'bold' | '500' | '600' | '700';
    medium: 'normal' | 'bold' | '500' | '600' | '700';
    semibold: 'normal' | 'bold' | '500' | '600' | '700';
    bold: 'normal' | 'bold' | '500' | '600' | '700';
  };
  radius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
};

export const Theme: ThemeType = {
  fontWeights: {
    normal: 'normal',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  }
}
