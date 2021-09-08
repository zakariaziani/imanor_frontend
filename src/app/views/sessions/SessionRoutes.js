import NotFound from './NotFound'
import ForgotPassword from './ForgotPassword'
import JwtLogin from './login/JwtLogin'

const sessionRoutes = [
    {
        path: '/session/signin',
        component: JwtLogin,
    },
    {
        path: '/session/forgot-password',
        component: ForgotPassword,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default sessionRoutes
