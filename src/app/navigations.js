import { authRoles } from './auth/authRoles'

export const navigations = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard',
    },
    {
        label: 'Utilisateurs',
        type: 'label',
    },
    {
        name: 'Liste des utilisateurs',
        icon: 'people',
        path: '/users',
    },

    {
        name: 'Département',
        path: '/departements',
        icon: 'business_center',
    },

    {
        label: 'Courriers',
        type: 'label',
    },

    {
        name: 'Nouveau Courier',
        path: '/nouveauCourrier',
        icon: 'add_box',
    },

        {
        name: 'Liste des courriers',
        path: '/courriers',
        icon: 'email',
    },
    
    {
        label: 'Components',
        type: 'label',
    },
    {
        name: 'Components',
        icon: 'favorite',
        badge: { value: '30+', color: 'secondary' },
        children: [
            {
                name: 'Auto Complete',
                path: '/material/autocomplete',
                iconText: 'A',
            },
            {
                name: 'Buttons',
                path: '/material/buttons',
                iconText: 'B',
            },
            {
                name: 'Checkbox',
                path: '/material/checkbox',
                iconText: 'C',
            },
            {
                name: 'Dialog',
                path: '/material/dialog',
                iconText: 'D',
            },
            {
                name: 'Drag and Drop',
                iconText: 'D',
                path: '/others/drag-and-drop',
            },
            {
                name: 'Expansion Panel',
                path: '/material/expansion-panel',
                iconText: 'E',
            },
            {
                name: 'Form',
                path: '/material/form',
                iconText: 'F',
            },
            {
                name: 'Icons',
                path: '/material/icons',
                iconText: 'I',
            },
            {
                name: 'Menu',
                path: '/material/menu',
                iconText: 'M',
            },
            {
                name: 'Progress',
                path: '/material/progress',
                iconText: 'P',
            },
            {
                name: 'Radio',
                path: '/material/radio',
                iconText: 'R',
            },
            {
                name: 'Switch',
                path: '/material/switch',
                iconText: 'S',
            },
            {
                name: 'Slider',
                path: '/material/slider',
                iconText: 'S',
            },
            {
                name: 'Snackbar',
                path: '/material/snackbar',
                iconText: 'S',
            },
            {
                name: 'Table',
                path: '/material/table',
                iconText: 'T',
            },
        ],
    },
    {
        name: 'Utilities',
        icon: 'format_list_bulleted',
        children: [
            {
                name: 'Color',
                path: '/utilities/color',
                iconText: 'C',
                auth: authRoles.admin,
            },
            {
                name: 'Spacing',
                path: '/utilities/spacing',
                iconText: 'S',
                auth: authRoles.admin,
            },
            {
                name: 'Typography',
                path: '/utilities/typography',
                iconText: 'T',
            },
            {
                name: 'Display',
                path: '/utilities/display',
                iconText: 'D',
            },
            {
                name: 'Position',
                path: '/utilities/position',
                iconText: 'P',
            },
            {
                name: 'Shadow',
                path: '/utilities/shadow',
                iconText: 'S',
            },
        ],
    },
    {
        name: 'Charts',
        icon: 'trending_up',
        children: [
            {
                name: 'Echarts',
                path: '/charts/echarts',
                iconText: 'E',
            }
        ],
    },
    {
        name: 'Documentation',
        icon: 'launch',
        type: 'extLink',
        path: 'http://demos.ui-lib.com/matx-react-doc/',
    },
]
