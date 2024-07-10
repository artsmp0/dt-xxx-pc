/** 用于获取正确的 params 参数类型 */
export default function useTableListApi<T extends (...args: any) => any, P = Parameters<T>[0], R = ReturnType<T>>(api: T) {
  const getList = (params: P): R => {
    return api(params)
  }

  const passDefaultList = (params: P) => {
    return (p: any) => {
      return getList({ ...params, ...p })
    }
  }

  return {
    getList,
    passDefaultList,
  }
}
