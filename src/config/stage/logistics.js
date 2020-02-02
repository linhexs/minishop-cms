const logisticsRouter = {
    route: null,
    name: null,
    title: '物流管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-tushuguanli',
    filePath: 'views/logistics/', // 文件路径
    order: null,
    inNav: true,
    children: [
      {
        title: '发货记录',
        type: 'view',
        name: 'record',
        route: '/logistics/record',
        filePath: 'views/logistics/Record.vue',
        inNav: true,
      },
    ],
  }
  
  export default logisticsRouter
  