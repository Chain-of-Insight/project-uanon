import { createWebHistory, createRouter } from 'vue-router';
import { isLoggedIn } from 'axios-jwt';
import * as Auth from '../util/auth';

// Components
import Home from '../components/home/Home';
import Tutorials from '../components/seasons/tutorial/Tutorials';
import Tutorial from '../components/seasons/tutorial/Tutorial';
// Tools
import Tools from '../components/tools/Tools';
import CipherTools from '../components/tools/Cipher';
import Proof from '../components/tools/Proof';
// FAQ
import Faq from '../components/faq/FAQ';
// Observer
import Register from '../components/user/Register';
import Observer from '../components/user/User';
// Stats
import Leaders from '../components/stats/Leaderboard';
import Player from '../components/stats/Player';

const PageNotFound = Home;

// Routes
const routes = [
  // General
  { path: '/', name: 'Home', component: Home },
  // Tools
  { path: '/tools', name: 'Tools', component: Tools },
  { path: '/tools/cipher', name: 'Cipher Tools', component: CipherTools },
  { path: '/tools/truth', name: 'Weapons of Truth', component: Proof },
  // Tutorial
  { path: '/learn', name: 'Tutorials', component: Tutorials, meta: { requiresAuth: true } },
  { path: '/tutorial/:id', name: 'Tutorial', component: Tutorial, meta: { requiresAuth: true } },
  // FAQ
  { path: '/faq', name: 'FAQ', component: Faq },
  // Observer
  { path: '/register', name: 'Register', component: Register },
  { path: '/observer', name: 'Observer', component: Observer, meta: { requiresAuth: true } },
  // Stats
  { path: '/leaders', name: 'Leaders', component: Leaders, meta: { requiresAuth: true } },
  { path: '/player/:id', name: 'Player', component: Player, meta: { requiresAuth: true } },
  // Not Found
  { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      await Auth.login();
      next();
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;