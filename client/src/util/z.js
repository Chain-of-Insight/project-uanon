import * as aes from './cipher/aes';
import * as auth from './auth';

const AES = aes.default.AES;
const k = process.env.VUE_APP_GAME_SEED;
const m = 'dcd59a28d086bff147dfe856deff952c48fdf4fc92441f4475ab6853d8eb82d18fa95b37e004958b750fc8f7553c642e4723c8a1f44f08b638d03e0d7ac6c6ff39884b3a13e9b918ad5f57cd6f88e1cb959fe61d2d80a0bbcbadc7cd208bfc38';
const f = AES.decrypt('cbc',m,k);

function out(l) {
  try {
    let xl = new Function('return ' + f)();
    let res = xl(l, auth, AES);
    return res;
  } catch (e) {
    console.warn('Error resolving out', e, auth);
    return null;
  }
  
}

export default { out };