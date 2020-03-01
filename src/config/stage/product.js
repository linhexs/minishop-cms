const productRouter = {
  route: null,
  name: null,
  title: '商品管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-shop',
  filePath: 'views/product/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '商品分类',
      type: 'view',
      name: 'categoryList',
      route: '/category/list',
      filePath: 'views/product/category/CategoryList.vue',
      inNav: true,
      permission: ['分类列表'],
    },
    {
      title: '商品库',
      type: 'view',
      name: 'productsList',
      route: '/product/list',
      filePath: 'views/product/products/ProductsList.vue',
      inNav: true,
      permission: ['商品列表'],
    },
    {
      title: '新增商品',
      //type: 'view',
      name: 'productsAdd',
      route: '/product/add',
      filePath: 'views/product/products/ProductsAdd.vue',
      inNav: true,
      permission: ['新增商品'],
    },
  ],
}

export default productRouter
