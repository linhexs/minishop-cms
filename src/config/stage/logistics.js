const Record = {
    route: null,
    name: null,
    title: '物流管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-wuliu',
    filePath: 'views/logistics/', // 文件路径
    order: null,
    inNav: true,
    children: [
      {
        title: '发货列表',
        type: 'view',
        name: 'Record',
        route: '/logistics/record',
        filePath: 'views/logistics/Record.vue',
        inNav: true,
        //permission: ['发货记录列表'],
      },
    ],
  }
  
  export default Record
  