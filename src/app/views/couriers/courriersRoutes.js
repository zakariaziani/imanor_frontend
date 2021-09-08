import React from 'react'

const couriersRoutes = [
    {
        path: '/nouveauCourrier',
        component: React.lazy(() => import('./NewCourier')),
    },
    {
        path: '/courriers',
        component: React.lazy(() => import('./CouriersList')),
    },
]

export default couriersRoutes
