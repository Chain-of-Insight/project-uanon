const blake2b = require('blake2b');

const OUTPUT_SIZE = 64;
const SALT_SIZE = 16;
const KEY_SIZE = 32;

function hash(text, key = null, salt = null) {
  const output = new Uint8Array(OUTPUT_SIZE);
  let _key, _salt, input = Buffer.from(text), res;
  if (key) {
    _key = (key.length == KEY_SIZE) ? key : Buffer.concat([Buffer.from(key), Buffer.alloc(KEY_SIZE)], KEY_SIZE);
  }
  if (salt) {
    _salt = (salt.length == SALT_SIZE) ? salt : Buffer.concat([Buffer.from(salt), Buffer.alloc(16)], 16);
  }
  if (key && salt) {
    res = blake2b(output.length, _key, _salt).update(input).digest('hex');
  } else if (key) {
    res = blake2b(output.length, _key).update(input).digest('hex');
  } else {
    res = blake2b(output.length).update(input).digest('hex');
  }
  return res;
}

const B2B = {
  hash: hash
};

export default { B2B };