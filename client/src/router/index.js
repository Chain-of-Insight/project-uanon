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
// Season 2
import Summers from '../components/seasons/season2/SummerList.vue';
import Summer1 from '../components/seasons/season2/Summer1.vue';
import Summer2 from '../components/seasons/season2/Summer2.vue';
import Summer3 from '../components/seasons/season2/Summer3.vue';
import Summer4 from '../components/seasons/season2/Summer4.vue';
import Summer5 from '../components/seasons/season2/Summer5.vue';
import Summer6 from '../components/seasons/season2/Summer6.vue';
import Summer7 from '../components/seasons/season2/Summer7.vue';
import Summer8 from '../components/seasons/season2/Summer8.vue';
import Summer9 from '../components/seasons/season2/Summer9.vue';
import Summer10 from '../components/seasons/season2/Summer10.vue';
import SummerAscend from '../components/seasons/season2/SummerAscend.vue';
import SummerGG from '../components/seasons/season2/SummerGG.vue';
// Season 3
import Autumns from '../components/seasons/season3/AutumnList.vue';
import Autumn1 from '../components/seasons/season3/Autumn1.vue';
import Autumn2 from '../components/seasons/season3/Autumn2.vue';
import Autumn3 from '../components/seasons/season3/Autumn3.vue';
import Autumn4 from '../components/seasons/season3/Autumn4.vue';
import Autumn5 from '../components/seasons/season3/Autumn5.vue';
import AutumnAscend from '../components/seasons/season3/AutumnAscend.vue';
import AutumnGG from '../components/seasons/season3/AutumnGG.vue';
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
  // Summer
  { path: '/descend', name: 'Summers', component: Summers, meta: { requiresAuth: true } },
  { path: '/summer/1', name: 'Summer1', component: Summer1, meta: { requiresAuth: true } },
  { path: '/summer/2', name: 'Summer2', component: Summer2, meta: { requiresAuth: true } },
  { path: '/summer/3', name: 'Summer3', component: Summer3, meta: { requiresAuth: true } },
  { path: '/summer/4', name: 'Summer4', component: Summer4, meta: { requiresAuth: true } },
  { path: '/summer/5', name: 'Summer5', component: Summer5, meta: { requiresAuth: true } },
  { path: '/summer/6', name: 'Summer6', component: Summer6, meta: { requiresAuth: true } },
  { path: '/summer/7', name: 'Summer7', component: Summer7, meta: { requiresAuth: true } },
  { path: '/summer/8', name: 'Summer8', component: Summer8, meta: { requiresAuth: true } },
  { path: '/summer/9', name: 'Summer9', component: Summer9, meta: { requiresAuth: true } },
  { path: '/summer/10', name: 'Summer10', component: Summer10, meta: { requiresAuth: true } },
  { path: '/summer/the-land-vomits-ghosts', name: 'SummerAscend', component: SummerAscend, meta: { requiresAuth: true } },
  { path: '/summer/gg', name: 'SummerGG', component: SummerGG, meta: { requiresAuth: true } },
  // Autumn
  { path: '/echolalia', name: 'Autumns', component: Autumns, meta: { requiresAuth: true } },
  { path: '/autumn/1', name: 'Autumn1', component: Autumn1, meta: { requiresAuth: true } },
  { path: '/autumn/2', name: 'Autumn2', component: Autumn2, meta: { requiresAuth: true } },
  { path: '/autumn/3', name: 'Autumn3', component: Autumn3, meta: { requiresAuth: true } },
  { path: '/autumn/4', name: 'Autumn4', component: Autumn4, meta: { requiresAuth: true } },
  { path: '/autumn/5', name: 'Autumn5', component: Autumn5, meta: { requiresAuth: true } },
  { path: '/autumn/the-same-old-story', name: 'AutumnAscend', component: AutumnAscend, meta: { requiresAuth: true } },
  { path: '/autumn/one-tin-soldier-rides-away', name: 'AutumnGG', component: AutumnGG, meta: { requiresAuth: true } },
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