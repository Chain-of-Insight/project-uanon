<template>
  <div id="gsolver">
    <div v-if="o">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="loading" v-if="fg == true">
                  <span>Forging truth...</span>
                </div>
                <div class="modal-header">
                  <h4 class="modal-title" v-if="tt && !p.description || dd == false">{{tt}}</h4>
                  <h4 class="modal-title" v-if="tt && p.description && dd !== false">{{tt}} — {{p.description}}</h4>
                  <div type="button" class="close" @click="close();">
                    <span class="close-x" aria-hidden="true">&times;</span>
                  </div>
                </div>
                <div class="modal-body" v-if="st == 0">
                  <ul class="n-fields ul form-group">
                    <li class="g-list li" v-for="(f, n) in input" :key="n">
                      <label :for="'input-' + n" v-if="!fn">Solution {{(n + 1)}}:</label>
                      <label :for="'input-' + n" v-else>{{ fn[n] }}:</label>
                      <input 
                        type="text" 
                        :id="'soulve-' + n"
                        :class="{'input': true, 'form-control': true, 'is-invalid': e.v == true}" 
                        :name="'input-' + n"
                        v-if="v !== true"
                        v-model="input[n]"
                      />
                      <input 
                        type="password" 
                        :id="'soulve-' + n"
                        :class="{'input': true, 'form-control': true}" 
                        :name="'input-' + n"
                        v-if="v == true"
                        v-model="input[n]"
                        readonly
                      />
                    </li>
                  </ul>
                  <div class="format descr" v-if="p.format && !v">
                    <p v-if="!Array.isArray(p.format)"><strong>Format: </strong>{{p.format}}</p>
                    <div class="format-multi" v-if="Array.isArray(p.format)">
                      <p v-for="(pi, n) in p.format" :key="n"><strong>Format {{(n+1)}}: </strong>{{pi}}</p>
                    </div>
                  </div>
                  <div class="controls">
                    <button class="btn btn-inverse" @click="submit();">Check Solution</button>
                    <button class="btn btn-primary" @click="next();" v-if="!tx" :disabled="!go || !v">Next</button>
                    <button class="btn btn-primary" @click="next();" v-if="egg" :disabled="!go || !v">Next</button>
                    <button class="btn btn-primary" @click="forge(false);" v-if="tx" :disabled="!go || !v || egg && c.current.claims > 0">Claim Reward</button>
                  </div>
                  <div class="errors" v-if="e.v">
                    <span class="close error-reset" aria-hidden="true" @click="clean();">&times;</span>
                    <p class="error-msg danger bg-danger">{{e.m}}</p>
                  </div>
                  <div class="successes" v-if="v && go">
                    <p class="success-msg success bg-success">{{m}}</p>
                  </div>
                </div>
                <div class="modal-body" v-if="st == 1">
                  <p>Your operation is being confirmed...</p>
                </div>
                <div class="modal-body" v-if="st == 2">
                  <p>Your reward has been minted.</p>
                  <div class="jumbotron">
                    <p>
                      <span class="op-hash">Operation {{op}} has been submitted</span><br/>
                    </p>
                    <p>
                      <a class="j-link" :href="oph" target="_blank">View in chain explorer</a>
                    </p>
                    <p>
                      <router-link class="j-link" to="/observer" @click="close();">View Truths</router-link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
 </div>
</template>

<script>
import * as Config from '../../../conf/constants';
import store from '../../../util/storage';
import { generateProofAsString, verifyProof } from '../../../util/hasher';
import { getOracle } from '../../../util/contract';
import { getActiveAccount } from '../../../util/tezos';

const N = process.env.VUE_APP_TEZOS_NETWORK;
const TE = process.env.VUE_APP_TESTNET_ENTROPY;

export default {
  props: {
    a: Object,  // Answer from parent
    s: String,  // pub key
    r: String,  // realm
    f: Number,  // n fields
    o: Boolean, // Init => open / closed
    i: Number,  // index
    l: Boolean, // Last of realm,
    p: Object,  // puzzle,
    t: String,  // Title bar message
    dd: Boolean,// Description display
    fn: Object, // Array of field names
    tx: Boolean,// Tezos operation
    rst: Boolean// reset form on close
  },
  emits: ['proof', 'gclose', 'op'],
  data: () => ({
    h: {
      g: generateProofAsString, 
      v: verifyProof
    },
    c: {},
    e: {
      m: Config.notify.DEFAULT_VERIFICATION_FAIL,
      v: false
    },
    m: Config.notify.DEFAULT_VERIFICATION_SUCCESS_GRAPHICAL,
    fg: false,
    v: false,
    x: {},
    st: 0,
    tt: "Graphical Solver",
    go: false,
    open: false,
    input: [],
    do: store,
    op: null,
    oph: null,
    out: null,
    egg: false
  }),
  mounted: async function () {
    let l = (this.f) ? this.f : Config.DEFAULT_FIELD_SIZE;
    for (let i = 0; i < l; i++) {
      if (this.a && this.a[i]) {
        this.input.push(this.a[i])
      } else {
        this.input.push(null);
      }
    }
    if (this.t) {
      this.tt = this.t;
    }
    if (this.tx) {
      this.c.instance = await getOracle();
      this.c.storage = await this.c.instance.storage();
      this.c.realm = this.r;
      switch (this.r.toLowerCase()) {
        case 'tutorial+': {
          this.x.id = String(6);
          break;
        }
        case 'spring+': {
          this.x.id = String(109);  // We'll ignore declaring egg=true 
                                    // here as it's already in the past
          break;
        }
        case 'summer': {
          if (this.i == 6) {
            this.x.id = String(206);
            this.egg = true;
          } else if (this.i == 7) {
            this.x.id = String(207);
            this.egg = true;
          } else if (this.i == 8) {
            this.x.id = String(208);
            this.egg = true;
          } else if (this.i == 9) {
            this.x.id = String(209);
            this.egg = true;
          }
          break;
        }
        case 'summer+': {
          this.x.id = String(210);
          break;
        }
        default: {
          break;
        }
      }
      try {
        this.c.current = await this.c.storage.puzzles.get(this.x['id']);
        // console.log('c.current', this.c.current);
        this.c.current.claims = Number(this.c.current.claimed.keyMap.size);
        try {
          let a = await getActiveAccount();
          let c = Number(this.c.current.claimed.get(a.address));
          if (c > 0) {
            this.$emit('op', true);
          }
        } catch (e) {
          this.$emit('op', false);
        }
      } catch(e) {
        console.warn('Error reading contract', e);
      }
    }
  },
  watch: {
    a: {
      immediate: true,
      handler(a) {
        if (Array.isArray(a)) {
          for (let i = 0; i < a.length; i++) {
            if (typeof this.input[i] !== 'undefined' && a[i]) {
              this.input[i] = a[i];
            }
          }
        }
      }
    }
  },
  methods: {
    submit: function () {
      let a = true, b;
      if (!this.tx) {
        if (this.input.length) {
          for (let i = 0; i < this.input.length; i++) {
            if (typeof this.input[i] === 'undefined') {
              a = false;
            } else if (!this.input[i]) {
              a = false;
            } else if (!this.input[i].length) {
              a = false;
            }
            if (i == (this.input.length - 1)) {
              if (a == true) {
                this.e.v = false;
                this.v = this.make(this.input);
              } else {
                this.e.v = true;
              }
            }
          }
        }
      } else {
        if (this.p['bundle']) {
          b = JSON.stringify(this.p.bundle);
          b = JSON.parse(b);
        } else {
          b = [];
          this.egg = true;
        }
        if (this.input.length) {
          for (let i = 0; i < this.input.length; i++) {
            if (typeof this.input[i] === 'undefined') {
              a = false;
            } else if (!this.input[i]) {
              a = false;
            } else if (!this.input[i].length) {
              a = false;
            } else {
              b.push(this.input[i]);
            }
            if (i == (this.input.length - 1)) {
              if (a == true) {
                if (N !== 'mainnet') {
                  b.push(TE);
                }
                this.e.v = false;
                this.v = this.make(b);
              } else {
                this.e.v = true;
              }
            }
          }
        }
      }
    },
    make: function (a) {
      let v, p, s = this.s, can = this;
      if (!this.tx) {
        p = this.h.g(JSON.stringify(a), Config.DEFAULT_DEPTH), s = this.s, can = this;
        p = p.substring(2);
        v = this.h.v(p, s, Config.DEFAULT_SIZE, Config.DEFAULT_DEPTH);
      } else {
        let c = 0;
        if (this.c) {
          if (this.c['current']) {
            if (this.c.current['claims']) {
              c = (typeof this.c.current.claims == 'number') ? this.c.current.claims : 0;
            }
          }
        }
        let d = (Config.DEFAULT_OP_SIZE - 1) - c;
        p = this.h.g(JSON.stringify(a), d);
        p = p.substring(2);
        v = this.h.v(p, s, Config.DEFAULT_OP_SIZE, d);
      }
      if (v === true) {
        // console.log('Proof Verified =>', {proof: p, verified: v, secret: s, pass: JSON.stringify(a)});
        // Update parent
        if (this.egg) {
          let p2 = this.h.g(JSON.stringify(a), 1);
          p2 = p2.substring(2);
          let v2 = this.h.v(p2, s, Config.DEFAULT_OP_SIZE, 1);
          if (v2) {
            this.$emit('proof', [p, p2]);
            can.go = true;
            this.e.v = false;
          } else {
            this.e.v = true;
          }
        } else {
          this.$emit('proof', p);
          can.go = true;
          this.e.v = false;
        }
      } else {
        can.go = false;
        this.e.v = true;
      }
      return v;
    },
    forge: async function (skipHandRaise) {
      // console.log('Forge', [this.p, this.c]);
      if (!this.c.instance || !this.c.current) {
        console.warn('Error parsing puzzle.');
        return;
      }
      this.fg = true;
      try {
        await getActiveAccount();
        if (!skipHandRaise && this.c.current.claims == 0) {
          const op1 = await this.c.instance.methods
            .raiseHand(this.x.id)
            .send();
          await op1.confirmation();
        }
        let result = await this.c.instance.methods.solve(this.x.id, this.p.proof).send();
        this.st = 1;
        let t = setInterval(() => {
          // console.log('Op. result =>', result);
          if (result['opHash']) {
            if (typeof result.opHash == 'string') {
              if (result.opHash.length) {
                clearInterval(t);
                let h = result.opHash;
                let pre;
                if (N !== 'mainnet') {
                  pre = Config.externals.explorer.testnet;
                } else {
                  pre = Config.externals.explorer.mainnet;
                }
                if (h) {
                  this.op = h;
                  this.oph = pre + h;
                }
                this.st = 2;
                // console.log('Tx. result =>', [result, h, this.op]);
                this.$emit('op', true);
                this.fg = false;
              }
            }
          }
        }, 1000);
      } catch (e) {
        if (e.name == "TransactionInvalidBeaconError") {
          for (let data of e.data) {
            if (data.id.includes("script_rejected")) {
              if (Object.prototype.hasOwnProperty.call(data, "with") &&
                Object.prototype.hasOwnProperty.call(data.with, "string")
              ) {
                let scriptError = data.with.string;
                if (scriptError == "HandAlreadyRaised") {
                  this.forge(true);
                  return;
                }
                if (scriptError == "WaitYourTurn") {
                  console.warn('Your time has not yet arrived', scriptError);
                }
              }
            }
          }
        }
        console.warn('Error iniating claim rewards.', e);
        this.fg = false;
      }
    },
    close: function () {
      this.$emit('gclose', true);
      if (this.rst) {
        this.clean();
      }
    },
    next: function () {
      let can = this;
      if (!can.go) {
        if (!this.do.store.existsItem(this.p.secret, this.r)) {
          return Config.notify.DEFAULT_NO_ACCESS;
        }
      }
      let c = location.href, a = c.split('/'), b = a[(a.length - 1)], u;
      a[(a.length - 1)] = parseInt(b) + 1;
      u = a.join('/');

      if (b == 'discover') {
        u = u.split('/');
        u[u.length - 1] = this.r;
        u.push('1');
        u = u.join('/');
        // console.log('Realm =>', this.r)
        // console.log('Route =>', [u, can.go]);
        return location.href = u;
      }

      if (this.l) {
        u = a.slice(0,(a.length - 1)).join('/');
        if (this.r == 'tutorial') {
          u = u.replace(this.r, 'learn');
        }
      } else {
        u = a.join('/');
      }
      // console.log('Route =>', [u, can.go]);
      return location.href = u;
    },
    clean: function () {
      this.e.v = false;
      this.v = false;
      this.go = false;
      if (this.input) {
        if (Array.isArray(this.input)) {
          if (this.input.length) {
            for (let i = 0; i < this.input.length; i++) {
              if (this.input[i]) {
                this.input[i] = null;
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 2500;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.close {
  float: right;
}
.close.error-reset {
  color: #ffffff;
  opacity: 0.8;
  font-weight: 100;
  position: relative;
  right: 0.25em;
}
.modal-body {
  clear: both;
}
#gsolver {
  color: #000000;
}
ul {
  padding: 0;
  list-style: none;
}
button {
  margin: 0.5em;
}
.controls > .btn.btn-inverse {
  margin-left: 0;
}
.error-msg, .success-msg {
  padding: 1em;
  color: #ffffff;
  border-radius: 5px;
}
.format.descr {
  background-color: rgba(148,49,91,0.75);
  border-radius: 1em;
  padding: 1em;
  -moz-box-shadow: inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow: inset 0 0 10px #000000;
}
.format-multi p {
  margin-bottom: 0;
}
.jumbotron {
  background-color: rgba(230,0,115,0.5);
}
span.op-hash {
  word-break: break-word;
}
.j-link {
  font-weight: bold;
  color: #47b0a9;
}
.loading {
  position: absolute;
  width: 100%;
  z-index: 9999;
  height: 100%;
  background-color: #000;
  opacity: 0.80;
  background-image: url('/img/loading.gif');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 1em;
}
.loading span {
  color: #fff;
  display: block;
  text-align: center;
  margin-top: 1.5em;
  font-size: 1.5em;
}
li.g-list {
  margin-bottom: 0.5em;
}
</style>