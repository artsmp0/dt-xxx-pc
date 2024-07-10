import { changeColor, composite } from 'seemly'

export function createHoverColor(rgb: string): string {
  return composite(rgb, [255, 255, 255, 0.16])
}

export function createPressedColor(rgb: string): string {
  return composite(rgb, [0, 0, 0, 0.12])
}

export function createSupplColor(rgb: string): string {
  return composite(rgb, [0, 0, 0, 0.24])
}

export function rgba2Hex(rgb: string, dark = true) {
  if (!dark)
    return composite(rgb, [255, 255, 255, 0.9])

  return composite(rgb, [24, 24, 28, 0.9])
}

/** 创建透明度颜色 */
export function opacityColor(baseBackgroundRgb: string, alpha: number = 0.1) {
  return changeColor(baseBackgroundRgb, { alpha })
}
