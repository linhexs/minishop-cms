const operateRouter = {
  route: null,
  name: null,
  title: '运营管理',
  type: 'folder',
  icon: 'iconfont icon-huiyuanguanli',
  filePath: 'views/operate/',
  order: null,
  inNav: true,
  permission: ['超级管理员独有权限'],
  children: [
    {
      route: '/operate/banner/list',
      name: null,
      title: '轮播图管理',
      type: 'folder', // 取 route 为默认加载页
      inNav: true,
      children: [
        {
          title: '轮播图列表',
          type: 'view',
          name: 'bannerList',
          route: '/operate/banner/list',
          filePath: 'views/operate/banner/BannerList.vue',
          inNav: true,
          icon: 'iconfont icon-huiyuanguanli',
          permission: ['超级管理员独有权限'],
        },
        {
          title: '新增轮播图',
          type: 'view',
          inNav: true,
          route: '/operate/banner/add',
          icon: 'iconfont icon-add',
          name: 'bannerAdd',
          filePath: 'views/operate/banner/BannerAdd.vue',
          permission: ['超级管理员独有权限'],
        },
      ],
    },
    {
      route: '/operation/theme/list',
      name: null,
      title: '主题管理',
      type: 'folder', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'views/admin/user/',
      inNav: true,
      children: [
        {
          title: '主题列表',
          type: 'view',
          name: 'themeList',
          route: '/operate/theme/list',
          filePath: 'views/operate/theme/ThemeList.vue',
          inNav: true,
          icon: 'iconfont icon-huiyuanguanli',
          permission: ['超级管理员独有权限'],
        },
        {
          title: '新增主题',
          type: 'view',
          inNav: true,
          route: '/operate/theme/add',
          icon: 'iconfont icon-add',
          name: 'themeAdd',
          filePath: 'views/operate/theme/ThemeAdd.vue',
          permission: ['超级管理员独有权限'],
        },
      ],
    },
  ],
}

export default operateRouter
