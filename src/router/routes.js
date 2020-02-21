import Home from '@/views/home/Home'
import homeRouter from './home-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/about',
    component: Home,
    children: [...homeRouter],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login'),
  },
  {
    redirect: '/404',
    path: '*',
  },
  // {
  //   path:'/product/add',
  //   name: 'productAdd',
  //   component: ()=>import('@/views/product/products/ProductsAdd'),
  // }
]

export default routes
