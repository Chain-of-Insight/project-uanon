const Vigenere = require('caesar-salad').Vigenere;

const decrypt = ((password, payload) => {
  if (typeof password !== 'string' || typeof payload !== 'string') {
    return false;
  }
  password = password.replace(/\s/g, '');
  let d = Vigenere.Decipher(password).crypt(payload);
  return d;
});

const encrypt = ((password, payload) => {
  if (typeof password !== 'string' || typeof payload !== 'string') {
    return false;
  }
  password = password.replace(/\s/g, '');
  let c = Vigenere.Cipher(password).crypt(payload);
  return c;
});

const VIGENERE = {
  decrypt: decrypt,
  encrypt: encrypt
};

export default { VIGENERE };