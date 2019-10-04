import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default [
    {
        path: '/home',
        component: Home,
        meta: { forUser: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { forVisitor: true }
    },
    {
        path: '/register',
        component: Register,
        meta: { forVisitor: true }
    }
]