import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/shared/pages/HomePage.vue';
import AboutPage from '@/shared/pages/AboutPage.vue';

import { characterRoute } from '@/characters/router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // Public
        { path: '/', name: 'home', component: HomePage},
        { path: '/about', name: 'about', component: AboutPage},

        // Characters
        {
            ...characterRoute, 
            path: '/characters'
        },

        // Otra forma de llamar a la ruta de character
        // characterRoute,

        // Characters (lazy load)
        // { 
        //     path: '/characters',
        //     name: 'characters', 
        //     component: () => import('@/characters/layouts/CharacterLayout.vue')
        // },    
        //Default
        { path: '/pathMatch(.*)*', redirect:() => ({ name: 'home'}) }
    ]
});
// path: '/characters',
// router.addRoute( characterRoute);

export default router;