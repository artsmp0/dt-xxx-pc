export function isDev() {
  return import.meta.env.DEV
}

export const camel2kebab = (str: string) => str && str.replace(/\B([A-Z])/g, '-$1').toLowerCase()

export function getBrowser() {
  return {
    versions: (() => {
      const u = window.navigator.userAgent
      return {
        // 移动终端浏览器版本信息
        trident: u.includes('Trident'), // IE内核
        presto: u.includes('Presto'), // opera内核
        webKit: u.includes('AppleWebKit'), // 苹果、谷歌内核
        gecko: u.includes('Gecko') && !u.includes('KHTML'), // 火狐内核
        mobile: !!/AppleWebKit.*Mobile.*/.test(u), // 是否为移动终端
        ios: !!/\(i[^;]+;(?: U;)? CPU.+Mac OS X/.test(u), // ios终端
        android: u.includes('Android') || u.includes('Linux'), // android终端或者uc浏览器
        iPhone: u.includes('iPhone'), // 是否为iPhone或者QQHD浏览器
        iPad: u.includes('iPad'), // 是否iPad
        dingtalk: u.includes('DingTalk'), // 是否为钉钉内部
        taurusapp: u.includes('TaurusApp'), // 是否为专有钉钉和浙政钉钉
        alipay: u.includes('AlipayClient'), // 是否为支付宝
        wechat: /micromessenger/i.test(u), // 是否微信中
        webApp: !u.includes('Safari'), // 是否web应该程序，没有头部与底部
        dtDreamApp: u.toLowerCase().includes('dtdreamweb'), // 浙里办 APP
        alipayMini: u.toLowerCase().includes('miniprogram') && u.toLowerCase().includes('alipay'), // 浙里办支付宝小程序
      }
    })(),
    language: window.navigator.language.toLowerCase(),
  }
}

// 判断是否是钉钉或者浙政钉
export function isDdOrZzd() {
  return getBrowser().versions.dingtalk || getBrowser().versions.taurusapp
}

/** 下载 blob 格式的文件 */
export function downloadBlob(blob: Blob, name: string): void {
  const link = document.createElement('a')
  const objectURL = URL.createObjectURL(blob)
  link.href = objectURL
  link.download = name
  link.click()
  URL.revokeObjectURL(objectURL)
  link.remove()
}
