import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Sections from './pages/Sections'
import Students from './pages/Students'
import Subjects from './pages/Subjects' 

export default [
    {
        path: '/',
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
    },
    {
        path: '/sections',
        component: Sections,
        meta: { forUser: true }
    },
    {
        path: '/students',
        component: Students,
        meta: { forUser: true }
    },
    {
        path: '/subjects',
        component: Subjects,
        meta: { forUser: true }
    }
]