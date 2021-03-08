<template>
  <div class="pane-s cipher-tools">
    <h1>{{ msg }}</h1>
    <router-link to="/tools">Back to Tools</router-link>
  </div>
  <div class="pane-s content">
  
  <div id="opts">
    <div id="accordion">
      <div class="card">
        <div class="card-header" :class="{open: o == 'r13'}" id="r13-h">
          <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target="#r13-b" aria-expanded="true" aria-controls="r13-b" @click="o = (o === 'r13') ? null : 'r13';">ROT13</button>
            <span class="float-right close-x" data-toggle="collapse" data-target="#r13-b" v-if="o == 'r13'" @click="o = null;">&times;</span>
          </h5>
        </div>
        <div id="r13-b" class="collapse" aria-labelledby="ROT13 Tools" data-parent="#accordion">
          <div class="card-body">
            <div class="dec">
              <p>
                <label for="rdec">Cipher Text</label>
              </p>
              <p>
                <input class="form-control" name="rdec" type="text" v-model="r.c" placeholder="Decrypt ROT13" />
              </p>
            </div>
            <div class="enc">
              <p>
                <label for="rdec">Plain Text</label>
              </p>
              <p>
                <input class="form-control" name="renc" type="text" v-model="r.p" placeholder="Encrypt ROT13" />
              </p>
            </div>
            <div class="controls controls-r13">
              <button class="btn btn-primary" @click="handle('r13', 0)" :disabled="!r.c">Decrypt</button>
              <button class="btn btn-inverse" @click="handle('r13', 1)" :disabled="!r.p">Encrypt</button>
              <button class="btn btn-danger" @click="r.c = null; r.p = null;" v-if="r.c && r.p">Reset</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header" :class="{open: o == 'vig'}" id="vig-h">
          <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target="#vig-b" aria-expanded="true" aria-controls="vig-b" @click="o = (o === 'vig') ? null : 'vig';">VIGENÈRE</button>
            <span class="float-right close-x" data-toggle="collapse" data-target="#vig-b" v-if="o == 'vig'" @click="o = null;">&times;</span>
          </h5>
        </div>
        <div id="vig-b" class="collapse" aria-labelledby="Vigenère Tools" data-parent="#accordion">
          <div class="card-body">
            <div class="pass">
              <p>
                <label for="vpass">Password</label>
              </p>
              <p>
                <input class="form-control" name="vpass" type="text" v-model="v.k" placeholder="Password" />
              </p>
            </div>
            <div class="dec">
              <p>
                <label for="vdec">Cipher Text</label>
              </p>
              <p>
                <input class="form-control" name="vdec" type="text" v-model="v.c" placeholder="Decrypt Vigenère" />
              </p>
            </div>
            <div class="enc">
              <p>
                <label for="venc">Plain Text</label>
              </p>
              <p>
                <input class="form-control" name="venc" type="text" v-model="v.p" placeholder="Encrypt Vigenère" />
              </p>
            </div>
            <div class="controls controls-vig">
              <button class="btn btn-primary" @click="handle('vig', 0)" :disabled="!v.c || !v.k">Decrypt</button>
              <button class="btn btn-inverse" @click="handle('vig', 1)" :disabled="!v.p || !v.k">Encrypt</button>
              <button class="btn btn-danger" @click="v.c = null; v.p = null; v.k = null;" v-if="v.c && v.p">Reset</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header" :class="{open: o == 'aes'}" id="aes-h">
          <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target="#aes-b" aria-expanded="true" aria-controls="aes-b" @click="o = (o === 'aes') ? null : 'aes';">AES 256</button>
            <span class="float-right close-x" data-toggle="collapse" data-target="#aes-b" v-if="o == 'aes'" @click="o = null;">&times;</span>
          </h5>
        </div>
        <div id="aes-b" class="collapse" aria-labelledby="AES Tools" data-parent="#accordion">
          <div class="card-body">
            <div class="mode">
              <p>
                <label for="caes">Cipher Mode:</label>
              </p>
              <p>
                <select id="caes" class="form-control question item" v-model="a.m" v-if="a.t.length">
                  <option disabled value="">Select one</option>
                  <option v-for="(c, i) in a.t" :key="i" :value="c">{{c}}</option>
                </select>
              </p>
            </div>
            <div class="aes-opts">
              <div class="apass">
                <p>
                  <label for="apass">Password</label>
                </p>
                <p>
                  <input class="form-control" name="apass" type="text" v-model="a.k" placeholder="Optional" />
                </p>
              </div>
              <div class="civ">
                <p>
                  <label for="aciv">IV</label>
                  <span class="descr">&nbsp;(Defaults to random bytes)</span>
                </p>
                <p>
                  <input class="form-control" name="aciv" type="text" maxlength="16" v-model="a.i" placeholder="Optional" />
                </p>
              </div>
            </div>
            <div class="dec">
              <p>
                <label for="adec">Cipher Text</label>
              </p>
              <p>
                <input class="form-control" name="adec" type="text" v-model="a.c" placeholder="Decrypt AES 256" />
              </p>
            </div>
            <div class="enc">
              <p>
                <label for="adec">Plain Text</label>
              </p>
              <p>
                <input class="form-control" name="aenc" type="text" v-model="a.p" placeholder="Encrypt AES 256" />
              </p>
            </div>
            <div class="controls controls-aes" v-if="!a.i">
              <button class="btn btn-primary" @click="handle('aes', 0)" :disabled="!a.c || !a.m">Decrypt</button>
              <button class="btn btn-inverse" @click="handle('aes', 1)" :disabled="!a.p || !a.m">Encrypt</button>
              <button class="btn btn-danger" @click="a.c = null; a.p = null; a.i = null; a.k = null" v-if="a.c || a.p || a.i || a.k">Reset</button>
            </div>
            <div class="controls controls-aes" v-if="a.i">
              <p class="error-msg danger bg-danger" v-if="a.i.length !== 16">Invalid IV size</p>
              <p v-if="a.i.length == 16">
                <button class="btn btn-primary" @click="handle('aes', 0)" :disabled="!a.c || !a.m">Decrypt</button>
                <button class="btn btn-inverse" @click="handle('aes', 1)" :disabled="!a.p || !a.m">Encrypt</button>
              </p>
            </div>
            <div class="aerror" v-if="a.err">
              <p class="error-msg danger bg-danger" >{{a.err}}<span class="float-right close-x a-err" @click="a.err = null;">&times;</span></p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header" :class="{open: o == 'b2b'}" id="b2b-h">
          <h5 class="mb-0">
            <button class="btn btn-link" data-toggle="collapse" data-target="#b2b-b" aria-expanded="true" aria-controls="b2b-b" @click="o = (o === 'b2b') ? null : 'b2b';">BLAKE2b</button>
            <span class="float-right close-x" data-toggle="collapse" data-target="#b2b-b" v-if="o == 'b2b'" @click="o = null;">&times;</span>
          </h5>
        </div>
        <div id="b2b-b" class="collapse" aria-labelledby="Blake2b-512 Hash" data-parent="#accordion">
            <div class="card-body">
              <div class="b2b-opts">
              <div class="b2key">
                <p>
                  <label for="b2key">Password</label>
                </p>
                <p>
                  <input class="form-control" name="b2key" type="text" v-model="b.k" placeholder="Optional" />
                </p>
              </div>
              <div class="b2salt">
                <p>
                  <label for="b2salt">Salt</label>
                  <span class="descr">&nbsp;(Defaults to no salt)</span>
                </p>
                <p>
                  <input class="form-control" name="b2salt" type="text" maxlength="16" v-model="b.s" placeholder="Optional" />
                </p>
              </div>
            </div>
            <div class="b2h">
              <p>
                <label for="b2hash">Hash</label>
              </p>
              <p>
                <input class="form-control b2hash" name="b2hash" type="text" v-model="b.h" placeholder="Blake2b Output" readonly />
              </p>
            </div>
            <div class="enc">
              <p>
                <label for="b2enc">Plain Text</label>
              </p>
              <p>
                <input class="form-control" name="b2enc" type="text" v-model="b.p" placeholder="Hash with Blake2b" />
              </p>
            </div>
            <div class="controls controls-b2b">
              <button class="btn btn-primary" @click="handle('b2b', 1)" :disabled="!b.p">Hash</button>
              <button class="btn btn-danger" @click="b.p = null; b.h = null; b.k = null; b.s = null;" v-if="b.p || b.k || b.s || b.h">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  </div>
</template>

<script>
import * as rot from '../../util/cipher/rot13';
import * as aes from '../../util/cipher/aes';
import * as b2b from '../../util/cipher/blake2b';
import * as vig from '../../util/cipher/vigenere';

const DECRYPT = 0;
const ENCRYPT = 1;

export default {
  name: 'Cipher Tools',
  data: () => ({
    o: false,
    a: { p: null, c: null, m: 'cbc', t: ['ctr', 'cbc'], k: null, i: null, err: null},
    b: { p: null, s: null, k: null, h: null},
    r: { p: null, c: null },
    v: { p: null, c: null, k: null},
    msg: 'Cipher Tools',
    AES: aes.default.AES,
    ROT13: rot.default.ROT13,
    B2B: b2b.default.B2B,
    VIG: vig.default.VIGENERE
  }),
  methods: {
    /**
     * @param {Number} a : Boolean int ENCRYPT / DECRYPT
     * @param {String} b : Payload
     * @returns {String}
     */
    r13: function (a,b) {
      if (typeof b !== 'string') {
        console.warn('Error parsing input', [a,b]);
        return;
      } else if (!b.length) {
        console.warn('Error parsing input', [a,b]);
        return;
      } else if (typeof a !== 'number') {
        console.warn('Error parsing input', [a,b]);
        return;
      } else if (a < 0 || a > 1) {
        console.warn('Error parsing input', [a,b]);
        return;
      }
      let r;
      switch (a) {
        case ENCRYPT: {
          r = this.ROT13.encrypt(b);
          break;
        }
        case DECRYPT: {
          r = this.ROT13.decrypt(b);
          break;
        }
      }
      return r;
    },
    /**
     * @param {Number} a : Boolean int ENCRYPT / DECRYPT
     * @param {String} b : Password
     * @param {String} c : Payload
     * @returns {String}
     */
    vig: function (a,b,c) {
      if (typeof b !== 'string' || typeof c !== 'string') {
        console.warn('Error parsing input', [a,b,c]);
        return;
      } else if (!b.length || !c.length) {
        console.warn('Error parsing input', [a,b,c]);
        return;
      } else if (typeof a !== 'number') {
        console.warn('Error parsing input', [a,b]);
        return;
      } else if (a < 0 || a > 1) {
        console.warn('Error parsing input', [a,b]);
        return;
      }
      let r;
      switch (a) {
        case ENCRYPT: {
          r = this.VIG.encrypt(b,c);
          break;
        }
        case DECRYPT: {
          r = this.VIG.decrypt(b,c);
          break;
        }
      }
      return r;
    },
    /**
     * @param {String} m : Mode ctr / cbc
     * @param {Number} a : Boolean int ENCRYPT / DECRYPT
     * @param {String} b : Payload
     * @returns {String}
     */
    aes: function (m, a, b) {
      if (typeof b !== 'string') {
        console.warn('Error parsing input', [m,a,b]);
        return;
      } else if (!b.length) {
        console.warn('Error parsing input', [m,a,b]);
        return;
      } else if (typeof a !== 'number') {
        console.warn('Error parsing input', [m,a,b]);
        return;
      } else if (a < 0 || a > 1) {
        console.warn('Error parsing input', [m,a,b]);
        return;
      } else if (!m) {
        m = 'cbc';
      }
      let r;
      switch (a) {
        case ENCRYPT: {
          try {
            if (this.a.k && this.a.i) {
              r = this.AES.encrypt(m, b, this.a.k, this.a.i);
            } else if (this.a.k) {
              r = this.AES.encrypt(m, b, this.a.k);
            } else if (this.a.i) {
              r = this.AES.encrypt(m, b, null, this.a.i);
            } else {
              r = this.AES.encrypt(m, b);
            }
          } catch(e) {
            this.a.err = String(e);
          }
          break;
        }
        case DECRYPT: {
          try {
            if (this.a.k && this.a.i) {
              r = this.AES.decrypt(m, b, this.a.k, this.a.i);
            } else if (this.a.k) {
              r = this.AES.decrypt(m, b, this.a.k);
            } else if (this.a.i) {
              r = this.AES.decrypt(m, b, null, this.a.i);
            } else {
              r = this.AES.decrypt(m, b);
            }
          } catch(e) {
            this.a.err = String(e);
          }
          break;
        }
      }
      return r;
    },
    /**
     * @param {String} a : Type
     * @param {Number} b : Mode (ENCRYPT / DECRYPT)
     */
    handle: function (a, b) {
      if (typeof a !== 'string') {
        return;
      } else if (typeof b !== 'number') {
        return;
      } else if (b < 0 || b > 1) {
        return;
      }
      let o;
      switch (a) {
        case 'r13': {
          if (b == 0) {
            o = this.r13(DECRYPT, this.r.c);
            if (o) {
              this.$nextTick(() => {
                this.r.p = o;
              });
            }
          } else {
            o = this.r13(ENCRYPT, this.r.p);
            if (o) {
              this.$nextTick(() => {
                this.r.c = o;
              });
            }
          }
          break;
        }
        case 'vig': {
          if (b == 0) {
            o = this.vig(DECRYPT, this.v.k, this.v.c);
            if (o) {
              this.$nextTick(() => {
                this.v.p = o;
              });
            }
          } else {
            o = this.vig(ENCRYPT, this.v.k, this.v.p);
            if (o) {
              this.$nextTick(() => {
                this.v.c = o;
              });
            }
          }
          break;
        }
        case 'aes': {
          this.a.err = null;
          if (b == 0) {
            o = this.aes(this.a.m, DECRYPT, this.a.c);
            if (o) {
              this.$nextTick(() => {
                this.a.p = o;
              });
            } else {
              if (!this.a.err) {
                this.a.err = "Error decrypting";
              }
            }
          } else {
            o = this.aes(this.a.m, ENCRYPT, this.a.p);
            if (o) {
              this.$nextTick(() => {
                this.a.c = o;
              });
            } else {
              if (!this.a.err) {
                this.a.err = "Error encrypting";
              }
            }
          }
          break;
        }
        case 'b2b': {
          try {
            o = this.B2B.hash(this.b.p, this.b.k, this.b.s);
            if (o) {
              this.$nextTick(() => {
                this.b.h = o;
              });
            } else {
              console.warn('Error hashing data');
            }
          } catch(e) {
            console.log(e);
          }
          
          break;
        }
      }
    }
  }
}
</script>

<style scoped>
#opts {
  margin-top: 4em;
  margin-bottom: 4em;
}
.close-x {
  font-size: 2em;
  margin-right: 0.5em;
  color: #ff7070;
  top: -7px;
  position: relative;
}
.close-x.a-err {
  top: -15px;
  left: 25px;
  color: #ffffff;
}
.card {
  border-color: #000;
  box-shadow: inset 0 0 10px #000000;
  border-radius: 1em;
}
.card-header {
  background-repeat: repeat;
  background-color: #333;
  box-shadow: inset 0 0 10px #000000;
  color: #ff7070;
  border-bottom: none;
}
.card-header.open {
  background-image: url('https://uanon.s3.amazonaws.com/backgrounds/4aefac88b597b312f457af4c6eb210bfeb2b614d861a9d8a380990e96c8823ab.png');
}
.card-header .btn-link {
  color: #ff7070;
}
.card-body {
  background-color: rgba(0,0,0,0.9);
}
.controls .btn {
  margin-right: 1em;
}
select#caes {
  max-width: 150px;
}
.error-msg {
  padding: 1em;
  color: #ffffff;
  border-radius: 5px;
}
.apass, .b2key, .civ, .b2salt {
  display: inline-block;
  margin-right: 1em;
}
.aerror {
  margin-top: 2em;
}
span.descr {
  font-size: 0.75em;
  font-style: italic;
  color: #eee;
}
input.b2hash {
  background: transparent;
  color: #ff7070;
  border-color: #ff7070;
}
</style>