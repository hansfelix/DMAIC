import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Proyectos from '@/components/Proyectos'
import Procesos from '@/components/Procesos/Procesos.vue'
import Medicion_detalle from '@/components/Medicion_detalle'
import Medicion_configuracion from '@/components/Medicion_configuracion'
import Reporte from '@/components/Reporte'
import TomaDatos from '@/components/TomaDatos'
import LogIn from '@/components/LogIn'
import Usuarios from '@/components/Usuarios'
import Profile from '@/components/Profile'
import Configuracion from '@/components/Configuracion'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Proyectos',
      name: 'Proyectos',
      component: Proyectos
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
      path: '/proceso_configuracion/:proyecto_uid/:idproceso',
      name: 'proceso_configuracion',
      component: Medicion_configuracion
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
      path: '/TomaDatos/:proyecto_uid/:idproceso/:idTomaDatos',
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
