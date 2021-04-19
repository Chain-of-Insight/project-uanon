import { createWebHistory, createRouter } from 'vue-router';
import { isLoggedIn } from 'axios-jwt';
import * as Auth from '../util/auth';

// Components
import Home from '../components/home/Home';
// Season 0
import Tutorials from '../components/seasons/tutorial/Tutorials';
import Tutorial from '../components/seasons/tutorial/Tutorial';
// Season 1
import Springs from '../components/seasons/season1/SpringList.vue';
import Spring1 from '../components/seasons/season1/Spring1.vue';
import Spring2 from '../components/seasons/season1/Spring2.vue';
import Spring3 from '../components/seasons/season1/Spring3.vue';
import Spring4 from '../components/seasons/season1/Spring4.vue';
import Spring5 from '../components/seasons/season1/Spring5.vue';
import Spring6 from '../components/seasons/season1/Spring6.vue';
import Spring7 from '../components/seasons/season1/Spring7.vue';
import Spring8 from '../components/seasons/season1/Spring8.vue';
import SpringAscend from '../components/seasons/season1/SpringAscend.vue';
import SpringGG from '../components/seasons/season1/SpringGG.vue';
// Token
import Viewer3D from '../components/nft/SeeForYourself.vue';
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
  // Spring
  { path: '/discover', name: 'Springs', component: Springs, meta: { requiresAuth: true } },
  { path: '/spring/1', name: 'Spring1', component: Spring1, meta: { requiresAuth: true } },
  { path: '/spring/2', name: 'Spring2', component: Spring2, meta: { requiresAuth: true } },
  { path: '/spring/3', name: 'Spring3', component: Spring3, meta: { requiresAuth: true } },
  { path: '/spring/4', name: 'Spring4', component: Spring4, meta: { requiresAuth: true } },
  { path: '/spring/5', name: 'Spring5', component: Spring5, meta: { requiresAuth: true } },
  { path: '/spring/6', name: 'Spring6', component: Spring6, meta: { requiresAuth: true } },
  { path: '/spring/7', name: 'Spring7', component: Spring7, meta: { requiresAuth: true } },
  { path: '/spring/8', name: 'Spring8', component: Spring8, meta: { requiresAuth: true } },
  { path: '/spring/rites-of-spring', name: 'SpringAscend', component: SpringAscend, meta: { requiresAuth: true } },
  { path: '/spring/gg', name: 'SpringGG', component: SpringGG, meta: { requiresAuth: true } },
  // Token
  { path: '/token/:contract/:type', name: 'Viewer3D', component: Viewer3D, meta: { requiresAuth: true } },
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

router.afterEach(async (to/*, from*/) => {
  if (!window['ga']) {
    return;
  }
  window.ga('set', 'page', to.path);
  window.ga('send', 'pageview');
  // console.log('Router =>', {to: to, from: from});
});

export default router;