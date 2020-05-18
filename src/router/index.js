import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Proyectos from '@/components/Proyectos'
import Procesos from '@/components/Procesos/Procesos.vue'
import Medicion_detalle from '@/components/Medicion_detalle'
import Medicion from '@/components/Medicion'
import Reporte from '@/components/Reporte'
import TomaDatos from '@/components/TomaDatos'
import LogIn from '@/components/LogIn'
import Usuarios from '@/components/Usuarios'
import Profile from '@/components/Profile'
import Configuracion from '@/components/Configuracion'

Vue.use(Router)

export default new Router({
  mode: 'history',
  transition: 'fade',
  routes: [
    {
      path: '/Proyectos',
      name: 'Proyectos',
      component: Proyectos
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Inicio',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/procesos/:proyecto_uid',
      name: 'procesos',
      component: Procesos
    },
    {
      path: '/LogIn',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/Medicion/:proyecto_uid/:idproceso/:medicion_uid',
      name: 'Medicion',
      component: Medicion
    },
    {
      path: '/Reporte/:proyecto_uid/:idproceso/:idTomaDatos',
      name: 'Reporte',
      component: Reporte
    },
    {
      path: '/Usuarios',
      name: 'Usuarios',
      component: Usuarios
    },
    {
      path: '/Configuracion',
      name: 'Configuracion',
      component: Configuracion
    },
    {
      path: '/TomaDatos/:proyecto_uid/:idproceso/:medicion_uid',
      name: 'TomaDatos',
      component: TomaDatos
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile
    },
  ]
})
