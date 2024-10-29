import HomePage from '../pages/HomePages/HomePages'
import OrderPage from '../pages/OrderPage/OrderPage'
import ProductPage from '../pages/ProductPage/ProductPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import TypeProductPage from '../pages/TypeProductPage/TypeProductPage'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import AdminPage from '../pages/AdminPage/AdminPage'

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,

    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path: '/product',
        page: ProductPage,
        isShowHeader: true,
    },
    {
        path: '/:type',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path: '/type-product',
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: '/product-detail',
        page: ProductDetailPage,
        isShowHeader: true,
    },
    {
        path: '/product/:productId',
        page: ProductDetailPage,
        isShowHeader: true,
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true,
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: '*',
        page: NotFoundPage,

    }
]

