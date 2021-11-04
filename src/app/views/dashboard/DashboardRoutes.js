import React from 'react'

const dashboardRoutes = [
    {
        path: '/dashboard',
        component: React.lazy(() => import('./Analytics')),
    }
]

export default dashboardRoutes
