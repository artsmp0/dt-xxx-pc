import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 菜单图标：例如 sidebar-dashboard -> assets/icons/sidebar/dashboard.svg */
    icon?: string
    /** 页面标题(菜单项和标签页标题) */
    title?: string
    /** 是否进行页面保活，如果是数组，只有在进入指定页面才会进行保活操作 */
    keepAlive?: boolean | string[]
    /** 是否在 标签栏 隐藏 */
    hideInTab?: boolean
    /** 是否在 菜单栏 显示徽标数 */
    badge?: number
    /** 是否在菜单栏中隐藏：比如详情页 */
    hideInMenu?: boolean
    /** 作为父路由是否本身拥有界面 */
    isPage?: boolean
    /** 默认采取 mock -> router -> 第一项作为首页，这个就是为了支持你自定义首页而不是默认第一项 */
    isIndex?: boolean
    /** 和 path 类似，有时候我们不想用 path 转换成的文件，可以使用这个字段来寻找真实的文件，例如🌰：多个页面指向同一个组件的时候 */
    component?: string
    /** 手动指定要高亮的菜单项 */
    activeMenu?: string
    /** 微应用类型，vite 子应用需要设置为 true */
    isVite?: boolean
    /** 微应用模式：对应子应用要访问的路径 */
    micro?: string
    /** iframe 模式：对应子应用要访问的路径 */
    iframe?: string
    /** 访问的子应用的资源空间名称：例如：http://192.168.6.116:15728/dp-asset-pc-xinjin/#/datasource，对应的就是：dp-asset-pc-xinjin  */
    microName?: string
  }
}
