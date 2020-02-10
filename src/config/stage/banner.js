const bannerRouter = {
    route: null,
    name: null,
    title: 'banner管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-banner',
    filePath: 'views/operate/', // 文件路径
    order: null,
    inNav: true,
    children: [
        {
          title: '轮播图列表',
          type: 'view',
          name: 'bannerList',
          route: '/banner/list',
          filePath: 'views/operate/banner/BannerList.vue',
          inNav: true,
          icon: 'iconfont icon-huiyuanguanli',
          permission: ['轮播图列表'],
        },
        {
          title: '新增轮播图',
          type: 'view',
          inNav: true,
          route: '/banner/add',
          icon: 'iconfont icon-add',
          name: 'bannerAdd',
          filePath: 'views/operate/banner/BannerAdd.vue',
          permission: ['新增轮播图'],
        },
      ],
  }
  
  export default bannerRouter
  