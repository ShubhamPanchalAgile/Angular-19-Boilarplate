import { NavItem } from '../models/nav.interface';

export const menuItem = (): NavItem[] => {
  return [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
    },
    {
      path: '/admin/users',
      label: 'Users',
      icon: 'people',
    },
    {
      path: '/admin/products',
      label: 'Products',
      icon: 'inventory',
    },
    {
      path: '/admin/settings',
      label: 'Settings',
      icon: 'settings',
    },
  ];
};
