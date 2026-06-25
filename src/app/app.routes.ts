import { Routes } from '@angular/router';
import { Layout } from './components/core/layout/layout';
import { Home } from './pages/home/home';
import { Projects } from './pages/projects/projects';
import { About } from './pages/about/about';
import { Blog } from './pages/blog/blog';
import { Terms } from './pages/terms/terms';
import { Privacy } from './pages/privacy/privacy';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'projetos',
        component: Projects,
      },
      {
        path: 'sobre-mim',
        component: About,
      },
      {
        path: 'blog',
        component: Blog,
      },
      {
        path: 'termos-de-uso',
        component: Terms,
      },
      {
        path: 'politica-de-privacidade',
        component: Privacy,
      },
    ],
  },
];
