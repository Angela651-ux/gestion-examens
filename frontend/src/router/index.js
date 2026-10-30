import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home.vue'
import LoginEtudiant from '../views/loginEtudiant.vue'
import LoginPersonnel from '@/views/loginPersonnel.vue'
import path from 'path'
import InscriptionPersonnel from '@/views/inscriptionPersonnel.vue'
import Inscriptionetudiant from '@/views/Inscriptionetudiant.vue'

import dashboardLayout from '@/layout/dashboardLayout.vue'


const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/loginEtudiant' ,
    name: 'loginEtudiant',
    component: LoginEtudiant
  },
  {
    path: '/loginPersonnel',
    name: 'loginPersonnel',
    component : LoginPersonnel
  },
  {
    path:'/inscriptionPersonnel',
    name:'inscriptionPersonnel',
    component: InscriptionPersonnel
  },
  {
    path: '/inscriptionEtudiant',
    name: 'inscriptionEtudiant',
    component: Inscriptionetudiant
  },
  {
    path: '/dashboard',
    component: dashboardLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import ('@/views/dashboard.vue')
      },
      {
        path:'calendrier',
        name: 'calendriergenerale',
        component:  () => import ('@/views/calendrier/calendriergenerale.vue')
      },
      {
        path:'Ue',
        name:'Ue',
        component: () => import('@/views/UeEc/Ue.vue')
      },
      {
        path:'Ec',
        name:'Ec',
        component: () => import('@/views/UeEc/Ec.vue')
      }
     
    ]
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router