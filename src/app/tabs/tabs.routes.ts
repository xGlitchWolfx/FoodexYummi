import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authGuard } from '../guards/auth.guard';
import { inicioGuard } from '../guards/inicio.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'tab4',
        canActivate: [authGuard],
        loadComponent: () =>
          import('../tab4/tab4.page').then((m) => m.Tab4Page),
      },
      {
        path: '',
        canActivate: [inicioGuard],
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
    ],
  },
  {
    path: '',
    canActivate: [inicioGuard],
    loadComponent: () =>
      import('../tab1/tab1.page').then((m) => m.Tab1Page),
  },
];
