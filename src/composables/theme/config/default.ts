import type { ThemeContent } from '.'

const commonFormItemColor: any = {
  color: 'rgba(46, 51, 56, .05)',
  border: '1ps solid transparent',
}

export const normal: ThemeContent = {
  light: {
    Radio: {
      buttonColorActive: 'var(--primary-color)',
      buttonTextColorActive: '#fff',
    },
    Input: commonFormItemColor,
    InputNumber: commonFormItemColor,
    Select: {
      peers: {
        InternalSelection: commonFormItemColor,
      },
    },
    TreeSelect: {
      peers: {
        InternalSelection: commonFormItemColor,
      },
    },
    Cascader: {
      peers: {
        InternalSelection: commonFormItemColor,
      },
    },
    DatePicker: commonFormItemColor,
  },
  dark: {},
}
