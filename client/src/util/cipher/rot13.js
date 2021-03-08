import Rot13 from '@hogashi/rot13';

const rot13 = new Rot13();

const decrypt = ((payload) => {
  return rot13.decrypt(payload);
});

const encrypt = ((payload) => {
  return rot13.encrypt(payload);
});

const ROT13 = {
  decrypt: decrypt,
  encrypt: encrypt
};

export default { ROT13 };