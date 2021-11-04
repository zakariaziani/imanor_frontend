import React from 'react'

const usersRoutes = [
    {
        path: '/users',
        component: React.lazy(() => import('./Users')),
    },
    {
        path: '/departements',
        component: React.lazy(() => import('./Departements')),
    },
    {
        path: '/nouveauUtilisateur',
        component: React.lazy(() => import('./NewUser')),
    },
    {
        path: '/nouveauDepartement',
        component: React.lazy(() => import('./NewDepartement')),
    },
    {
        path: '/modifierUtilisateur',
        component: React.lazy(() => import('./ModifyUser')),
    },
]

export default usersRoutes
