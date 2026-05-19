import { DashboardNavGroup } from './left-menu-dynamic';
import { HomeIcon, ProductIcon } from '@shared/components/icons';
import { UrlBuilder } from '@shared/utils/url-builder';


export const dashboardNavGroups: DashboardNavGroup[] = [
  {
    group: 'Main',
    items: [
      {
        id: 'home',
        label: 'Home',
        href: UrlBuilder.route('dashboard','home'),
        icon: HomeIcon,
      },
      {
        id:'products-list',
        label:'Products',
        href: UrlBuilder.route('dashboard','products'),
        icon:ProductIcon
      }
      // {
      //   id: 'catalog',
      //   label: 'Catalog',
      //   icon: '📦',
      //   children: [
      //     {
      //       id: 'products',
      //       label: 'Products',
      //       href: '/dashboard/products',
      //       icon: '📄',
      //     },
      //     {
      //       id: 'categories',
      //       label: 'Categories',
      //       href: '/dashboard/categories',
      //       icon: '🗂️',
      //     },
      //   ],
      // },
    ],
  },
];
