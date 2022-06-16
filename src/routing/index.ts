import React from 'react';
import Login from '../pages/SignIn/SignIn';
import Dashboard from '../pages/Dashboard/Dashboard';

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export enum ROUTES {
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
}

export const publicRoutes: IRoute[] = [
  { path: ROUTES.LOGIN, component: Login },
];

export const privateRoutes: IRoute[] = [
  { path: ROUTES.DASHBOARD, component: Dashboard },
];
