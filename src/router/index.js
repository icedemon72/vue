import { createRouter, createWebHistory } from 'vue-router'

import Quiz from './../views/Quiz.vue'
import Results from './../views/Results.vue'
import Home from './../components/Home.vue'
import Add from './../views/Add.vue'


const routes = [
    {
        path: '/quiz',
        name: 'Quiz',
        component: Quiz
    },
    {
        path: '/results',
        name: 'Results',
        component: Results
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/add',
        name: 'Add',
        component: Add
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;