import type { ThemeContent } from '.'
import { createHoverColor, createPressedColor, createSupplColor } from '@/utils/color'

const primaryColor = '#1677ff'
const successColor = '#52c41a'
const warningColor = '#faad14'
const errorColor = '#ff4d4f'
const infoColor = '#448ef7'

const commonLight: ThemeContent['light']['common'] = {
  borderRadius: '6px',
  primaryColor,
  primaryColorHover: createHoverColor(primaryColor),
  primaryColorPressed: createPressedColor(primaryColor),
  primaryColorSuppl: createSupplColor(primaryColor),
  successColor,
  successColorHover: createHoverColor(successColor),
  successColorPressed: createPressedColor(successColor),
  successColorSuppl: createSupplColor(successColor),
  warningColor,
  warningColorHover: createHoverColor(warningColor),
  warningColorPressed: createPressedColor(warningColor),
  warningColorSuppl: createSupplColor(warningColor),
  errorColor,
  errorColorHover: createHoverColor(errorColor),
  errorColorPressed: createPressedColor(errorColor),
  errorColorSuppl: createSupplColor(errorColor),
  infoColor,
  infoColorHover: createHoverColor(infoColor),
  infoColorPressed: createPressedColor(infoColor),
  infoColorSuppl: createSupplColor(infoColor),
}

const darkPrimaryColor = '#3c7eff'
const darkSuccessColor = '#27c346'
const darkWarningColor = '#ff9626'
const darkErrorColor = '#f76965'
const darkInfoColor = '#3c7eff'
const commonDark: ThemeContent['light']['common'] = {
  borderRadius: '6px',
  primaryColor: darkPrimaryColor,
  primaryColorHover: createHoverColor(darkPrimaryColor),
  primaryColorPressed: createPressedColor(darkPrimaryColor),
  primaryColorSuppl: createSupplColor(darkPrimaryColor),
  successColor: darkSuccessColor,
  successColorHover: createHoverColor(darkSuccessColor),
  successColorPressed: createPressedColor(darkSuccessColor),
  successColorSuppl: createSupplColor(darkSuccessColor),
  warningColor: darkWarningColor,
  warningColorHover: createHoverColor(darkWarningColor),
  warningColorPressed: createPressedColor(darkWarningColor),
  warningColorSuppl: createSupplColor(darkWarningColor),
  errorColor: darkErrorColor,
  errorColorHover: createHoverColor(darkErrorColor),
  errorColorPressed: createPressedColor(darkErrorColor),
  errorColorSuppl: createSupplColor(darkErrorColor),
  infoColor: darkInfoColor,
  infoColorHover: createHoverColor(darkInfoColor),
  infoColorPressed: createPressedColor(darkInfoColor),
  infoColorSuppl: createSupplColor(darkInfoColor),
}

export const antd: ThemeContent = {
  light: {
    common: commonLight,
    Radio: {
      buttonTextColorActive: '#fff',
      buttonColorActive: primaryColor,
    },
  },
  dark: {
    common: commonDark,
    Button: {
      textColorPrimary: '#fff',
      textColorHoverPrimary: '#fff',
      textColorPressedPrimary: '#fff',
      textColorFocusPrimary: '#fff',
      textColorError: '#fff',
      textColorHoverError: '#fff',
      textColorPressedError: '#fff',
      textColorFocusError: '#fff',
      textColorSuccess: '#fff',
      textColorHoverSuccess: '#fff',
      textColorPressedSuccess: '#fff',
      textColorFocusSuccess: '#fff',
      textColorWarning: '#fff',
      textColorHoverWarning: '#fff',
      textColorPressedWarning: '#fff',
      textColorFocusWarning: '#fff',
      textColorInfo: '#fff',
      textColorHoverInfo: '#fff',
      textColorPressedInfo: '#fff',
      textColorFocusInfo: '#fff',
    },
  },
}
