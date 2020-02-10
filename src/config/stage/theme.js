const themeRouter = {
    route: null,
    name: null,
    title: '主题管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-theme',
    filePath: 'views/operate/', // 文件路径
    order: null,
    inNav: true,
    children: [
      {
        title: '主题列表',
        type: 'view',
        name: 'record',
        inNav: true,
        route: '/theme/list',
        filePath: 'views/operate/theme/ThemeList.vue',
        inNav: true,
      },
      {
        title: '新增主题',
        type: 'view',
        inNav: true,
        route: '/theme/add',
        icon: 'iconfont icon-add',
        name: 'themeAdd',
        filePath: 'views/operate/theme/ThemeAdd.vue',
      },
    ],
  }
  
  export default themeRouter
  