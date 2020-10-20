// Components
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Projects from './components/projects/Projects';

const routes = [
  {
    path: '/projects',
    exact: true,
    component: Projects,
  },
  {
    component: Login,
    path: '/',
    exact: true,
  },
  {
    component: SignUp,
    path: '/sign-up',
    exact: true,
  },
];

export default routes;
