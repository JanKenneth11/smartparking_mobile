import { createRouter, createWebHistory } from '@ionic/vue-router';
// import Home from '../views/Home.vue'
import store from '../store';
import Login from '../views/MainPages/Login.vue'
import Main from '../views/MainPages/Main.vue'
import Settings from '../views/MenuPages/Settings.vue'
import Reservation from '../views/MenuPages/MyReservations.vue'

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/main',
        name: 'main',
        component: Main,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/myreservations',
        name: 'myreservations',
        component: Reservation,
        meta: {
            requiresAuth: true,
        },
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async(to, from, next) => {
    localStorage.setItem('from', from.fullPath)
    let user = null

    try {
        user = await store.dispatch('updateUser')
    } catch (error) {
        user = null
    }

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    // console.log(requiresAuth, 'requiresAuth', !user, 'no user')

    if (!requiresAuth && user) {
        console.log('not require auth but there is user')
            // console.log(from.fullPath == '/' || from.fullPath == '' ? '/main' : from)
        next(from.fullPath == '/' || from.fullPath == '' ? '/main' : from)
    } else if (requiresAuth && !user) {
        console.log('require auth there is no user')
        next('/login');
    } else {
        console.log('next')
        next();
    }

})

export default router