import {
  isLoggedIn,
  setAuthTokens,
  clearAuthTokens
} from "axios-jwt";
import * as api from './api';
import * as Tezos from './tezos';

// login
const login = async () => {
  if (isLoggedIn()) {
    return isLoggedIn();
  }

  const activeAccount = await Tezos.getActiveAccount();
  // console.log("Tezos.getActiveAccount", activeAccount);

  const { msg, signedMsg } = await Tezos.signLoginRequest();
  // console.log('Tezos.signLoginRequest', { msg, signedMsg });

  const req = {msg: msg, sig: signedMsg, pubKey: activeAccount.publicKey}
  // console.log('Auth apiRequest', req);https://mainnet.smartpy.io

  const res = await api.request.post('/auth', req);
  // console.log("Auth apiResponse", res);

  // save tokens to storage
  if (res && res.data && res.data.access_token && res.data.refresh_token) {
    setAuthTokens({
      accessToken: res.data.access_token,
      refreshToken: res.data.refresh_token
    });
  }
  return isLoggedIn();
};

// to reset auth tokens
const logout = () => clearAuthTokens();

export {
  isLoggedIn,
  login,
  logout
};
