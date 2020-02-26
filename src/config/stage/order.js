const order = {
    route: null,
    name: null,
    title: '订单管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-tongji',
    filePath: 'views/order/', // 文件路径
    order: null,
    inNav: true,
    children: [
      {
        title: '订单列表',
        type: 'view',
        name: 'order',
        route: '/order/List',
        filePath: 'views/order/List.vue',
        inNav: true,
      },
    ],
  }
  
  export default order
  