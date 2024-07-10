import type { UploadFileInfo, UploadProps } from 'naive-ui'

export interface AtUploadProps {
  'value': any
  'onUpdateValue'?: (v: any) => void
  'onUpdate:value'?: (v: any) => void
  /** 判断是否上传成功 */
  'isSuccess'?: (response: any) => boolean
  /** 将后端数据转成 naive-ui 需要的文件列表 */
  'toFileList'?: (value: any[]) => UploadProps['fileList']
  /** 格式化成后端需要的数据格式 */
  'format'?: (file: UploadFileInfo & { response: any }) => any
  'dragTip'?: string
  'nUploadProps'?: Omit<UploadProps, 'themeOverrides'>
}
