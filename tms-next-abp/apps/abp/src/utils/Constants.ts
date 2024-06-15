import { FaDatabase, FaCogs, FaUsers, FaHome, FaWrench } from 'react-icons/fa';
import { SubMenu } from '@tms_next_abp/ui';
export const Menus = [
    {
        Name: 'Home',
        Link: '/'
    }
];

export const AdminMenus: SubMenu[] = [
    {
        name: 'Home',
        link: '/admin',
        icon: FaHome
    },
    {
        name: 'Administration',
        icon: FaWrench,
        children: [
            {
                name: 'Roles',
                link: '/admin/users/roles'
            },
            {
                name: 'Users',
                link: '/admin/users'
            }
        ]
    },
    {
        name: 'Tenant Management',
        icon: FaUsers,
        children: [
            {
                name: 'Tenants',
                link: '/admin/tenants'
            }
        ]
    },
    {
        name: 'Settings',
        link: '/admin/settings',
        icon: FaCogs
    }
];

export const QueryNames = {
    GetUsers: 'GetUsers',
    GetTenants: 'GetTenants',
    GetRoles: 'GetRoles',
    GetAppConfig: 'GetAppConfig',
    GetFeatures: 'GetFeatures',
    GetTranslations: 'GetTranslations'
};
