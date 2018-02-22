import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Proyectos from '@/components/Proyectos'
import Mediciones from '@/components/Mediciones'
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
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Mediciones/:idPyt',
      name: 'Mediciones',
      component: Mediciones
    },
    {
      path: '/LogIn',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/Medicion_configuracion/:idPyt/:idMedicion',
      name: 'Medicion_configuracion',
      component: Medicion_configuracion
    },
    {
      path: '/Reporte/:idPyt/:idMedicion',
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
      path: '/TomaDatos/:idPyt/:idMedicion',
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
