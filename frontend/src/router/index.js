import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/home.vue'
import LoginEtudiant from '../views/loginEtudiant.vue'
import LoginPersonnel from '@/views/loginPersonnel.vue'
import path from 'path'
import InscriptionPersonnel from '@/views/inscriptionPersonnel.vue'
import Inscriptionetudiant from '@/views/Inscriptionetudiant.vue'
import chefMention from '@/views/chefMention.vue'
import secretaire from '@/views/secretaire.vue'

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
    path: '/chefMention',
    name: 'chefMention',
  component: chefMention
  },
  {
    path: '/secretaire',
    name: 'secretaire',
    component: secretaire
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router