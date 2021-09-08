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
]

export default usersRoutes
